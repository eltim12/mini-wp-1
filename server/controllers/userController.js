const User = require('../models/user')
const bcrypt = require('../helpers/bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {

    create(req, res) {
        User
            .create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
            .then(createdUser => {
                res.status(201).json(createdUser)
            })
            .catch(err => {
                if (err.errors.name) {
                    res.status(400).json({
                        msg: err.errors.name.message
                    })
                } else if (err.errors.email) {
                    res.status(400).json({
                        msg: err.errors.email.message
                    })
                } else if (err.errors.password) {
                    res.status(400).json({
                        msg: err.errors.password.message
                    })
                } else {
                    res.status(500).json('internal server error')
                }
            })
    },

    findAll(req, res) {
        User
            .find({})
            .then(allUsers => {
                res.status(200).json(allUsers)
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    },

    find(req, res) {
        User
            .findById(req.params.id)
            .then(foundUser => {
                if (foundUser) {
                    res.status(200).json(foundUser)
                } else {
                    res.status(404).json({
                        msg: 'not Found.'
                    })
                }

            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    },

    update(req, res) {
        User
            .findById(req.params.id)
            .then(foundUser => {
                if (!foundUser) {
                    res.status(404).json({
                        msg: 'not Found.'
                    })
                } else {
                    return User
                        .findByIdAndUpdate(req.params.id, req.body, { new: true })
                }
            })
            .then(updatedUser => {
                res.status(200).json({
                    msg: 'update success.'
                })
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    },

    delete(req, res) {
        User
            .findById(req.params.id)
            .then(foundUser => {
                if (!foundUser) {
                    res.status(404).json({
                        msg: 'not Found.'
                    })
                } else {
                    return User
                        .findByIdAndDelete(req.params.id)
                }
            })
            .then(deletedUser => {
                res.status(200).json(deletedUser)
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    },

    login(req, res) {
        User
            .findOne({
                email: req.body.email,
            })
            .then(found => {
                if (!found) {
                    throw new Error(401)
                } else {
                    if (bcrypt.compare(req.body.password, found.password) === true) {
                        let jwtData = {
                            email: found.email,
                            name: found.name,
                            userId: found._id
                        }
                        let token = jwt.sign(jwtData, process.env.SECRET_KEY)
                        res.status(200).json({
                            token,
                            userId: found._id,
                            name: found.name
                        })
                    } else {
                        throw new Error(401)
                    }
                }
            })
            .catch(err => {
                if (err.message === "401") {
                    res.status(401).json({
                        msg: 'email/password wrong.'
                    })
                }
                res.status(403).json({
                    msg: 'internal server error'
                })
            })
    },

    googleLogin(req, res) {
        User
            .findOne({
                email: req.body.email
            })
            .then(user => {
                if (!user) {
                    return User
                        .create({
                            name: req.body.name,
                            email: req.body.email,
                            password: 'google'
                        })

                } else {
                    return user
                }
            })
            .then(user => {
                let jwtData = {
                    email: user.email,
                    userId: user._id,
                    name: user.name
                }
                let token = jwt.sign(jwtData, process.env.SECRET_KEY)
                res.status(200).json({
                    token,
                    email: user.email,
                    userId: user._id,
                    name: user.name
                })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    msg: 'internal server error'
                })
            })
    },

    verify(req, res) {
        try {
            const tokenCheck = jwt.verify(req.headers.token, process.env.SECRET_KEY)
            req.authenticated = tokenCheck
            console.log('user authenticated!')
            res.status(200).json({
                msg: 'user authenticated'
            })
        } catch (err) {
            res.status(401).json({
                msg: 'user not authenticated'
            })
        }
    }
}