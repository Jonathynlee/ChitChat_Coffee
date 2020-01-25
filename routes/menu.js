var express = require('express');
var router  = express.Router();


var menu_controller = require('../controllers/menu_controller');
router.get('/', menu_controller.index);
router.post('/getProduct', menu_controller.getProduct);

module.exports=router;