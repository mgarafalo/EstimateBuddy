const express = require('express');
const { Client } = require('@shaggytools/nhtsa-api-wrapper');
const vinValidator = require('vin-validator');

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
        res.json({ msg: 'Logged In', shopName: 'Miskin Body Shop' })
    } else {
        res.send({ error: 'Invalid Email or Password' })
    }
})

app.get('/api/signup', (req, res) => {
    const shop = req.query.contactInfo
    res.json({ shopInfo: JSON.parse(shop) })
})

app.get('/api/vin', async (req, res) => {
    const vin = req.query.vin
    const isValidVin = vinValidator.validate(vin)
    if (isValidVin) {
        const vehicle = await Client.DecodeVin(vin);
        // res.json({vehicle: vehicle})
        res.json({
            vehicle: {
                year: vehicle.Results[9].Value,
                make: vehicle.Results[6].Value,
                model: vehicle.Results[8].Value,
                vin: vin
            }
        })
    } else {
        res.json({ error: 'VIN is invalid!' })
    }
})

app.listen(PORT, () => {
    console.log(`Listneing on ${PORT}`)
    // client.connect()
    // console.log('Connected to DB')
})

