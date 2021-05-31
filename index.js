const express = require('express')
const logger = require('morgan')

const app = express()

app.use(logger('common'))

app.use(express.json())
app.use(express.urlencoded({extended: false}))

require('./api/routes')(app)

const PORT = process.env.PORT || 8050
app.listen(PORT, () => {
    console.log(`Microsoft Authentication API is now running locally on port ${PORT}`)
})