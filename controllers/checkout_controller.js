var db=require("../models");
const stripe = require('stripe')(process.env.SK_TEST);
//process.env.SK_TEST

exports.index=function(req,res){
   res.render("checkout");


}

exports.getOrderItems=function(req, res){
  
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
   
   db.product.findOne({
      where:{id:req.body.productId}
   }).then(function(product){
      
         res.json(product);
      })

   }

   
   exports.setPayment=function(req, res){
         
        ///////////////////////get user's current shopping card///////////////
        ////TAX IS GOING TO BE CALCULATED HERE//////////////////////////////
        //////In Order table total is updated and after payment goes through, status becomes placed/////
        let tax=0;
        let total2=0;
        db.order.findOne({
         where:{userId:parseInt(req.user.id),
         status:"in_cart"}
        }).then(function(ordr){
           tax=ordr.subtotal*0;
           total2=ordr.subtotal+tax;
           total={total:total2,
                  status:"placed",
                  orderDate:Date.now()};
           db.order.update(total,{where:{id:ordr.id}})
           .then(async function(ordr2){
                
                  const amount=total2.toFixed(2);
                  console.log(amount);
                  console.log(req.body);
                  try {
                     let intent;
                     if (req.body.payment_method_id) {
                       // Create the PaymentIntent
                       intent = await stripe.paymentIntents.create({
                         payment_method: req.body.payment_method_id,
                         amount: amount*100,
                         currency: 'usd',
                         confirmation_method: 'manual',
                         confirm: true
                       });
                     } else if (req.body.payment_intent_id) {
                       intent = await stripe.paymentIntents.confirm(
                         req.body.payment_intent_id
                       );
                     }
                     // Send the response to the client
                     res.send(generateResponse(intent));
                   } catch (e) {
                     // Display error on client
                     return res.send({ error: e.message });
                   }
            });
                 
                    

         }) ; 

        //   });

        //////////////////////////////////////////////////////////////////////
        const generateResponse = (intent) => {
         // Note that if your API version is before 2019-02-11, 'requires_action'
         // appears as 'requires_source_action'.
         if (
           intent.status === 'requires_action' &&
           intent.next_action.type === 'use_stripe_sdk'
         ) {
           // Tell the client to handle the action
           return {
             requires_action: true,
             payment_intent_client_secret: intent.client_secret
           };
         } else if (intent.status === 'succeeded') {
           // The payment didn’t need any additional actions and completed!
           // Handle post-payment fulfillment
          
           return {
             success: true
           };
         } else {
           // Invalid status
           return {
             error: 'Invalid PaymentIntent status'
           }
         }
       };

}
    
     
   

