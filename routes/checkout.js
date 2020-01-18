var express = require('express');
var router  = express.Router();

/*var passport = require("../config/passport");
var users_controller = require('../controllers/users_controller');
var isAuthenticated = require("../config/middleware/isAuthenticated");*/

var checkout_controller = require('../controllers/checkout_controller');
router.get('/', checkout_controller.index);

module.exports=router;