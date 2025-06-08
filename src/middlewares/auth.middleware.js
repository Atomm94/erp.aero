const jwt = require('jsonwebtoken');
const UsersTokens = require("../models/Users_Tokens");

module.exports = async (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({message: 'Token required'});

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const device = await UsersTokens.findOne({ where: { device_id: decoded.device_id }});

        if (!device) return res.status(401).json({message: 'Invalid token'});

        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({message: error.message});
    }
};