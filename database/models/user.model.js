const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('./index');

const user = sequelize.define('users', {
    uid: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4
    },
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
});

module.exports = user;