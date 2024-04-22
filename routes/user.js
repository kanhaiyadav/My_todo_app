const User = require('../model/users_model.js');

const express = require('express');
const router = express.Router()
const user_controller = require("../controllers/user_controller.js");
const passport = require('passport');

router.get('/signin', user_controller.signin);
router.get('/signup', user_controller.signup);
router.get('/logout', user_controller.logout);
router.get('/settings', user_controller.settings);
router.get('/profile',passport.checkAuthenticated, user_controller.profile);
router.post('/create_user', user_controller.create);
router.post('/update', User.uploadedAvatar, user_controller.update);
router.post('/authorize',passport.authenticate('local',{
    failureRedirect:'/user/signin'
}) ,user_controller.authorize);

module.exports = router;