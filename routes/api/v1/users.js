const express = require("express");
const router = express.Router();
const userController = require("../../../controllers/api/v1/users");


router.post("/create-session", userController.createSession);

module.exports = router;