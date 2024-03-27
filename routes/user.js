const express = require('express');
const { route } = require('.');
const router = express.Router();
const controller = require("../controllers/user_controller.js")
router.get('/profile', controller.profile);
router.get('/passwords-manager', controller.password_manager);
router.post('/Edit-profile', controller.edit_profile);
module.exports = router;