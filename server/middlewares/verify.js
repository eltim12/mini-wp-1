const User = require('../models/user')
const Article = require('../models/article')
const jwt = require('jsonwebtoken')

module.exports = {

    authenticate: function (req, res, next) {
        console.log('authenticating...')

        try {
            const tokenCheck = jwt.verify(req.headers.token, process.env.SECRET_KEY)
            req.authenticated = tokenCheck
            console.log('user authenticated!')
            next()

        } catch (err) {
            res.status(401).json({
                msg: 'user not authenticated'
            })
        }
    },

    authorization: function (req, res, next) {
        Article
            .findById(req.params.id)
            .then(found => {
                if (found.userId._id.toString() === req.authenticated.userId) {
                    next()
                } else {
                    res.status(401).json({
                        msg: 'not Authorized'
                    })
                }
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err.message)
            })

    },
}