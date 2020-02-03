var express = require('express');
var router  = express.Router();


var menu_controller = require('../controllers/menu_controller');
router.get('/', menu_controller.menu);

router.get('/getAllProducts', menu_controller.getAllProducts);

//////Aysen////////
router.get('/getAllCategories', menu_controller.getAllCategories);
//////////////////
router.post('/getProduct', menu_controller.getProduct);
router.post('/addProductToOrder', menu_controller.addProductToOrder);


module.exports=router;