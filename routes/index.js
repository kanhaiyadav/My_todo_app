const express = require('express');
const router = express.Router();
const controller = require('../controllers/home_controller.js');
console.log('router is loaded');
router.get('/', controller.home);
module.exports = router;