const path = require("path");
const fs = require("node:fs");

const storagePath = path.join(__dirname, '../uploads');

const checkDir = () => {
    return fs.existsSync(storagePath)
}

const createDir = () => {
    return fs.mkdirSync(storagePath);
}

const removeFile = (fileName) => {
    return fs.unlinkSync(`${storagePath}/${fileName}`);
}

module.exports = {
    storagePath,
    checkDir,
    createDir,
    removeFile,
}