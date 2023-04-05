const express = require('express')
const morgan = require('morgan')
const serveFavicon = require('serve-favicon')
const app = express()
const port = 3000

app
    .use(morgan('dev'))
    .use(serveFavicon(__dirname + '/favicon.ico'))
    .use(express.json())

const coworkingRouter = require('./routes/coworkingRoutes')

app.use('/api/coworkings', coworkingRouter)

app.listen(port, () => {
    console.log(`L'app sur le port ${port}`)
})