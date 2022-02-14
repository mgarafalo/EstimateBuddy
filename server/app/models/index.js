const dbConfig = require('../db.config')
const mongoose = require('mongoose')

mongoose.Promise= global.Promise

const db = {}

db.mongoose = mongoose
db.url = dbConfig.url
db.estimate = require('./estimateRequest.models.js')(mongoose)
db.shop = require('./shop.model')(mongoose)

module.exports = db