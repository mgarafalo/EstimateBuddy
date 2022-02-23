const dbConfig = require('../db.config')
const mongoose = require('mongoose')

mongoose.Promise= global.Promise

const db = {}

db.mongoose = mongoose
db.url = dbConfig.url
console.log(db.url)
db.estimates = require('./estimateRequest.models.js')(mongoose)
db.shops = require('./shop.model')(mongoose)

module.exports = db