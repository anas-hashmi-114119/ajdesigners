# AJDesigners — Official Website & Administrative Platform
### "Creative Minds. Digital Growth."

Welcome to the official full-stack web application repository for **AJDesigners**, an international digital marketing and creative agency co-founded by **Yashwa** and **Aroosa**.

---

## 🌟 Agency Overview

AJDesigners is a digital marketing and creative agency dedicated to helping businesses establish, strengthen, and grow their online presence worldwide. We combine strategic marketing, creative content production, artificial intelligence workflows, and digital expertise to deliver practical solutions across North America, the UK, Europe, Australia, and the UAE.

- **Founders:** Yashwa & Aroosa (Co-Founders)
- **Business Model:** International B2B & B2C Services
- **Target Markets:** United States, United Kingdom, Canada, Australia, UAE, Europe, and global international hubs.
- **Tagline:** "Creative Minds. Digital Growth."

---

## 🏗️ Technology Architecture

### Frontend (`/client`)
- **Framework:** React 19 + Vite 8
- **Styling:** Tailwind CSS v3 + Custom Agency Design System
- **Routing:** React Router v7 (`react-router-dom`)
- **Icons:** Lucide React + Custom Brand SVGs
- **HTTP Client:** Axios (centralized client with JWT request/response interceptors)
- **Typography:** Manrope (Headings) & Inter (Body)
- **Color Palette:**
  - Primary Dark Navy: `#101828`
  - Secondary Navy: `#17243A`
  - Electric Blue: `#2563EB`
  - Vibrant Purple: `#7C3AED`
  - Light Background: `#F5F7FB`
  - Primary Text: `#1D2939`

### Backend (`/server`)
- **Runtime:** Node.js (ES Modules) + Express.js
- **Database:** MongoDB Community Server via Mongoose ORM
  - Development Connection: `mongodb://127.0.0.1:27017/ajdesigners`
- **Security:** Helmet, Express Rate Limit, CORS with explicit allowlists, bcryptjs (12 salt rounds), HTTP-only cookies & JWT tokens
- **File Storage:** Controlled Multer upload pipeline (size and MIME verification)
- **Email Service:** Nodemailer with automated prospect acknowledgment and admin alerts
- **Process Management:** PM2 Cluster configuration (`ecosystem.config.cjs`)
- **Web Server:** Nginx reverse proxy configuration with SSL (`deployment/nginx.conf`)

---

## 📁 Project Directory Structure

```
ajdesigners/
├── client/                      # React + Vite Frontend
│   ├── public/                  # Favicon & static assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/          # Reusable cards, CTA, Process, Social Icons
│   │   │   └── layout/          # Navbar & Footer
│   │   ├── context/             # AuthContext (JWT session state)
│   │   ├── pages/               # Public agency pages (Home, About, Services, etc.)
│   │   │   └── admin/           # Administrative portal views
│   │   ├── services/            # Axios API endpoints
│   │   └── styles/              # Global CSS & Tailwind layers
│   ├── tailwind.config.js       # Brand color palette & typography
│   └── vite.config.js           # Vite dev proxy configuration
│
├── server/                      # Node.js + Express Backend
│   ├── src/
│   │   ├── config/              # MongoDB connection
│   │   ├── controllers/         # Business logic & CRUD handlers
│   │   ├── middleware/          # JWT auth, error handlers, rate limits, uploads
│   │   ├── models/              # Mongoose schemas (8 models)
│   │   ├── routes/              # RESTful API routing
│   │   └── utils/               # Seed scripts & Nodemailer email services
│   ├── .env                     # Local environment variables
│   └── .env.example             # Production template
│
├── deployment/                  # Production VPS artifacts
│   ├── ecosystem.config.cjs     # PM2 cluster configuration
│   └── nginx.conf               # Production Nginx reverse proxy configuration
│
├── docs/                        # Complete documentation
│   └── DEPLOYMENT_GUIDE.md      # Ubuntu Linux VPS deployment manual
│
├── uploads/                     # Uploaded media storage
├── package.json                 # Root orchestration scripts
└── README.md                    # Master documentation
```

---

## ⚡ Quick Start (Local Development)

### 1. Prerequisites
- Node.js (v20+ or v22 LTS)
- Locally running MongoDB Community Server on port `27017`

### 2. Verify Local MongoDB
Ensure your local MongoDB service is running:
```powershell
Test-NetConnection -ComputerName 127.0.0.1 -Port 27017
```

### 3. Install All Dependencies
From the root `ajdesigners/` folder:
```bash
# Root dependencies
npm install

# Server dependencies
cd server && npm install

# Client dependencies
cd ../client && npm install
cd ..
```

### 4. Seed the Database
Populate the database with the Superadmin account, 10 Core Services, Launch Pricing, Concept Projects, Educational Articles, and Site Settings:
```bash
npm run seed
```

**Default Admin Credentials:**
- **URL:** `http://localhost:5173/admin/login`
- **Email:** `admin@ajdesigners.com`
- **Password:** `AJDesigners@2025!`

### 5. Launch Development Servers
Run both backend (`localhost:5000`) and frontend (`localhost:5173`) concurrently:
```bash
npm run dev
```

Visit `http://localhost:5173` to explore the agency portal.

---

## 🚀 Website Pages & Features

1. **Home (`/`)**:
   - High-impact hero section with gradient badges and interactive mockup.
   - Dual-sector focus: Dedicated cards for B2B enterprises and B2C consumer lifestyle brands.
   - 6 Core Featured Services with deliverables checklists.
   - 8 Why Choose AJDesigners differentiators.
   - 5-Step Process (Discover, Strategize, Create, Execute, Optimize).
   - Concept portfolio preview with interactive modal viewer.
2. **About Us (`/about`)**:
   - Company story, mission, vision, and 7 core values.
   - Editable Co-Founder profiles for **Yashwa** and **Aroosa**.
3. **Services Overview (`/services`)**:
   - Full directory of all 10 agency disciplines with live search filter.
4. **10 Dedicated Service Detail Pages (`/services/:slug`)**:
   - `/services/social-media-management`
   - `/services/content-creation`
   - `/services/ai-powered-content`
   - `/services/graphic-design-branding`
   - `/services/short-form-video-reels`
   - `/services/digital-advertising`
   - `/services/lead-generation`
   - `/services/linkedin-marketing`
   - `/services/website-landing-page-content`
   - `/services/seo-digital-content-optimization`
5. **Industries We Serve (`/industries`)**:
   - Interactive tabbed architecture covering 12 distinct sectors (E-commerce, Fashion, Beauty, Real Estate, Healthcare, Tech/SaaS, Consulting, etc.) with challenges and solutions.
6. **Portfolio / Our Work (`/portfolio`)**:
   - Filterable gallery across 7 categories with authentic concept tagging.
7. **Pricing / Packages (`/pricing`)**:
   - Starter ($199/mo) — Social Media Essentials
   - Growth ($399/mo) — Social Media Growth (MOST RECOMMENDED)
   - Premium ($699/mo) — Social Media Pro
   - 7 Standalone services ($99, $125, $149, $199)
   - Deliverables comparison table and pricing FAQ accordion.
8. **Insights & Blog (`/blog` and `/blog/:slug`)**:
   - Category filtering, real-time search, reading time, and formatted reader.
9. **Contact Us (`/contact`)**:
   - 10-field inquiry form connected to live MongoDB backend and Nodemailer.
10. **Administrative Dashboard (`/admin`)**:
    - Secure JWT authentication with bcrypt hashing.
    - Real-time pipeline KPI metrics.
    - Inquiry manager with search, filter, status lifecycle, internal notes, and CSV export.
    - Portfolio project CRUD and file uploader.
    - Blog publishing manager.
    - Dynamic pricing package and standalone service manager.
    - Site settings configuration.

---

## 🔒 Production VPS Deployment

Refer to [`docs/DEPLOYMENT_GUIDE.md`](./docs/DEPLOYMENT_GUIDE.md) for complete step-by-step instructions on setting up Nginx, PM2, Let's Encrypt SSL, and automated MongoDB backups on an Ubuntu VPS.

---

## 📄 License & Ownership

© 2026 AJDesigners. All rights reserved. Co-Founded by Yashwa & Aroosa.

