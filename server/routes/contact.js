// routes/contact.js
import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, company, message } = req.body;

  try {
    const nodemailer = await import('nodemailer');

    const transporter = nodemailer.default.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Get all admin emails
    const adminUsers = await User.find({ role: 'admin' }).select('email');
    const adminEmails = adminUsers.map(admin => admin.email);

    if (adminEmails.length === 0) {
      return res.status(500).json({ message: 'No admin emails found' });
    }

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: adminEmails,
      subject: `Contact Form Message from ${name} (${company})`,
      html: emailHtml
    });

    res.status(200).json({ message: 'Message sent successfully' });
  } catch (err) {
    console.error('Error sending contact email:', err.message);
    res.status(500).json({ message: 'Failed to send message' });
  }
});

export default router;
