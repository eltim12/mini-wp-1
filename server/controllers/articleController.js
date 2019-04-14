const Article = require('../models/article')
const User = require('../models/user')
const mongoose = require('mongoose')

module.exports = {
    findAll(req, res) {
        Article.find({})
            .populate('tags')
            .populate('userId')
            .then(articles => {
                res.status(200).json(articles)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    },

    find(req, res) {
        Article.findById(req.params.id)
            .populate('userId')
            .populate('tags')
            .then(article => {
                if (!article) {
                    res.status(404).json({ message: 'not found' })
                } else {
                    res.status(200).json(article)
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },

    async findByUserId(req, res) {
        Article.find({
            userId: req.params.userId
        })
            .populate("tags")
            .populate("userId")
            .then(articles => {
                console.log(articles)
                if (articles.length !== 0) {
                    // res.status(200).json(articles)
                    return articles
                } else {
                    return User.findById(req.params.userId)
                }
            })
            .then(articles => {
                console.log(articles)
                res.status(200).json(articles)
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    },

    update(req, res) {
        Article.findByIdAndUpdate(req.params.id, {
            tags: []
        }, { new: true })
            .then((updated) => {
                return Article.findByIdAndUpdate(req.params.id, {
                    title: req.body.title,
                    content: req.body.content,
                    photo: req.fileUrl,
                    userId: req.authenticated.userId,
                    $push: {
                        tags: req.body.selectedTags
                    }
                }, { new: true })
            })
            .then(latest => {
                res.status(200).json(latest)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    },

    delete(req, res) {
        Article.findByIdAndDelete(req.params.id)
            .then(() => {
                res.status(200).json({ message: 'delete success' })
            })

            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    },

    async create(req, res) {
        try {
            let newArticle = await Article.create({
                title: req.body.title,
                content: req.body.content,
                photo: req.fileUrl,
                userId: req.authenticated.userId
            })
            let updatedArticle = await Article.findByIdAndUpdate(newArticle._id, {
                $push: { tags: req.body.selectedTags }
            }, { new: true })
            res.status(201).json(updatedArticle)
        } catch (err) {
            console.log(err)
            res.status(500).json({
                msg: err.message
            })
        }
    },

    async like(req, res) {
        try {
            let found = await Article.findById(req.params.id)
            if (!found) {
                res.status(404).json({
                    msg: 'not Found.'
                })
            } else {
                let likes = found.like
                let result = likes + 1
                let liked = await Article.findByIdAndUpdate(req.params.id, {
                    like: result
                }, { new: true })
                res.status(200).json(liked)
            }
        } catch (err) {
            console.log(err)
            res.status(500).json({
                msg: err.message
            })
        }
    },

    async unlike(req, res) {
        try {
            let found = await Article.findById(req.params.id)
            if (!found) {
                res.status(404).json({
                    msg: 'not Found.'
                })
            } else {
                let likes = found.like
                let result = likes - 1
                let liked = await Article.findByIdAndUpdate(req.params.id, {
                    like: result
                }, { new: true })
                res.status(200).json(liked)
            }
        } catch (err) {
            console.log(err)
            res.status(500).json({
                msg: err.message
            })
        }
    },

    async findByTag(req, res) {
        console.log("masuk ke find by tag", req.query.tag.split(" "))
        // req.query.split()
        try {
            let search = req.query.tag.split(" ")
            let allArticle = await Article.find({}).populate('tags').populate('userId')

            let found = []
            allArticle.map(e => {
                e.tags.map(t => {
                    search.forEach(q => {
                        if (t.tagName.toLowerCase() === q.toLowerCase()) {
                            found.push(e)
                        }
                    });
                })
            })

            res.status(200).json(found)
        } catch (err) {
            console.log(err)
        }
    },

    async getTop3(req, res) {
        let sorted = await Article.find({}).populate("userId").sort('-like')
        res.status(200).json(sorted)
    },
}