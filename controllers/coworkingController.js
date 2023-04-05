let coworkings = require('../mock_coworking');

exports.findAllCoworkings = (req, res) => {
    // Renvoyer tous les coworkings au format json, uniquement ceux dont la surface est supérieure à 500
    const limit = req.query.limit || 200
    const result = coworkings.filter(element => element.superficy > limit);

    const msg = `La liste des coworkings a bien été retournée.`
    res.json({ message: msg, data: coworkings })
}

exports.findCoworkingByPk = (req, res) => {
    // Afficher le nom du coworking qui correspond à l'id en paramètre
    let myCoworking = coworkings.find((coworking) => { return coworking.id === Number(req.params.id) })

    let result;
    if (myCoworking) {
        const msg = `Le coworking n°${myCoworking.id} a bien été trouvé.`
        result = { message: msg, data: myCoworking }
    } else {
        const msg = `Aucun coworking ne correspond à l'identifiant ${req.params.id}.`
        result = { message: msg, data: {} }
    }

    res.json(result)
}

exports.updateCoworking = (req, res) => {
    // récupérer dans le tableau coworkings le coworking qui correspond à l'id dans les params de la requête
    let coworkingToModify = coworkings.find(coworking => coworking.id == req.params.id)

    // Si le coworking n'existe pas, on renvoie une erreur 404 avec un message
    if (!coworkingToModify) {
        const msg = `Le coworking n°${req.params.id} n'existe pas.`
        return res.status(404).json({ message: msg })
    }

    coworkingToModify = { ...coworkingToModify, ...req.body }

    // remplacer dans le tableau coworkings l'ancien coworking 16 avec coworkingToModify

    // for (let i = 0; i < coworkings.length; i++) {
    //     if (coworkings[i].id == coworkingToModify.id) {
    //         coworkings[i] = coworkingToModify
    //         break;
    //     }
    // }

    let index = coworkings.findIndex((el) => el.id == coworkingToModify.id);
    coworkings[index] = coworkingToModify;

    res.json(coworkings)
}

exports.deleteCoworking = (req, res) => {
    // 1. Récupère dans le tableau le coworking qui correspond à l'id en paramètre
    const coworkingToDelete = coworkings.find(el => el.id == req.params.id)

    // 2. S'il n'existe pas, erreur 404
    if (!coworkingToDelete) {
        return res.status(404).json({ message: `Aucun coworking ne correspond à l'id ${req.params.id}` })
    }

    // 3. On renvoie un nouveau tableau qui ne contiendra plus l'élément qui correspond à l'id
    let coworkingsUpdated = []
    coworkings.forEach((el) => {
        if (el.id != coworkingToDelete.id) {
            coworkingsUpdated.push(el)
        }
    })

    coworkings = coworkingsUpdated;
    res.json(coworkings)
}

exports.createCoworking = (req, res) => {
    let newCoworking = req.body;
    let newId = coworkings[coworkings.length - 1].id + 1;

    newCoworking.id = newId;
    coworkings.push(newCoworking);


    const msg = 'Un coworking a bien été ajouté.'
    res.json({ message: 'Un coworking a bien été ajouté.', data: newCoworking })
}