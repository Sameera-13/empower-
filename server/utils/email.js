const nodemailer = require('nodemailer');

/**
 * Send an email using SMTP transport if configured, otherwise log to console.
 * This function never throws - errors are caught and logged.
 * @param {object} param0
 * @param {string} param0.to - Recipient email address
 * @param {string} param0.subject - Email subject line
 * @param {string} param0.html - Email HTML body
 */
const sendEmail = async ({ to, subject, html }) => {
  try {
    if (process.env.SMTP_HOST) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT, 10) || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.SMTP_FROM || '"Empower Stop" <noreply@empowerstop.com>',
        to,
        subject,
        html,
      });

      console.log(`Email sent to ${to}: ${subject}`);
    } else {
      console.log('--- EMAIL (SMTP not configured, logging instead) ---');
      console.log(`To: ${to}`);
      console.log(`Subject: ${subject}`);
      console.log(`HTML: ${html}`);
      console.log('--- END EMAIL ---');
    }
  } catch (error) {
    console.error('Failed to send email:', error.message);
  }
};

module.exports = sendEmail;
