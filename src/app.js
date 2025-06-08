// src/app.js
const express = require('express');
const path = require('path');
const cors = require('cors');
const routes = require('./routes');
const swaggerSpec = require('./config/swagger');
const swaggerUi = require('swagger-ui-express');

const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Static files
app.use('/', express.static(path.join(__dirname, 'uploads')));

// ✅ API routes
app.use('/api', routes);

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;
