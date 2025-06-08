const {DataTypes} = require('sequelize');
const {sequelize} = require('../config/database');

const File = sequelize.define('File', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    extension: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mimetype: {
        type: DataTypes.STRING,
        allowNull: false
    },
    size: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    path: {
        type: DataTypes.STRING,
        allowNull: false
    },
    uploadDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
});

module.exports = File;