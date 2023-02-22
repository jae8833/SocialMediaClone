const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");

router.post("/login", AuthController.login_post);

router.post("/logout", AuthController.logout_post);

module.exports = router;
