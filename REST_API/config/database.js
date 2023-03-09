const mongoose = require("mongoose");
const config = require("./config");

module.exports = async () => {
  return await mongoose
    .createConnection(config.development.databaseUrl)
    .asPromise();
};
