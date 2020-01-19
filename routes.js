module.exports = function(app){

    const orderAdminList = require('./routes/orderAdminList');
    const orderAdminDetails = require('./routes/orderAdminDetails');
    const shoppingCard = require('./routes/shoppingCard');
    const createProductAdmin = require('./routes/createProductAdmin');
    const checkout = require('./routes/checkout');
    const mainPage = require('./routes/mainPage');
    
    
    app.use('/shoppingCard', shoppingCard);
    app.use('/orderAdminList', orderAdminList);
    app.use('/orderAdminDetails', orderAdminDetails);
    app.use('/createProductAdmin', createProductAdmin);
    app.use('/checkout', checkout);
    app.use('/', mainPage);
    
//other routes..
}