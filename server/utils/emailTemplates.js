const BRAND_COLOR = '#7C3AED';

const baseLayout = (content) => `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:32px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;">
          <tr>
            <td style="background-color:${BRAND_COLOR};padding:24px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:28px;letter-spacing:1px;">Empower Stop</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 24px;">
              ${content}
            </td>
          </tr>
          <tr>
            <td style="background-color:#f9fafb;padding:16px 24px;text-align:center;font-size:12px;color:#6b7280;">
              <p style="margin:0;">This email was sent by Empower Stop. Please do not reply directly to this email.</p>
              <p style="margin:4px 0 0;">&copy; ${new Date().getFullYear()} Empower Stop. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

const welcomeEmail = (name) => ({
  subject: 'Welcome to Empower Stop!',
  html: baseLayout(`
    <h2 style="margin:0 0 16px;color:${BRAND_COLOR};font-size:22px;">Welcome, ${name}!</h2>
    <p style="margin:0 0 12px;color:#374151;font-size:16px;line-height:1.6;">
      We are thrilled to have you join the Empower Stop community. This is a safe space built to empower,
      connect, and uplift women from all walks of life.
    </p>
    <p style="margin:0 0 12px;color:#374151;font-size:16px;line-height:1.6;">
      Here you can discover resources, find opportunities, share your experiences, and support one another.
    </p>
    <p style="margin:0;color:#374151;font-size:16px;line-height:1.6;">
      Let's rise together!
    </p>
  `),
});

const passwordResetEmail = (name, resetUrl) => ({
  subject: 'Empower Stop - Password Reset Request',
  html: baseLayout(`
    <h2 style="margin:0 0 16px;color:${BRAND_COLOR};font-size:22px;">Password Reset</h2>
    <p style="margin:0 0 12px;color:#374151;font-size:16px;line-height:1.6;">
      Hi ${name}, we received a request to reset your password. Click the button below to choose a new one.
    </p>
    <table cellpadding="0" cellspacing="0" style="margin:24px 0;">
      <tr>
        <td style="background-color:${BRAND_COLOR};border-radius:6px;padding:12px 32px;">
          <a href="${resetUrl}" style="color:#ffffff;text-decoration:none;font-size:16px;font-weight:bold;">Reset Password</a>
        </td>
      </tr>
    </table>
    <p style="margin:0 0 12px;color:#374151;font-size:14px;line-height:1.6;">
      If the button does not work, copy and paste this link into your browser:
    </p>
    <p style="margin:0 0 12px;color:${BRAND_COLOR};font-size:14px;word-break:break-all;">
      ${resetUrl}
    </p>
    <p style="margin:0;color:#6b7280;font-size:14px;line-height:1.6;">
      This link will expire in 1 hour. If you did not request a password reset, please ignore this email.
    </p>
  `),
});

const accountBannedEmail = (name) => ({
  subject: 'Empower Stop - Account Suspended',
  html: baseLayout(`
    <h2 style="margin:0 0 16px;color:#dc2626;font-size:22px;">Account Suspended</h2>
    <p style="margin:0 0 12px;color:#374151;font-size:16px;line-height:1.6;">
      Hi ${name}, your Empower Stop account has been suspended due to a violation of our community guidelines.
    </p>
    <p style="margin:0 0 12px;color:#374151;font-size:16px;line-height:1.6;">
      If you believe this was a mistake, please reach out to our support team for further assistance.
    </p>
    <p style="margin:0;color:#6b7280;font-size:14px;line-height:1.6;">
      We take community safety seriously and appreciate your understanding.
    </p>
  `),
});

module.exports = { welcomeEmail, passwordResetEmail, accountBannedEmail };
