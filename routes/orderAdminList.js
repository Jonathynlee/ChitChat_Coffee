var express = require('express');
var router  = express.Router();

/*var passport = require("../config/passport");
var users_controller = require('../controllers/users_controller');
var isAuthenticated = require("../config/middleware/isAuthenticated");*/

var admin_controller = require('../controllers/orderAdmin_controller');


router.put('/partOrder/:id', admin_controller.orderPartReady);
router.put('/updateStatusOrder/:id',admin_controller.updateStatusOrder);
router.post('/sendSMS',admin_controller.sendSMS);
router.post('/placePastOrder/:id',admin_controller.placePastOrder);
router.get('/', admin_controller.OrderList);


module.exports=router;