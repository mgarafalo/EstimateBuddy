const mongo = require("../config/mongo");

module.exports = {
  // url: "mongodb://localhost:27017/EstimateBuddyTestV1"
  url: process.env.MONGO_URL || mongo.url
};