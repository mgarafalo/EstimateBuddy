const express = require('express');

// const { MongoClient } = require('mongodb')
// const url = 'mongodb://localhost:27017';
// const client = new MongoClient(url);
// const dbName = 'EstimateBuddyTestV1';

const cors = require('cors');
const app = express();
const PORT = 8000

app.use(cors())

app.get('/api/newShop', (req, res) => {
    res.send(`Shop Name: ${req.query.shopName}, Email Address: ${req.query.email}`);
})

app.get('/api/login', (req, res) => {
    if (req.query.username === 'test' && req.query.password === 'test') {
        res.json({msg: 'Logged In', shopName: req.query.username})
    } else {
        res.send({error: 'Invalid Email or Password'})
    }
})

app.get('/api/signup', (req, res) => {
    const shop = req.query.contactInfo
    res.json({shopInfo: JSON.parse(shop)})
})

app.listen(PORT, () => {
    console.log(`Listneing on ${PORT}`)
    // client.connect()
    // console.log('Connected to DB')
})

