const dbConfig = require('../db.config')
const mongoose = require('mongoose')
const mongo = require('../../config/mongo')

mongoose.Promise= global.Promise

const db = {}

db.mongoose = mongoose
db.url = dbConfig.url || mongo.url
db.estimates = require('./estimateRequest.models.js')(mongoose)
db.shops = require('./shop.model')(mongoose)

module.exports = db