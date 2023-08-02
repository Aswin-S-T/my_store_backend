const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')

const app = express()

// Database configuration
const db = require('./config/db')
const userRouter = require('./routes/users/userRouter')
const storeRouter = require('./routes/store/storeRouter')
db.connect()

const port = process.env.PORT || 5000

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
dotenv.config()

// Routes configuration
app.use('/api/v1/user',userRouter)
app.use('/api/v1/store',storeRouter)

app.get('/',(req,res)=>{
    res.send('Nodejs started....')
})

app.listen(port,()=>{
    console.log(`Server is running at the port ${port}`)
})