const {Sequelize} = require("sequelize");
const sequelize = require("./index");

const session = sequelize.define("Session", {
    sid: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    // userId: Sequelize.STRING,
    expires: Sequelize.DATE,
    data: Sequelize.TEXT,
  });
  
//   function extendDefaultFields(defaults, session) {
//     return {
//       data: defaults.data,
//       expires: defaults.expires,
//       userId: session.userId,
//     };
//   }

module.exports = session;