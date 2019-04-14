const vision = require('@google-cloud/vision')

// Creates a client
const client = new vision.ImageAnnotatorClient({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});


module.exports = {

    async generate(req, res, next) {
        console.log(typeof req.filePath, req.filePath, 'ini req file pathhhhhh')
        try {
            let results = await client
                .labelDetection(req.filePath)
            const labels = results[0].labelAnnotations;
            let allTags = []
            labels.forEach(name => {
                allTags.push(name.description)
            })
            let tags = (allTags)
            console.log(tags)
            res.status(201).json({
                tags,
                deleteFilePath: req.filePath
            })
        } catch (err) {
            console.log(err, 'ininni====================')
            res.status(500).json({
                msg: 'internal server error.'
            })
        }
    }
}
