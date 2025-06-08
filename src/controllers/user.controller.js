const UserService = require("../services/user.service");
const FileService = require("../services/file.service");

class UserController {
    constructor() {
        this.userService = new UserService();
        this.fileService = new FileService();
    }

    /**
     * @swagger
     * /api/user/info:
     *   get:
     *     summary: Get user information
     *     tags: [User]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Success
     *       404:
     *         description: Not Found
     *       400:
     *         description: Bad Request
     */
    async getInfo(req, res) {
        const {id} = req.user;
        try {
            const {data, statusCode} = await this.userService.getInfo(id);

            return res.status(statusCode).json(data);
        } catch (error) {
            return res.status(error.statusCode || 400).json({message: error.message});
        }
    }

    /**
     * @swagger
     * /api/user/file/upload:
     *   post:
     *     summary: Upload a new file
     *     tags: [Files]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         multipart/form-data:
     *           schema:
     *             type: object
     *             required:
     *               - file
     *             properties:
     *               file:
     *                 type: string
     *                 format: binary
     *     responses:
     *       200:
     *         description: Success
     *       400:
     *         description: Bad Request
     *
     */
    async uploadFile(req, res) {
        try {
            const {data, statusCode} = await this.fileService.upload(req.file);
            return res.status(statusCode).json(data);
        } catch (error) {
            return res.status(error.statusCode || 400).json({message: error.message});
        }
    }

    /**
     * @swagger
     * /api/user/files:
     *   get:
     *     summary: Get list of files
     *     tags: [Files]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: query
     *         name: page
     *         schema:
     *           type: integer
     *         description: Page number
     *       - in: query
     *         name: list_size
     *         schema:
     *           type: integer
     *         description: Number of items per page
     *     responses:
     *       200:
     *         description: Success
     *       404:
     *         description: Not Found
     *       400:
     *         description: Bad Request
     */
    async getFiles(req, res) {
        try {
            const {list_size, page} = req.query;
            const {data, statusCode} = await this.fileService.list(page, list_size);
            return res.status(statusCode).json(data);
        } catch (error) {
            return res.status(error.statusCode || 400).json({message: error.message});
        }
    }

    /**
     * @swagger
     * /api/user/file/{id}:
     *   delete:
     *     summary: Delete a file
     *     tags: [Files]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Success
     *       404:
     *         description: Not Found
     *       400:
     *         description: Bad Request
     */
    async deleteFile(req, res) {
        try {
            const {id} = req.params;
            const {data, statusCode} = await this.fileService.delete(id);
            return res.status(statusCode).json(data);
        } catch (error) {
            return res.status(error.statusCode || 400).json({message: error.message});
        }
    }

    /**
     * @swagger
     * /api/user/file/{id}:
     *   get:
     *     summary: Get file information
     *     tags: [Files]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Success
     *       404:
     *         description: Not Found
     *       400:
     *         description: Bad Request
     */
    async getFileInfo(req, res) {
        try {
            const {id} = req.params;
            const {data, statusCode} = await this.fileService.getFile(id);
            return res.status(statusCode).json(data);
        } catch (error) {
            return res.status(error.statusCode || 400).json({message: error.message});
        }
    }

    /**
     * @swagger
     * /api/user/file/{id}/download:
     *   get:
     *     summary: Download a file
     *     tags: [Files]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Success
     *       404:
     *         description: Not Found
     *       400:
     *         description: Bad Request
     */
    async downloadFile(req, res) {
        try {
            const {id} = req.params;
            const {path, name} = await this.fileService.download(id);
            return res.download(path, name, (err) => {
                if (err) {
                    return res.status(400).json({message: err.message});
                }
            });
        } catch (error) {
            return res.status(error.statusCode || 400).json({message: error.message});
        }
    }

    /**
     * @swagger
     * /api/user/file/{id}:
     *   put:
     *     summary: Update a file
     *     tags: [Files]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         multipart/form-data:
     *           schema:
     *             type: object
     *             required:
     *               - file
     *             properties:
     *               file:
     *                 type: string
     *                 format: binary
     *     responses:
     *       200:
     *         description: Success
     *       404:
     *         description: Not Found
     *       400:
     *         description: Bad Request
     */
    async updateFile(req, res) {
        try {
            const {id} = req.params;
            const {data, statusCode} = await this.fileService.update(id, req.file);
            return res.status(statusCode).json(data);
        } catch (error) {
            return res.status(error.statusCode || 400).json({message: error.message});
        }
    }
}

module.exports = UserController;