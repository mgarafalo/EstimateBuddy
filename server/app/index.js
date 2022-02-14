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

const db = require('./models');
const { shop } = require('./models');
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('connected to db')
    }).catch(err => {
        console.log('error conntecting to db', err)
        process.exit()
    })

app.use(cors())

app.get('/api/newShop', (req, res) => {
    const Shop = new shop({
        shopName: req.query.shopName,
        email: req.query.email,
        phoneNumber: req.query.phoneNumber,
        username: req.query.username,
        password: req.query.password
    });

    Shop.save(Shop).then(data => {
        console.log(data)
        res.json({data: data})
    }).catch(err => {
        res.json({ msg: 'error', error: err})
    })

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
})

