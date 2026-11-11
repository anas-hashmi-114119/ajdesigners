import nodemailer from 'nodemailer';

export const sendInquiryEmails = async (inquiryData) => {
  const {
    fullName,
    businessName,
    workEmail,
    country,
    websiteUrl,
    serviceRequired,
    businessType,
    estimatedBudget,
    projectDescription,
    preferredContactMethod,
  } = inquiryData;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, NOTIFICATION_EMAIL } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.log('ℹ️ SMTP is not configured. Email notification skipped for inquiry from:', workEmail);
    return { success: true, simulated: true };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT) || 587,
      secure: Number(SMTP_PORT) === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    const adminRecipient = NOTIFICATION_EMAIL || 'contact@ajdesigners.com';

    // 1. Notification to AJDesigners Team
    const adminMailOptions = {
      from: `"AJDesigners System" <${SMTP_USER}>`,
      to: adminRecipient,
      subject: `🚀 New Project Inquiry from ${fullName} (${businessName})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #101828; margin-bottom: 5px;">New Client Project Inquiry</h2>
          <p style="color: #64748b; font-size: 14px;">Submitted via AJDesigners Official Portal</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr><td style="padding: 8px 0; font-weight: bold; width: 35%;">Client Name:</td><td>${fullName}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Business Name:</td><td>${businessName}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Work Email:</td><td><a href="mailto:${workEmail}">${workEmail}</a></td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Country:</td><td>${country}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Website URL:</td><td>${websiteUrl || 'Not provided'}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Business Type:</td><td>${businessType}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Service Required:</td><td style="color: #2563EB; font-weight: bold;">${serviceRequired}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Estimated Budget:</td><td>${estimatedBudget}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Preferred Contact:</td><td>${preferredContactMethod}</td></tr>
          </table>

          <div style="margin-top: 20px; padding: 15px; background: #f8fafc; border-radius: 6px;">
            <p style="margin: 0 0 8px 0; font-weight: bold; color: #1e293b;">Project Brief / Description:</p>
            <p style="margin: 0; color: #334155; line-height: 1.5; white-space: pre-wrap;">${projectDescription}</p>
          </div>
        </div>
      `,
    };

    // 2. Automated Friendly Acknowledgment to Prospect
    const userMailOptions = {
      from: `"AJDesigners" <${SMTP_USER}>`,
      to: workEmail,
      subject: `Thank you for contacting AJDesigners — We received your inquiry`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #101828;">Hello ${fullName},</h2>
          <p style="color: #334155; line-height: 1.6;">
            Thank you for reaching out to <strong>AJDesigners</strong>. We have received your inquiry regarding <strong>${serviceRequired}</strong> for <strong>${businessName}</strong>.
          </p>
          <p style="color: #334155; line-height: 1.6;">
            Our creative and strategic team is currently reviewing your project requirements. A member of our team will get in touch with you shortly via your preferred channel (${preferredContactMethod}).
          </p>
          <div style="margin: 25px 0; padding: 15px; background: #EFF6FF; border-left: 4px solid #2563EB; border-radius: 4px;">
            <p style="margin: 0; color: #1E40AF; font-size: 14px;">
              <strong>What happens next?</strong><br>
              We analyze your brand context, assess scope requirements, and prepare customized recommendations for our discovery call.
            </p>
          </div>
          <p style="color: #64748b; font-size: 13px; margin-top: 30px;">
            Warm regards,<br>
            <strong>AJDesigners Team</strong><br>
            <em>Creative Minds. Digital Growth.</em><br>
            <a href="https://ajdesigners.com" style="color: #2563EB;">ajdesigners.com</a>
          </p>
        </div>
      `,
    };

    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions),
    ]);

    return { success: true };
  } catch (error) {
    console.error('❌ Failed to send inquiry email via Nodemailer:', error.message);
    return { success: false, error: error.message };
  }
};

