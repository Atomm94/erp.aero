// routes/auth.middleware.js
const express = require('express');
const auth = express.Router();
const AuthController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const authController = new AuthController();

// Routes
auth.post('/signUp', (req, res) => authController.signUp(req, res));
auth.post('/signIn', (req, res) => authController.signIn(req, res));
auth.post('/new_token', (req, res) => authController.newToken(req, res));
auth.get('/logOut', authMiddleware, (req, res) => authController.logOut(req, res));

module.exports = auth;