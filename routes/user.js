const express = require('express');
const { route } = require('.');
const router = express.Router();
const controller = require("../controllers/user_controller.js")
router.get('/profile', controller.profile);
module.exports = router;