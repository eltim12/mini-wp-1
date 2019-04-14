'use strict'
require('dotenv').config()

const Storage = require('@google-cloud/storage')
const fs = require('fs');
const CLOUD_BUCKET = process.env.CLOUD_BUCKET


const storage = Storage({
  projectId: process.env.GCLOUD_PROJECT,
  keyFilename: process.env.KEYFILE_PATH
})
const bucket = storage.bucket(CLOUD_BUCKET)


const getPublicUrl = (filename) => {
  return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`
}

const sendUploadToGCS = (req, res, next) => {
  if (!req.file) {
    return next()
  }

  const gcsname = 'idgaf' + Date.now()
  const file = bucket.file(gcsname)

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  })

  stream.on('error', (err) => {
    req.file.cloudStorageError = err
    next(err)
  })

  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsname
    file.makePublic().then(() => {
      req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
      console.log(req.file.cloudStoragePublicUrl)
      next()
    })
  })

  stream.end(req.file.buffer)
}

const uploads = (req, res, next) => {
  console.log(req.body.deletePath, 'ini delete path=======================')
  const { image, deletePath } = req.body;

  if (deletePath && image) {

    if(deletePath === 'update' && image === 'update') {
      req.fileUrl = req.body.existImage
      next()
    } else {
      fs.unlink(deletePath, (err) => {
        if (err) {
        console.log('===error from uploads====', err)
        res.status(500).json({
          msg: err.message
        })
      } else {
        console.log(`${deletePath} for getting tags was deleted`);
      }
    });
    
    const base64Data = image.replace(/^data:image\/png;base64,|^data:image\/jpeg;base64,/, "");
    const newFilename = Date.now() + '.' + 'png';
    const newFile = 'uploads/' + newFilename;

    req.fileName = newFilename
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

  } else {
    next()
  }
}

const goToGCS = (req, res, next) => {
  //-
  // Upload a file from a local path.
  //-
  if (req.filePath) {
    bucket.upload(req.filePath, function (err, file, apiResponse) {
      req.fileUrl = getPublicUrl(req.fileName);

      fs.unlink(req.filePath, (err) => {
        if (err) {
          console.log('===error from goToGcs====', err)
          res.status(500).json({
            msg: err.message
          })
        }
        console.log(`${req.filePath} for GCS upload was deleted`);
      });

      next();
    });
  } else {
    next()
  }

}


module.exports = {
  getPublicUrl,
  sendUploadToGCS,
  uploads,
  goToGCS
}