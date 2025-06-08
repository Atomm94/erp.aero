const User = require('../models/User');
const jwt = require('jsonwebtoken');
const generateDeviceId = require('../utils/generateDeviceId');
const ResponseHandler = require("../utils/responseHandler");
const UsersTokens = require('../models/Users_Tokens');

class AuthService {
    constructor() {
        this.handler = new ResponseHandler();
    }

    async signUp(login, password) {
        const user = await User.create({login, password});
        const {password: _, ...userData} = user.toJSON();

        return this.handler.success(userData);
    };

    async signIn(login, password, userInfo) {
        const user = await User.findOne({where: {login}});

        if (!user) return this.handler.error('User not found', 404);

        const isValid = await user.validatePassword(password);
        if (!isValid) return this.handler.error('Invalid credentials', 401);

        const device_id = generateDeviceId(userInfo);
        
        const token = jwt.sign({id: user.id, device_id}, process.env.JWT_SECRET, {expiresIn: '10m'});
        const refreshToken = jwt.sign({id: user.id, device_id}, process.env.JWT_SECRET);

        await UsersTokens.findOrCreate({
            where: {device_id},
            defaults: {
                user_id: user.id,
                device_id,
                token: refreshToken
            },
            update: {
                token: refreshToken
            }
        });

        return this.handler.success({ accessToken: token, refreshToken });
    };

    async newToken(refreshToken) {
        if (!refreshToken) return this.handler.error('Refresh token is required', 400);

        try {
            const { id, device_id } = jwt.verify(refreshToken, process.env.JWT_SECRET);

            const device = await UsersTokens.findOne({ where: { device_id } });

            if (!device) return this.handler.error('Invalid refresh token', 401);

            const user = await User.findByPk(id);
            
            if (!user) return this.handler.error('User not found', 404);

            const newAccessToken = jwt.sign({id: user.id, device_id}, process.env.JWT_SECRET, {expiresIn: '10m'});

            return this.handler.success({accessToken: newAccessToken});
        } catch (error) {
            return this.handler.error('Invalid refresh token', 401);
        }
    }

    async logOut(device_id) {
        if (!device_id) return this.handler.error('Device id is required', 400);

        const destroy = await UsersTokens.destroy({
            where: {
                device_id
            }
        });

        if (!destroy) {
            return this.handler.error('Logged out is failed', 400);
        }

        return this.handler.success({message: 'Logged out successfully'});
    }
}

module.exports = AuthService;