var express = require('express');
var router  = express.Router();

/*var passport = require("../config/passport");
var users_controller = require('../controllers/users_controller');
var isAuthenticated = require("../config/middleware/isAuthenticated");*/

var menu_controller = require('../controllers/menu_controller');
router.get('/', menu_controller.menu);

module.exports=router;