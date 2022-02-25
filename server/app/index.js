const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv')
dotenv.config()

const PORT = process.env.PORT || 8000

const db = require('./models');
const path = require('path')

const { Client } = require('@shaggytools/nhtsa-api-wrapper');
const vinValidator = require('vin-validator');
const pwHasher = require('password-hash')

const cloudinary = require('cloudinary').v2

cloudinary.config({ 
    cloud_name: 'dmizsfnhe', 
    api_key: '964149184881432', 
    api_secret: '04gwMlpSnFMIuKw-8dHy59AtTO0' 
  });

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
app.use(express.static(path.join(__dirname, 'build')))

// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.get('/api/login', async (req, res) => {
    const shop = await db.shops.find({ username: req.query.username })
    if (shop.length > 0) {
        pwHasher.verify(req.query.password, shop[0].password)
            ? res.json({ shop: shop[0] })
            : res.json({ error: 'Invalid Username or Password' })
    } else {
        res.json({ error: 'Invalid Username or Password' })
    }
})

app.get('/api/newShop', async (req, res) => {
    const duplicateUsername = await db.shops.find({ username: req.query.username })
    const dupliacteEmail = await db.shops.find({ email: req.query.email })
    if (duplicateUsername.length === 0 || dupliacteEmail.length === 0) {
        const Shop = db.shops
        const shop = new Shop({
            shopName: req.query.shopName,
            email: req.query.email,
            phoneNumber: req.query.phoneNumber,
            username: req.query.username,
            password: pwHasher.generate(req.query.password)
        });

        shop.save(shop)
            .then(data => {
                res.json({ shop: shop })
            })
            .catch(err => {
                res.json({ msg: 'error', error: err })
            })
    } else {
        res.json({ error: 'Username or Email already exists' })
    }

})

app.post('/api/imageUpload', (req, res) => {
    console.log(req)
    cloudinary.uploader.upload(req.body)
    .then(result => res.json({res: result}))
})

app.get('/api/newEstimateRequest', (req, res) => {
    console.log(req.query.files)
    const EstimateRequest = db.estimates
    const newEstimateRequet = new EstimateRequest({
        username: req.query.username,
        insuranceCompany: req.query.insuranceCompany,
        vin: req.query.vin,
        year: req.query.year,
        make: req.query.make,
        model: req.query.model,
        description: req.query.description,
        files: req.query.files,
        awaiting: true,
        closed: false
    })

    newEstimateRequet.save(newEstimateRequet)
        // .then(() => {
        //     res.json({ msg: 'New Estimate Created', estimate: newEstimateRequet })
        // })
        .catch(err => res.json({error: 'There was an error submitting your request, please try again or contact support'}))
})

app.get('/api/awaitingEstimates', async (req, res) => {
    const username = req.query.username
    const awaitingEstimates = await db.estimates.find({ username: username, awaiting: true })

    res.json({ estimates: awaitingEstimates })
})

app.get('/api/vin', async (req, res) => {
    const vin = req.query.vin
    const isValidVin = vinValidator.validate(vin)
    if (isValidVin) {
        const vehicle = await Client.DecodeVin(vin);
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

