var express = require('express');
var router  = express.Router();

/*var passport = require("../config/passport");
var users_controller = require('../controllers/users_controller');
var isAuthenticated = require("../config/middleware/isAuthenticated");*/

var manageAccounts_controller = require('../controllers/manageAccounts_controller');
router.get('/', manageAccounts_controller.manageAccounts);

module.exports=router;