# AJDesigners — Production VPS Deployment Guide
## Complete Blueprint for Self-Managed Linux VPS Hosting

This guide provides instructions for deploying **AJDesigners** on a self-managed Linux Virtual Private Server (Ubuntu 22.04 / 24.04 LTS).

---

## Architecture Overview

```
                      INTERNET
                         │
                 [HTTPS : Port 443]
                         ▼
                     [ NGINX ]
                    Reverse Proxy
                         │
        ┌────────────────┴────────────────┐
        ▼                                 ▼
[ Static Frontend ]               [ /api/ Routes ]
/client/dist (HTML/JS/CSS)                ▼
                                   [ PM2 Cluster ]
                              Node.js Express (Port 5000)
                                          │
                                          ▼
                                     [ MongoDB ]
                               (Local: 127.0.0.1:27017)
```

---

## 1. VPS Prerequisites

- **Server:** Ubuntu 22.04 LTS or 24.04 LTS (1 vCPU, 2GB RAM minimum recommended).
- **Access:** Root or `sudo` privileged non-root user via SSH.
- **Domain Name:** DNS A Records pointing to your VPS public IPv4:
  - `ajdesigners.com` -> `YOUR_SERVER_IP`
  - `www.ajdesigners.com` -> `YOUR_SERVER_IP`

---

## 2. Server Initialization & Dependency Installation

Connect to your server via SSH:

```bash
ssh user@YOUR_SERVER_IP
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git ufw build-essential
```

### Configure UFW Firewall
```bash
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

---

## 3. Install Node.js (LTS v22) & PM2

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2
node -v # Verify v22.x.x
```

---

## 4. Install MongoDB Community Server

```bash
sudo apt install -y gnupg curl
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor

echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | \
   sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

sudo apt update
sudo apt install -y mongodb-org

# Start and enable MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
sudo systemctl status mongod
```

> **Security Note:** Verify that `/etc/mongod.conf` binds exclusively to `127.0.0.1`. Never expose port 27017 to the public internet.

---

## 5. Deploy Codebase

Create the application directory:

```bash
sudo mkdir -p /var/www/ajdesigners
sudo chown -R $USER:$USER /var/www/ajdesigners
cd /var/www/ajdesigners
```

Clone your repository or upload files via SFTP/rsync:

```bash
git clone https://github.com/your-repo/ajdesigners.git .
```

Install dependencies:

```bash
# Install root orchestration
npm install

# Install server dependencies
cd /var/www/ajdesigners/server
npm install --omit=dev

# Install client dependencies & build frontend
cd /var/www/ajdesigners/client
npm install
npm run build
```

---

## 6. Configure Production Environment Variables

Create `/var/www/ajdesigners/server/.env`:

```bash
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb://127.0.0.1:27017/ajdesigners
JWT_SECRET=use_a_long_cryptographically_secure_random_string_here_32_chars_min
JWT_EXPIRES_IN=7d
CLIENT_URL=https://ajdesigners.com

# SMTP configuration for inquiry alerts (e.g. Amazon SES, Postmark, Google Workspace)
SMTP_HOST=smtp.yourprovider.com
SMTP_PORT=587
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
NOTIFICATION_EMAIL=contact@ajdesigners.com
```

Seed initial database (Admin account, 10 Services, Launch Pricing, Concept Projects, Articles, Settings):

```bash
cd /var/www/ajdesigners/server
npm run seed
```

---

## 7. Start Node.js Application with PM2

From `/var/www/ajdesigners`:

```bash
pm2 start deployment/ecosystem.config.cjs
pm2 save
pm2 startup
```

Check status and logs:
```bash
pm2 status
pm2 logs ajdesigners-backend
```

---

## 8. Configure Nginx & SSL Certificate

Install Nginx and Certbot:

```bash
sudo apt install -y nginx certbot python3-certbot-nginx
```

Copy the deployment configuration:

```bash
sudo cp /var/www/ajdesigners/deployment/nginx.conf /etc/nginx/sites-available/ajdesigners
sudo ln -s /etc/nginx/sites-available/ajdesigners /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
```

Test configuration and restart Nginx:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

Obtain Let's Encrypt SSL Certificate:

```bash
sudo certbot --nginx -d ajdesigners.com -d www.ajdesigners.com
```

Certbot will automatically install the certificates and configure daily autorenewal timers.

---

## 9. Automated MongoDB Backups

Create a daily backup cron job:

```bash
sudo mkdir -p /var/backups/mongodb
sudo nano /usr/local/bin/backup-ajdesigners.sh
```

Add the following script:

```bash
#!/bin/bash
BACKUP_DIR="/var/backups/mongodb"
DATE=$(date +%Y-%m-%d_%H%M%S)
mongodump --db ajdesigners --out "$BACKUP_DIR/$DATE"
tar -czf "$BACKUP_DIR/ajdesigners_$DATE.tar.gz" -C "$BACKUP_DIR" "$DATE"
rm -rf "$BACKUP_DIR/$DATE"
# Retain backups for 14 days
find "$BACKUP_DIR" -type f -name "*.tar.gz" -mtime +14 -delete
```

Make it executable and add to crontab:

```bash
sudo chmod +x /usr/local/bin/backup-ajdesigners.sh
sudo crontab -e
# Run daily at 02:00 AM
0 2 * * * /usr/local/bin/backup-ajdesigners.sh
```

---

## 10. Routine Updates & Maintenance

To deploy new code updates:

```bash
cd /var/www/ajdesigners
git pull origin main

# Rebuild frontend
cd client && npm install && npm run build

# Reload backend cluster with zero downtime
cd ../server && npm install --omit=dev
pm2 reload ajdesigners-backend
```

