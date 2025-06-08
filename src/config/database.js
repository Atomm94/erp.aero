const {Sequelize} = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME || 'erpaero',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || 'Str0ng!Pass123',
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 3306,
        dialect: 'mysql',
        logging: false
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully');
        await sequelize.sync();
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
};

module.exports = {
    sequelize,
    connectDB,
}