const router = require("express").Router();
const tagController = require("../controllers/tagController")
const createFilePath = require('../middlewares/createFilePath')
const generateTags = require('../helpers/tagGenerator')

//create new tag
router.post("/getTags", createFilePath, generateTags.generate);
router.get("/", tagController.findTag)

module.exports = router;