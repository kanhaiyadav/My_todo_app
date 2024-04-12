const express = require("express");
const router = express.Router();
const home_controller = require('../controllers/home_controller.js');

router.use('/user', require('./user'));

router.get('/',  home_controller.unknown);
router.post('/new-task',  home_controller.create_task);
router.post('/del-tasks', home_controller.delete_tasks);


module.exports = router;