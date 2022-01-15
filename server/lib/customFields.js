// const session = require("../../database/models/session.model");

const extendDefaultFields = (defaults, session) => {
  return {
    data: defaults.data,
    expires: defaults.expires,
    uid: session.uid,
  };
};

module.exports = {extendDefaultFields};