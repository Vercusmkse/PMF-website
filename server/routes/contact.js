const express = require('express');
const router = express.Router();
const transporter = require('../config/mailer');
const Message = require('../models/Message');

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Save to DB
    const newMsg = new Message({ name, email, message });
    await newMsg.save();

    // Send notification email
    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `New Contact Message from ${name}`,
      text: message,
    });

    res.status(200).json({ success: true, message: 'Message received!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Failed to send or store message.' });
  }
});

module.exports = router;
