const express = require('express')
const morgan = require('morgan')
const serveFavicon = require('serve-favicon')
const sequelize = require('./db/sequelize')
const app = express()
const port = 3000

sequelize.initDb();

app
    .use(morgan('dev'))
    .use(serveFavicon(__dirname + '/favicon.ico'))
    .use(express.json())

const coworkingRouter = require('./routes/coworkingRoutes')
const userRouter = require('./routes/userRoute')

app.use('/api/coworkings', coworkingRouter)
app.use('/api/users', userRouter)

app.listen(port, () => {
    console.log(`L'app sur le port ${port}`)
})