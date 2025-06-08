const File = require('../models/File');
const path = require('path');
const ResponseHandler = require('../utils/responseHandler');
const {removeFile, storagePath} = require("../utils/files");

class FileService {
    constructor() {
        this.handler = new ResponseHandler();
    }

    async upload(file) {
        const fileData = {
            name: file.filename,
            extension: path.extname(file.originalname),
            mimetype: file.mimetype,
            size: file.size,
            path: `${process.env.HOST}:${process.env.PORT}/${file.filename}`,
            uploadDate: new Date()
        };

        const newFile = await File.create(fileData);
        return this.handler.success(newFile);
    }

    async list(page = 1, listSize = 10) {
        const offset = (page - 1) * listSize;
        const files = await File.findAndCountAll({
            attributes: [
                'id',
                'name',
                'extension',
                'mimetype',
                'size',
                'path',
                'uploadDate'
            ],
            limit: listSize,
            offset,
            order: [['uploadDate', 'DESC']]
        });

        return this.handler.success({
            files: files.rows,
            currentPage: page,
        })
    }
                
    async delete(id) {
        const file = await File.findByPk(id);
        if (!file) return this.handler.error('File not found', 404);

        removeFile(file.name)
        await file.destroy();

        return this.handler.success({message: 'File deleted successfully'});
    }

    async getFile(id) {
        const file = await File.findByPk(id);

        if (!file) return this.handler.error('File not found', 404);

        return this.handler.success(file);
    }

    async download(id) {
        const file = await File.findByPk(id);
        if (!file) return this.handler.error('File not found', 404);

        return {
            path: `${storagePath}/${file.name}`,
            name: file.name,
        };
    }

    async update(id, newFile) {
      try {
          const file = await File.findByPk(id);
          if (!file) throw new Error('File not found');

          removeFile(file.name)

          const fileData = {
              name: newFile.filename,
              extension: path.extname(newFile.originalname),
              mimetype: newFile.mimetype,
              size: newFile.size,
              path: `${process.env.HOST}:${process.env.PORT}/${newFile.filename}`,
              uploadDate: new Date()
          };

          await File.update(fileData, {
              where: { id }
          });

          const updatedFile = await File.findByPk(id);

          return this.handler.success(updatedFile);
      } catch (error) {
          removeFile(newFile.filename)
          return this.handler.error(error.message, 404);
      }
    }
}

module.exports = FileService;