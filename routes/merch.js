var express = require('express');
var router  = express.Router();

/*var passport = require("../config/passport");
var users_controller = require('../controllers/users_controller');
var isAuthenticated = require("../config/middleware/isAuthenticated");*/

var merch_controller = require('../controllers/merch_controller');
router.get('/', merch_controller.merch);

module.exports=router;