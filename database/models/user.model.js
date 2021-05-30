const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const user = sequelize.define('users', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
});

module.exports = user;