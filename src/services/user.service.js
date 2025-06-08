const User = require('../models/User');
const ResponseHandler = require("../utils/responseHandler");

class UserService {
    constructor() {
        this.handler = new ResponseHandler();
    }

    async getInfo(userId) {
        try {
            const user = await User.findOne({where: {id: userId}});
            if (!user) return this.handler.error('User not found', 404);

            return this.handler.success({id: user.id});
        } catch (error) {
            return this.handler.error('Failed to get user info', 400);
        }
    }

}

module.exports = UserService;