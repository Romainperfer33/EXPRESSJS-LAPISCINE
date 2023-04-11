const bcrypt = require('bcrypt');
const { Sequelize, DataTypes } = require('sequelize');
const CoworkingModelSequelize = require('../models/coworking')
const UserModelSequelize = require('../models/user')
const coworkings = require('../mock-coworkings');

const sequelize = new Sequelize('lapiscine_coworking', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    logging: false
});

const CoworkingModel = CoworkingModelSequelize(sequelize, DataTypes)
const UserModel = UserModelSequelize(sequelize, DataTypes)

const initDb = () => {
    return sequelize.sync({ force: true }) 
    .then(() => {
        // création des 11 coworkings dans la bdd, avec une boucle, 
        // message à afficher en console : La liste des {11} coworkings a bien été créée.
        coworkings.forEach((element) => {
            CoworkingModel.create({
                name: element.name,
                price: element.price,
                address: element.address,
                superficy: element.superficy,
                capacity: element.capacity,
            })
        })

        bcrypt.hash('mdp', 10)
            .then((hash) => {
                UserModel.create({
                    username: 'paul',
                    password: hash
                })
            })
            .catch(err => console.log(err))

        bcrypt.hash('mdp', 10)
        .then((hash) => {
            UserModel.create({
                username: 'pierre',
                password: hash
            })
        })
        .catch(err => console.log(err))    
    })
    .catch(error => console.log('Erreur'))
}

sequelize.authenticate()
    .then(() => console.log('La connexion à la base de données a bien été établie.'))
    .catch(error => console.error(`Impossible de se connecter à la base de données ${error}`))


module.exports = {
    sequelize, CoworkingModel, initDb
}