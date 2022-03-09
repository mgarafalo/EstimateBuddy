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

const formidable = require('formidable')
const cloudinary = require('cloudinary')

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
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

app.get('/api/login', async (req, res) => {
  if (req.query.username !== 'admin') {
    const shop = await db.shops.find({ username: req.query.username })
    if (shop.length > 0) {
      pwHasher.verify(req.query.password, shop[0].password)
        ? res.json({ shop: shop[0] })
        : res.json({ error: 'Invalid Username or Password' })
    } else {
      res.json({ error: 'Invalid Username or Password' })
    }
  } else {
    const admin = await db.shops.find({ username: req.query.username })
    admin.length > 0 ?
      pwHasher.verify(req.query.password, admin[0].password)
        ? res.json({ admin: admin[0] })
        : res.json({ error: 'Invalid Username or Password' })
      : res.json({ error: 'Invalid Username or Password' })
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
        cloudinary.v2.api.create_folder(`EstimateBuddy/${shop.shopName}`)
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
  const form = new formidable.IncomingForm()
  try {
    form.parse(req, (err, fields, files) => {
      try {
        cloudinary.v2.uploader.upload(files.file.filepath,
          {
            use_filename: true,
            filename_override: `${fields.shopName}_${fields.vin}`,
            folder: `EstimateBuddy/${fields.shopName}`
          },
          (cloudError, result) => {
            // console.log(result)
            res.json({
              result: result,
              filename: files.file.originalFilename,
              url: result.secure_url
            })
          }).catch(err => res.json({ error: `form error: ${err}` }))
      } catch (error) {
        console.log(error)
      }
    })
  } catch (error) {
    console.log('catch', error)
    res.json({ error: error })
  }
})

app.get('/api/newEstimateRequest', (req, res) => {
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
    .then(() => {
      res.json({ msg: 'New Estimate Created' })
    })
    .catch(err => res.json({ error: 'There was an error submitting your request, please try again or contact support' }))
})

app.get('/api/awaitingEstimates', async (req, res) => {
  const username = req.query.username
  const awaitingEstimates = username !== 'admin'
    ? await db.estimates.find({ username: username, awaiting: true })
    : await db.estimates.find({ awaiting: true })

  res.json({ estimates: awaitingEstimates })
})

app.get('/api/markOpen', async (req, res) => {
  req.query.user.username !== 'admin'
    ? res.json({ error: 'Invalid Operation' })
    : await db.estimates.updateOne(
      { _id: req.query.id },
      {
        $set: { awaiting: false }
      }
    )
      .then(res.json({ id: req.query.id }))
      .catch(err => res.json({ error: err }))
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

// Delete test estimates
app.get('/api/delete', async (req, res) => {
  await db.estimates.deleteMany({ username: 'test' })
  res.send('done')
})

// Sets all estimates awaiting prop to true 
app.get('/api/resetAll', async (req, res) => {
  await db.estimates.updateMany(
    { awaiting: false },
    { $set: { awaiting: true } }
  ).then(res.send('done'))
})

app.listen(PORT, () => {
  console.log(`Listneing on ${PORT}`)
})