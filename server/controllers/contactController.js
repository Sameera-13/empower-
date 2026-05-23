const ContactMessage = require('../models/ContactMessage');
const asyncHandler = require('../utils/asyncHandler');
const logAdminAction = require('../utils/auditLog');
const sendEmail = require('../utils/email');

const CONTACT_NOTIFY_EMAIL = process.env.CONTACT_EMAIL || 'support@empowerstop.com';

const submitMessage = asyncHandler(async (req, res) => {
  const { name, phone, email, company, subject, message } = req.body;
  const msg = await ContactMessage.create({ name, phone, email, company, subject, message });

  // Send notification email to support
  sendEmail({
    to: CONTACT_NOTIFY_EMAIL,
    subject: `New Contact Form: ${subject}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <table style="border-collapse:collapse;width:100%;max-width:500px;">
        <tr><td style="padding:8px;font-weight:bold;color:#555;">Name</td><td style="padding:8px;">${name}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;color:#555;">Email</td><td style="padding:8px;"><a href="mailto:${email}">${email}</a></td></tr>
        ${phone ? `<tr><td style="padding:8px;font-weight:bold;color:#555;">Phone</td><td style="padding:8px;">+91 ${phone}</td></tr>` : ''}
        ${company ? `<tr><td style="padding:8px;font-weight:bold;color:#555;">Company</td><td style="padding:8px;">${company}</td></tr>` : ''}
        <tr><td style="padding:8px;font-weight:bold;color:#555;">Subject</td><td style="padding:8px;">${subject}</td></tr>
      </table>
      <h3 style="margin-top:16px;">Message</h3>
      <p style="white-space:pre-wrap;color:#333;">${message}</p>
    `,
  });

  res.status(201).json({ success: true, message: 'Message sent successfully' });
});

const listMessages = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, unread } = req.query;
  const pageNum = parseInt(page, 10) || 1;
  const limitNum = parseInt(limit, 10) || 20;

  const filter = {};
  if (unread === 'true') filter.isRead = false;

  const [messages, totalCount] = await Promise.all([
    ContactMessage.find(filter)
      .sort({ createdAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum),
    ContactMessage.countDocuments(filter),
  ]);

  res.json({
    success: true,
    data: messages,
    page: pageNum,
    totalPages: Math.ceil(totalCount / limitNum),
    totalCount,
  });
});

const markAsRead = asyncHandler(async (req, res) => {
  const msg = await ContactMessage.findById(req.params.id);
  if (!msg) return res.status(404).json({ success: false, message: 'Message not found' });
  msg.isRead = true;
  await msg.save();
  res.json({ success: true, data: msg });
});

const deleteMessage = asyncHandler(async (req, res) => {
  const msg = await ContactMessage.findById(req.params.id);
  if (!msg) return res.status(404).json({ success: false, message: 'Message not found' });
  await ContactMessage.findByIdAndDelete(req.params.id);
  await logAdminAction(req.user._id, 'DELETE_CONTACT_MESSAGE', msg._id, 'ContactMessage', `Deleted message from: ${msg.name}`);
  res.json({ success: true, message: 'Message deleted' });
});

module.exports = { submitMessage, listMessages, markAsRead, deleteMessage };
