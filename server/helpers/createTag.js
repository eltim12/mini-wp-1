const Tag = require('../models/tag')

module.exports = {
    tagHandler: async function (req, res, next) {
        if (req.body.selectedTags) {
            let tagPromiseAll = []
            req.body.selectedTags.forEach(name => {
                tagPromiseAll.push(Tag.create({ tagName: name }))
            })
            let allTags = await Promise.all(tagPromiseAll)
            req.body.selectedTags = allTags
            next()
        } else {
            next()
        }
    }
}