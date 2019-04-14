const router = require("express").Router()
const userController = require("../controllers/userController")
const googleEncrypt = require('../helpers/googleEncrypt')

// ──[verify user]─────────────────────
router.get("/verify", userController.verify)

// ──[create new user]─────────────────────
router.post("/", userController.create)

// ──[find  all user]─────────────────────
router.get("/", userController.findAll)

// ──[find  user by id]─────────────────────
router.get("/:id", userController.find)

// ──[update a user]─────────────────────
router.patch("/:id", userController.update)

// ──[delete a user]─────────────────────
router.delete("/:id", userController.delete)

// ──[delete a user]─────────────────────
router.post("/login", userController.login)

// ──[user login with google]─────────────────
router.post('/g-sign', googleEncrypt, userController.googleLogin)

module.exports = router