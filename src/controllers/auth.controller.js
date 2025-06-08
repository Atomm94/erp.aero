const AuthService = require("../services/auth.service");

class AuthController {
    constructor() {
        this.authService = new AuthService();
    }

    /**
     * @swagger
     * /api/auth/signUp:
     *   post:
     *     summary: Register a new user
     *     tags: [Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - login
     *               - password
     *             properties:
     *               login:
     *                 type: string
     *               password:
     *                 type: string
     *     responses:
     *       200:
     *         description: Success
     *       400:
     *         description: Bad Request
     */
    async signUp(req, res) {
        const {login, password} = req.body;
        try {
            const {data, statusCode} = await this.authService.signUp(login, password)
            return res.status(statusCode).json(data);
        } catch (error) {
            return res.status(error.statusCode || 400).json({message: error.message});
        }
    }


    /**
     * @swagger
     * /api/auth/signIn:
     *   post:
     *     summary: Login user
     *     tags: [Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - login
     *               - password
     *             properties:
     *               login:
     *                 type: string
     *               password:
     *                 type: string
     *     responses:
     *       200:
     *         description: Success
     *       400:
     *         description: Bad Request
     *       401:
     *         description: Invalid credentials
     *       404:
     *         description: Not Found
     */
    async signIn(req, res) {
        const {login, password} = req.body;
        try {
            const userInfo = {
                ua: req.headers['user-agent'],
                ip: req.ip || req.connection.remoteAddress
            }

            const {data, statusCode} = await this.authService.signIn(login, password, userInfo)
            return res.status(statusCode).json(data);
        } catch (error) {
            return res.status(error.statusCode || 400).json({message: error.message});
        }
    }

    /**
     * @swagger
     * /api/auth/new_token:
     *   post:
     *     summary: Get new access token using refresh token
     *     tags: [Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - refresh_token
     *             properties:
     *               refresh_token:
     *                 type: string
     *     responses:
     *       200:
     *         description: Success
     *       400:
     *         description: Bad Request
     *       401:
     *         description: Unauthorized
     *       404:
     *         description: Not Found
     */
    async newToken(req, res) {
        const {refresh_token} = req.body;
        try {
            const {data, statusCode} = await this.authService.newToken(refresh_token)
            return res.status(statusCode).json(data);
        } catch (error) {
            return res.status(error.statusCode || 400).json({message: error.message});
        }
    }

    /**
     * @swagger
     * /api/auth/logOut:
     *   get:
     *     summary: Log out user from device
     *     tags: [Auth]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Success
     *       400:
     *         description: Bad Request
     */
    async logOut(req, res) {
        try {
            const {device_id} = req.user;
            const {data, statusCode} = await this.authService.logOut(device_id)
            return res.status(statusCode).json(data);
        } catch (error) {
            return res.status(error.statusCode || 400).json({message: error.message});
        }
    }


}

module.exports = AuthController;