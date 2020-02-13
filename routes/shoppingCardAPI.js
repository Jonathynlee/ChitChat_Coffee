var express = require('express');
var router  = express.Router();

var cart_controller = require('../controllers/cart_controller');
var isAuthenticated = require("../config/middleware/isAuthenticated");


router.get('/',isAuthenticated, cart_controller.apiIndex);

//router.put('/',isAuthenticated,cart_controller.updateShoppingCard);



module.exports = router;