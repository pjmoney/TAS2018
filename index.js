const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://admin:XNkQ5uwK3SfCHcv@ds131997.mlab.com:31997/tas2018', {useCreateIndex: true,
useNewUrlParser: true})
    .then(() => console.log('Connected to MongoDB'))
        .catch(err => console.log(err))

const app = express()

//Middlerware
app.use(bodyParser.json())
app.use(cors())

//Routes
app.use('/users', require('./src/routes/users'))
app.use('/products', require('./src/routes/products'))

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Server running on port ${PORT}...`))