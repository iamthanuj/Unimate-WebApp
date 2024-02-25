const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const cors = require('cors')
const path = require('path')
const helmet = require('helmet')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db') 
const port = process.env.PORT || 5000


connectDB()
const app  = express()

//configuration
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}))
app.use(express.urlencoded({extended: false}))
app.use(morgan("common"))
app.use(cors())


app.use('/api/posts', require('./routes/postRoutes'))
app.use('/api/users', require('./routes/userRoutes'))


app.use(errorHandler)

app.listen(port, ()=>{console.log(`Server Started on port ${port}`)})   