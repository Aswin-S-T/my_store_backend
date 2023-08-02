const express = require('express')
const storeRouter = express.Router()

storeRouter.get('/',(req,res)=>{
    res.send('Store related router called')
})

module.exports = storeRouter