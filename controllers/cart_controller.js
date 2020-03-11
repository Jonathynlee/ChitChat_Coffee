//const express = require("express");

//const router = express.Router();
//import the model (burger.js) to use its database functions


var db = require("../models");

exports.index = function (req, res) {



      
     db.order.findOne({where: {status:"in_cart",
                              userID:req.user.id} ,
                              include:[
                                        {
                                          model:db.orderItem,
                                          include:[db.product]
                                        }
                               ] 
                                    
                               }  
         ).then(function(reslt){

         if(reslt){
         
            for(let i=0;i<reslt.orderItems.length;i++){

                if(reslt.orderItems[i].product.quantity){
                   if(reslt.orderItems[i].product.quantity<3){
                     reslt.orderItems[i].product.flag=true;
                   }
                }
            }
            const answer=reslt.orderItems;
          res.render("shoppingCart",{item:answer});
         }
         else{
            res.render("shoppingCart")
         } 
      });
      
  
}

   exports.apiIndex = function (req, res) {
      
   
      //find user id from email
      db.user.findOne({where:{email:req.session.email}}).then(function(result){
         let userID=result.id;
         
        db.order.findOne({where: {status:"in_cart",
                                 userID:userID} ,
                                 include:[
                                           {
                                             model:db.orderItem,
                                             include:[db.product],
                                           }
                                  ] 
                                       
                                  }  
         ).then(function(reslt){
             
            if(reslt){
               for(let i=0;i<reslt.orderItems.length;i++){
                 
                   if(reslt.orderItems[i].product.quantity){
                      if(reslt.orderItems[i].product.quantity<3){
                        reslt.orderItems[i].product.flag=true;
                      }
                   }
               }
             res.send(reslt.orderItems);
            }
            else{
               res.send(null);
            } 
         });
         
      });
   }

   exports.updateShoppingCard = function (req, res) {
      
       const id=req.body.id;
       const number=req.body.quantity;
       db.orderItem.update({quantity:number},
         {
           where: {
             id:id
           }
         })
         .then(function(dbPost) {
           res.json(dbPost);
         }); 
         
      }

      exports.deleteShoppingCard = function (req, res) {
         db.orderItem.destroy({where: {
            id:req.params.id
         }}).then(function(result){
            res.json(result);
         });
            
       }

       exports.updateSubtotal=function (req,res){
          //const id=req.params.id;

         console.log(req.body);
         const amount=req.body.subtotal;
         db.orderItem.update({subtotal:amount},{

            where:{
               orderId:req.body.orderId
            }
         }).then(function(dbPost) {
            console.log("Heyyy:"+dbPost);
            db.order.update({subtotal:amount},{
            where:{
               id:req.body.orderId
            }
         }).then(function(dbPost) {
            res.json(dbPost);
         });  

         }); 
      }
   

