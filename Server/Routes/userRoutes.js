const express = require("express");
const { registerUser, loginUser, allUsers} = require("../Controllers/userController");
const {protect} = require("../Middlewares/authMiddleware")

const router = express.Router();

router.route("/signup").post(registerUser)
router.route("/login").post(loginUser).get(protect, allUsers)

module.exports = router
