const { Op, UniqueConstraintError, ValidationError } = require('sequelize');
const { UserModel } = require('../db/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.login = (req, res) => {
    if(!req.body.username || !req.body.password){
        const msg = "Veuillez fournir un nom d'utilisateur et un mot de passe."
        return res.status(400).json({message: msg})
    }
    
    UserModel.findOne({ where : {username: req.body.username}})
        .then(user => {
            if(!user){
                const msg = "L'utilisateur demandé n'existe pas."
                return res.status(404).json({message: msg})
            }

            bcrypt.compare(req.body.password, user.password)
                .then(isValid => {
                    if(!isValid){
                        const msg = "Le mot de passe est incorrect."
                        return res.status(404).json({message: msg})
                    }

                    // json web token
                    const token = jwt.sign({
                        data: user.id
                      }, 'mon_petit_secret', { expiresIn: '1h' });

                    const msg = "L'utilisateur a été connecté avec succès."
                    user.password = "hidden"
                    return res.json({message: msg, user, token})
                })
        })
        .catch(error => {
            const msg = "L'utilisateur n'a pas pu se connecter."
            return res.status(500).json({message: msg, error})
        })
}

exports.protect = (req, res, next) => {
    const authorizationHeader = req.headers.authorization

    if(!authorizationHeader){
        const message = "Un jeton est nécessaire pour accéder à la ressource"
        return res.status(401).json({message})
    }

    try {
        const token = authorizationHeader.split(' ')[1];
        const decoded = jwt.verify(token, 'mon_petit_secret')
    } catch (err) {
        const message = "Jeton invalide"
        return res.status(403).json({message, data: err})
    }
    
    return next();
}