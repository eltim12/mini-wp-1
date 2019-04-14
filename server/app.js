require("dotenv").config()

const express = require("express")
const cors = require("cors")
const app = express()
const port = 3000
const fs = require('fs')

const mongoose = require("mongoose")
mongoose.set("useFindAndModify", false)

// mongoose.connect(`mongodb://localhost:27017/mini-wp`, { useNewUrlParser: true })

mongoose.connect(`mongodb+srv://${process.env.ATLAST_NAME}:${process.env.ATLAST_PW}@cluster0-sfchz.gcp.mongodb.net/test?retryWrites=true`, { useNewUrlParser: true })


app.use(express.urlencoded({ limit: '50mb', extended: false }));
app.use(express.json({ limit: '50mb' }));
app.use(cors())

const userRoutes = require('./routes/user')
const articleRoutes = require('./routes/article')
const tagRoutes = require('./routes/tag')

app.use('/users', userRoutes)
app.use('/articles', articleRoutes)
app.use('/tags', tagRoutes)

module.exports = app
app.listen(port, () => console.log("listening on port" + port))