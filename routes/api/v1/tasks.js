const express = require("express");
const router = express.Router();
const passport = require("passport");

let tasks_controller = require("../../../controllers/api/v1/tasks.js");
router.delete('/:id', passport.authenticate('jwt', { session: false }) ,tasks_controller.delete);
router.get('/list',tasks_controller.index);

module.exports = router;