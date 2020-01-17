module.exports = function(app){

    const orderAdminList = require('./routes/orderAdminList');
    const orderAdminDetails = require('./routes/orderAdminDetails');
    const shoppingCard = require('./routes/shoppingCard');
    
    app.use('/shoppingCard', shoppingCard);
    app.use('/orderAdminList', orderAdminList);
    app.use('/orderAdminDetails', orderAdminDetails);
    
//other routes..
}