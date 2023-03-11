const mongoose = require("mongoose");
const config = require("./config");

module.exports = async () => {
  return await mongoose.connect(config.development.databaseUrl)
};
