const {DataTypes} = require('sequelize');
const {sequelize} = require('../config/database');
const User = require('./User');

const UsersTokens = sequelize.define('Users_Tokens', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    device_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    indexes: [
        {
            unique: true,
            fields: ['user_id', 'device_id']
        }
    ]
});

module.exports = UsersTokens;