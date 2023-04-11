const { Sequelize, DataTypes } = require('sequelize');
const CoworkingModelSequelize = require('../models/coworking')
const coworkings = require('../mock-coworking');

const sequelize = new Sequelize('lapiscine_coworking', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    logging: false
});

const CoworkingModel = CoworkingModelSequelize(sequelize, DataTypes)

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
    })
    .catch(error => console.log('Erreur'))
}

sequelize.authenticate()
    .then(() => console.log('La connexion à la base de données a bien été établie.'))
    .catch(error => console.error(`Impossible de se connecter à la base de données ${error}`))


module.exports = {
    sequelize, CoworkingModel, initDb
}