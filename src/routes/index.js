const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const userRoutes = require('./user');
const authMiddleware = require('../middlewares/auth.middleware');

router.use('/auth', authRoutes);
router.use('/user', authMiddleware, userRoutes);

module.exports = router;