var express = require('express');
var router  = express.Router();

/*var passport = require("../config/passport");
var users_controller = require('../controllers/users_controller');
var isAuthenticated = require("../config/middleware/isAuthenticated");*/

var createProduct_controller = require('../controllers/createProduct_controller');
router.get('/', createProduct_controller.index);

module.exports=router;