const multer = require('multer');
const path = require('path');
const {checkDir, createDir, storagePath} = require("../utils/files");

const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (!checkDir()) {
            createDir()
        }
        cb(null, storagePath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG and GIF are allowed.'), false);
    }
};

const upload = multer({
    storage: diskStorage,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter: fileFilter
});

module.exports = upload;