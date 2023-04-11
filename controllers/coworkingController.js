let coworkings = require('../mock-coworking');
const { Op } = require('sequelize');
const { CoworkingModel } = require('../db/sequelize')


exports.findAllCoworkings = (req, res) => {
    if(req.query.search){
        // notre recherche avec paramètres
        CoworkingModel.findAll({ where: { name: {[Op.like] : `%${req.query.search}%`} } })
        .then((elements)=>{
            if(!elements.length){
                return res.json({message: "Aucun coworking ne correspond à votre recherche"})    
            }
            const msg = 'La liste des coworkings a bien été récupérée en base de données.'
            res.json({message: msg, data: elements})
        })
        .catch((error) => {
            const msg = 'Une erreur est survenue.'
            res.status(500).json({message: msg})
        })
    } else {
        CoworkingModel.findAll()
        .then((elements)=>{
            const msg = 'La liste des coworkings a bien été récupérée en base de données.'
            res.json({message: msg, data: elements})
        })
        .catch((error) => {
            const msg = 'Une erreur est survenue.'
            res.status(500).json({message: msg})
        })
    }
}

exports.findCoworkingByPk = (req, res) => {
    // Afficher le coworking correspondant à l'id en params, en le récupérant dans la bdd     findByPk()
    CoworkingModel.findByPk(req.params.id)
        .then(coworking => {
            if (coworking === null) {
                const message = `Le coworking demandé n'existe pas.`
                res.status(404).json({ message })
            } else {
                const message = "Un coworking a bien été trouvé."
                res.json({ message, data: coworking });
            }
        })
        .catch(error => {
            const message = `La liste des coworkings n'a pas pu se charger. Reessayez ulterieurement.`
            res.status(500).json({ message, data: error })
        })
}

exports.updateCoworking = (req, res) => {
    // Modifier le coworking en base de données qui correspond à l'id spécifé dans les params
    CoworkingModel.update(req.body, {
        where: {
            id: req.params.id
        }
    }).then((coworking) => {
        if(coworking === null){
            const msg = "Le coworking demandé n'existe pas."
            res.json({message: msg})
        } else {
            const msg = "Le coworking a bien été modifié."
            res.json({message: msg, data: coworking})
        }
    }).catch(() => {
        const msg = "Impossible de mettre à jour le coworking."
        res.json({message: msg})
    })
}

exports.deleteCoworking = (req, res) => {
    CoworkingModel.findByPk(req.params.id)
        .then(coworking => {
            if (coworking === null) {
                const message = `Le coworking demandé n'existe pas.`
                return res.status(404).json({ message })
            }
            return CoworkingModel.destroy({
                where: {
                    id: req.params.id
                }
            })
                .then(() => {
                    const message = `Le coworking ${coworking.name} a bien été supprimé.`
                    res.json({ message, data: coworking });
                })
        })
        .catch(error => {
            const message = `Impossible de supprimer le coworking.`
            res.status(500).json({ message, data: error })
        })
}

exports.createCoworking = (req, res) => {
    let newCoworking = req.body;
    console.log(req.body);
    // let newId = coworkings[coworkings.length - 1].id + 1;

    // newCoworking.id = newId;
    // coworkings.push(newCoworking);

    Coworking.create({
        name: req.body.name,
        price: req.body.price,
        address: req.body.address,
        picture: req.body.picture,
        superficy: req.body.superficy,
        capacity: req.body.capacity
    }).then(() => {
        const msg = 'Un coworking a bien été ajouté.'
        res.json({ message: msg, data: newCoworking })
    }).catch(error => res.json(error))
}