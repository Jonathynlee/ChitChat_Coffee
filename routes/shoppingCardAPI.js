var express = require('express');
var router  = express.Router();

var cart_controller = require('../controllers/cart_controller');
var isAuthenticated = require("../config/middleware/isAuthenticated");

//router.get('/', isAuthenticated, trips_controller.index);
router.get('/',isAuthenticated, cart_controller.apiIndex);

//router.put('/',isAuthenticated,cart_controller.updateShoppingCard);

//router.post('/new', isAuthenticated, trips_controller.createTrip);

module.exports = router;