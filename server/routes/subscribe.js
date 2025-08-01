const express = require('express');
const router = express.Router();
const transporter = require('../config/mailer');
const Subscriber = require('../models/Subscriber');

router.post('/', async (req, res) => {
  const { email } = req.body;

  try {
    // Store subscriber
    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    // Send email notification
    await transporter.sendMail({
      to: process.env.EMAIL_USER,
      subject: 'New Newsletter Signup',
      text: `A new subscriber just joined: ${email}`,
    });

    res.status(200).json({ success: true, message: 'Subscription successful!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Error saving subscription.' });
  }
});

module.exports = router;
