const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const hashPassword = async (plain) => await bcrypt.hash(plain, 10);
const verifyPassword = async (plain, hash) => await bcrypt.compare(plain, hash);
const generateToken = (email) => jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '2h' });
const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET);

module.exports = { hashPassword, verifyPassword, generateToken, verifyToken };
