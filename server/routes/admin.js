const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const { verifyPassword, generateToken } = require('../utils/auth');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(401).json({ error: 'Invalid credentials' });

  const valid = await verifyPassword(password, admin.password);
  if (!valid) return res.status(401).json({ error: 'Wrong password' });

  const token = generateToken(admin.email);
  res.json({ token });
});

const Message = require('../models/Message');
const Subscriber = require('../models/Subscriber');

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

router.get('/dashboard', async (req, res) => {
  try {
    const messages = await Message.find().sort({ date: -1 });
    const subscribers = await Subscriber.find().sort({ date: -1 });

    res.status(200).json({ messages, subscribers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch dashboard data.' });
  }
});



module.exports = router;
module.exports = mongoose.model('Admin', AdminSchema);
