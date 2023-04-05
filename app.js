const express = require('express')
const morgan = require('morgan')
const serveFavicon = require('serve-favicon')
const { Sequelize, DataTypes } = require('sequelize');
const CoworkingModel = require ('./models/coworking')
const app = express()
const port = 3000

const sequelize = new Sequelize('lapiscine_coworking', 'root', '', {
  host: 'localhost',
  dialect:'mariadb'
});

const Coworking = CoworkingModel(sequelize,DataTypes)

sequelize.sync({ force: true })
  .then (() => {
    Coworking.create ({
      name: "Imagin'Office",
      price: { "hour": null, "day": 25, "month": 199 },
      address: { "number": "7", "street": "place des Citernes", "postCode": 33800, "city": "Bordeaux" },
      picture: "",
      superficy: 1400,
      capacity: 122,
    })
    .then(() => {console.log ('La base a bien ete sync')})
    .catch(error => console.log('il manque'))
  })

sequelize.authenticate()
  .then(() => console.log('la connexion à la base de données a bien ete etablie'))
  .catch(error => console.error (`Impossible de se connecter à la base de données ${error}`))
app
    .use(morgan('dev'))
    .use(serveFavicon(__dirname + '/favicon.ico'))
    .use(express.json())

const coworkingRouter = require('./routes/coworkingRoutes')

app.use('/api/coworkings', coworkingRouter)

app.listen(port, () => {
    console.log(`L'app sur le port ${port}`)
})