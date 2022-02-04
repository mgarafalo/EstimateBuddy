const express = require('express');

const { MongoClient } = require('mongodb')
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'EstimateBuddyTestV1';

const cors = require('cors');
const app = express();
const PORT = 8000

app.use(cors())

app.get('/api/newShop', (req, res) => {
    res.send(`Shop Name: ${req.query.shopName}, Email Address: ${req.query.email}`);
})

app.listen(PORT, () => {
    console.log(`Listneing on ${PORT}`)
    client.connect()
    console.log('Connected to DB')
})

