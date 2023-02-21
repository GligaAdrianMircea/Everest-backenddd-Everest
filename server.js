require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')
const sellProuctRoutes = require('./routes/sellproduct')
const stripe = require('./routes/stripe')
const path = require('path')
var bodyParser = require('body-parser');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json())
app.use(express.static('uploads'))
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/api/user', userRoutes)
app.use('/api/sell', sellProuctRoutes)
app.use('/stripe/buy', stripe)


mongoose.connect(process.env.MONGO_URL)
.then(() => {
    app.listen(process.env.PORT || 4000, () => {
        console.log("connected to db & listening on port", process.env.PORT)
    })
})
.catch((error) => {
    console.log(error)
})
// https://cloud.mongodb.com/v2/635829b7203faf57d15fc724#clusters - link sa vad in browser db mongo