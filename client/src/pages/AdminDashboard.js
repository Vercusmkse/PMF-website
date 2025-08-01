import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MessageList from '../components/MessageList';
import SubscriberList from '../components/SubscriberList';

const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

router.post('/admin/login',verifyToken, async (req, res) => {
  const { email, password } = req.body;

  // Validate credentials (custom logic here)
  const isValid = email === 'admin@example.com' && password === 'securepass';
  if (!isValid) return res.status(401).json({ message: 'Unauthorized' });

  const token = jwt.sign({ email }, 'your_secret_key', { expiresIn: '2h' });
  res.json({ token });
});

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(403).send('Token required');

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, 'your_secret_key');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send('Invalid token');
  }
};



const AdminDashboard = () => {
  const [messages, setMessages] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
   const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/admin/login', { email, password });
      localStorage.setItem('token', res.data.token);
      window.location.href = '/admin/dashboard';
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  useEffect(() => {
    axios.get('/admin/dashboard', {
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
})

      .then(res => {
        setMessages(res.data.messages);
        setSubscribers(res.data.subscribers);
      })
      .catch(err => console.error('Error fetching admin data:', err));
  }, []);

  return (
    
    

    <div style={{ padding: '2rem' }}>

    <form onSubmit={handleSubmit}>
      <h2>Admin Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Login</button>
    </form> 
      <h1>Admin Dashboard</h1>
      <section>
        <h2>Messages</h2>
        <MessageList data={messages} />
      </section>
      <section>
        <h2>Subscribers</h2>
        <SubscriberList data={subscribers} />
      </section>
    </div>

    
  );
};

export default AdminDashboard;
