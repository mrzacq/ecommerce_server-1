if(process.env.NODE_ENV != "production"){
    require('dotenv').config()
}
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000
const router = require('./router/index')
const err = require('./middleware/errHandler')

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(router)
app.use(err)
// app.listen(port, () => console.log(`server http://localhost:${port}`))

module.exports = app