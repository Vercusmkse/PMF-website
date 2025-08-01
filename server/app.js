// server/app.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const contactRoute = require('./routes/contact');
const subscribeRoute = require('./routes/subscribe');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/contact', contactRoute);
app.use('/api/subscribe', subscribeRoute);

app.get('/', (req, res) => {
  res.send('Phucuka Mzansi Foundation backend is running! 🚀');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
