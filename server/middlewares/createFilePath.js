const fs = require('fs')

module.exports = function (req, res, next) {
    const { image } = req.body;
    const base64Data = image.replace(/^data:image\/png;base64,|^data:image\/jpeg;base64,/, "");
    const newFilename = Date.now() + '.' + 'jpeg';
    const newFile = 'uploads/' + newFilename;
    req.filePath = newFile
    fs.writeFile(newFile, base64Data, 'base64', function (err) {
        if (err) {
            console.log(err);
            next()
        } else {
            next()
        }
    });
}