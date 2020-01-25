var express = require('express');
var router  = express.Router();

var cart_controller = require('../controllers/cart_controller');
var isAuthenticated = require("../config/middleware/isAuthenticated");

//router.get('/', isAuthenticated, trips_controller.index);
router.get('/',isAuthenticated, cart_controller.index);
router.put('/charges',isAuthenticated,cart_controller.updateSubtotal);
router.put('/',isAuthenticated,cart_controller.updateShoppingCard);
router.delete('/:id',isAuthenticated,cart_controller.deleteShoppingCard);


//router.post('/new', isAuthenticated, trips_controller.createTrip);

module.exports = router;