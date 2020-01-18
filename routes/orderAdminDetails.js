var express = require('express');
var router  = express.Router();

/*var passport = require("../config/passport");
var users_controller = require('../controllers/users_controller');
var isAuthenticated = require("../config/middleware/isAuthenticated");*/

var admin_controller = require('../controllers/orderAdmin_controller');
router.get('/', admin_controller.OrderFill);

module.exports=router;