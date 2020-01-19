var express = require('express');
var router  = express.Router();

/*var passport = require("../config/passport");
var users_controller = require('../controllers/users_controller');
var isAuthenticated = require("../config/middleware/isAuthenticated");*/

var mainPage_controller = require('../controllers/mainPage_controller');

router.get('/', mainPage_controller.mainPage);


module.exports=router;