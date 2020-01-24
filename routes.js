module.exports = function (app) {

    const orderAdminList = require('./routes/orderAdminList');
    const orderAdminDetails = require('./routes/orderAdminDetails');
    const shoppingCard = require('./routes/shoppingCard');
    const createProductAdmin = require('./routes/createProductAdmin');
    const checkout = require('./routes/checkout');

    const users = require('./routes/users');
    const mainPage = require('./routes/mainPage');

    const shoppingCardAPI = require('./routes/shoppingCardAPI');
    const orderAdminListAPI= require('./routes/orderAdminListAPI');


    app.use('/shoppingCard/:id', shoppingCard);
    app.use('/shoppingCard', shoppingCard);
    app.use('/api/shoppingCard', shoppingCardAPI);

    app.use('/orderAdminList', orderAdminList);
    app.use('/api/orderAdminList', orderAdminListAPI);
    app.use('/orderAdminList/partOrder/:id',orderAdminList);


    app.use('/orderAdminDetails', orderAdminDetails);
    app.use('/createProductAdmin', createProductAdmin);
    app.use('/checkout', checkout);
    app.use('/users', users);
    app.use('/', mainPage);


    //other routes..
}