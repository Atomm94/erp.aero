// routes/auth.middleware.js
const express = require('express');
const user = express.Router();
const UserController = require('../controllers/user.controller');
const upload = require('../config/upload');

const userController = new UserController();

// Routes
user.get('/info', (req, res) => userController.getInfo(req, res));
user.post('/file/upload', upload.single('file'), (req, res) => userController.uploadFile(req, res));
user.get('/file/list', (req, res) => userController.getFiles(req, res));
user.delete('/file/delete/:id', (req, res) => userController.deleteFile(req, res));
user.get('/file/:id', (req, res) => userController.getFileInfo(req, res));
user.get('/file/download/:id', (req, res) => userController.downloadFile(req, res));
user.put('/file/update/:id', upload.single('file'), (req, res) => userController.updateFile(req, res));


module.exports = user;