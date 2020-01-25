module.exports = function (app) {

    const orderAdminList = require('./routes/orderAdminList');
    const orderAdminDetails = require('./routes/orderAdminDetails');
    const shoppingCard = require('./routes/shoppingCard');
    const createProductAdmin = require('./routes/createProductAdmin');
    const checkout = require('./routes/checkout');

    const users = require('./routes/users');
    const mainPage = require('./routes/mainPage');

  
    const merch = require('./routes/merch')


    const shoppingCardAPI = require('./routes/shoppingCardAPI');
    const orderAdminListAPI= require('./routes/orderAdminListAPI');
    const manageAccount= require('./routes/manageAccounts');
    const menu= require('./routes/menu');

    

    

    //app.use('/shoppingCard/:id', shoppingCard);
    app.use('/shoppingCard', shoppingCard);
    app.use('/api/shoppingCard', shoppingCardAPI);

    app.use('/api/shoppingCard/:id', shoppingCardAPI);



    app.use('/orderAdminList', orderAdminList);
    app.use('/api/orderAdminList', orderAdminListAPI);
    app.use('/orderAdminList/partOrder/:id',orderAdminList);
    app.use('/orderAdminList/updateStatusOrder/:id',orderAdminList);
    app.use('/orderAdminList/sendSMS',orderAdminList);
    


    app.use('/orderAdminDetails', orderAdminDetails);
    app.use('/createProductAdmin', createProductAdmin);
    app.use('/checkout', checkout);
    app.use('/checkout', checkout);


    app.use('/users', users);
    app.use('/manageAccount', manageAccount);
    app.use('/', mainPage);
    app.use('/menu', menu);
    app.use('/merch', merch);

    app.use('/menu', menu);


    //other routes..
}