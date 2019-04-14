const router = require("express").Router();
const upload = require('../helpers/googleUpload');
const articleController = require("../controllers/articleController");
const tagController = require('../controllers/tagController');
const tagHandler = require('../helpers/createTag')
const { authenticate, authorization } = require('../middlewares/verify')


//get one article data find by any
router.get("/user/:userId", articleController.findByUserId);

router.get("/findByTag", articleController.findByTag)


//get 3 article data with most likes 
router.get("/mostlikes", articleController.getTop3);


//get one article data find by any
router.get("/:id", articleController.find);


//get all articles data
router.get("/", articleController.findAll);


router.patch('/like/:id', articleController.like)
router.patch('/unlike/:id', articleController.unlike)
//====middlewares=====
router.use(authenticate)

//like an article



//create new article
router.post("/", upload.uploads, upload.goToGCS, tagHandler.tagHandler, articleController.create);

//update an article
router.patch("/:id", authorization, upload.uploads, upload.goToGCS, tagHandler.tagHandler, articleController.update)

//delete an article
router.delete("/:id", authorization, articleController.delete)


module.exports = router;