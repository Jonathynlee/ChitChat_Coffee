module.exports = function (app) {

    const orderAdminList = require('./routes/orderAdminList');
    const orderAdminDetails = require('./routes/orderAdminDetails');
    const shoppingCard = require('./routes/shoppingCard');
    const createProductAdmin = require('./routes/createProductAdmin');
    const checkout = require('./routes/checkout');

    const users = require('./routes/users');
    const mainPage = require('./routes/mainPage');
    const menu = require('./routes/menu');

    app.use('/shoppingCard', shoppingCard);
    app.use('/orderAdminList', orderAdminList);
    app.use('/orderAdminDetails', orderAdminDetails);
    app.use('/createProductAdmin', createProductAdmin);
    app.use('/checkout', checkout);
    app.use('/users', users);
    app.use('/', mainPage);
    app.use('/menu', menu);


    //other routes..
}