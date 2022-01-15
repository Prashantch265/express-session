const {Sequelize} = require("sequelize");
const sequelize = require("./index");

const Sessions = sequelize.define("Session", {
    sid: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    uid: Sequelize.STRING,
    expires: Sequelize.DATE,
    data: Sequelize.TEXT,
  });

module.exports = Sessions;