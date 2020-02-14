var db=require("../models");
const stripe = require('stripe')('SECRET KEY');

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
         
        ///////////////////////get user's current shopping card///////////////
        ////TAX IS GOING TO BE CALCULATED HERE//////////////////////////////
        //////In Order table total is updated and after payment goes through, status becomes placed/////
        let tax=0;
        let total2=0;
        db.order.findOne({
         where:{userId:parseInt(req.user.id),
         status:"in_cart"}
        }).then(function(ordr){
           tax=ordr.subtotal*0.25;
           total2=ordr.subtotal+tax;
           total={total:total2,
                  status:"placed"};
           db.order.update(total,{where:{id:ordr.id}})
           .then(ordr2=>{
                
                  const amount=total2.toFixed(2);
                  console.log(amount);
                  stripe.customers.create({
                     email:req.body.stripeEmail,
                     source:req.body.stripeToken
                  },((err,customer)=>{
                        
                       stripe.charges.create({customer:customer.id,
                                               description:"chitchat purchase",
                                                amount:parseInt(amount)*100,
                                                currency:'usd'})
                       .then(charge=>{
                          res.send("Successfull Transaction!!");
                       }) ;  
                                      
                       
                     })
                  )  

           });


        } ); 
        //////////////////////////////////////////////////////////////////////

         
         

         

         
       
     
            
    
   }
    
     
   

