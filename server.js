const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const morgan = require('morgan')

dotenv.config({ path: './config/config.env' })

const transaction = require('./routes/transaction')
const connectDB = require('./config/db')

connectDB()

const app = express()

app.use(express.json()) //allows you to do req.body, body parser middleware
app.use('/api/v1/transactions', transaction)

if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'))
}


const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on 
port ${PORT}`.yellow.bold))