const express = require("express");
const router = express.Router();
const home_controller = require('../controllers/home_controller.js');

router.use('/user', require('./user'));

router.get('/',  home_controller.unknown);
router.get('/home',  home_controller.home);
router.post('/new-task',  home_controller.create_task);
router.get('/delete-task/:id', home_controller.delete_task);


module.exports = router;