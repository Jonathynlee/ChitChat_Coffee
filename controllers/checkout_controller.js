var db=require("../models");
const stripe = require('stripe')('sk_test_wawZ81JqJAxDbVKw5STxsHIn00Hp7j5s2U');

exports.index=function(req,res){
   res.render("checkout");


}

exports.getOrderItems=function(req, res){
  // console.log("user_id:"+req.user.id);
   db.order.findOne({
      where:{userId:parseInt(req.user.id),
      status:"in_cart"}
   }).then(function(order){
      db.orderItem.findAll({
         where:{orderId:parseInt(order.id)}
      }).then(function(items){
         res.json(items);

      })

   })
}


exports.getProduct=function(req, res){
   console.log(req.body)
   db.product.findOne({
      where:{id:req.body.productId}
   }).then(function(product){
      console.log(product)
         res.json(product);
      })

   }
  
   exports.setPayment=function(req, res){
      /*(async () => {
         const paymentIntent = await stripe.paymentIntents.create({
           amount:10,
           currency: 'usd',
           payment_method_types: ['card'],
           receipt_email: req.session.email,
         });
       })(function (db){
          console.log(db);
          res.send(db);
       });*/
       //console.log("hello");
     
   } 

