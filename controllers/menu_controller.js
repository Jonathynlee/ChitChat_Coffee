

exports.menu=function(req,res){
    res.render("menu");
 }

var db=require("../models");




exports.getProduct = function(req, res){
    console.log(req.body)
   db.product.findOne({
      where:{id:req.body.productId}
   }).then(function(response){
      res.json(response)
   })
}

exports.addOrderItem  =function(req, res){
   
   db.orderItem.create({
      orderDate:req.body.orderDate,
      addOns:req.body.addOns,
      amount:req.body.amount
      
   })


   res.json(req.body);
}

exports.getAllProducts = function(req, res){
   console.log(req.body)
  db.product.findAll({
     
  }).then(function(response){
     res.json(response)
  })
}

////Aysen////
//Find all categories
exports.getAllCategories = function(req, res){
   console.log(req.body)
  db.category.findAll({}).then(function(response){
     console.log(response);
     res.json(response)
  })
}

/////////////

exports.addProductToOrder = function(req, res){
   console.log(req.body);
  db.order.findOne({
     where:{userId :req.user.id, status:"in_cart"} //req.body.userId
  }).then(function(response){
     if(response != undefined){
      db.orderItem.create({
         basePrice:req.body.basePrice,//baseProductPrice
         addons:req.body.addons,
         subtotal:req.body.subtotal,
         orderId:response.id,
         productId:req.body.productId,
         userId:req.body.userId

      
      })
     }else{
        //create order
        db.order.create({
         status:"in_cart",
         userId:req.user.id,//req.body.userId
         subtotal:req.body.subtotal,
         orderDate:"1970-01-01 00:00:01",
         pickUpDate:"1970-01-01 00:00:01",
         total:0
         
        }).then(function(resp){
        db.order.findOne({
         where:{userId :req.user.id, status:"in_cart"}//req.body.userId
      }).then(function(ord){

         db.orderItem.create({
            basePrice:req.body.basePrice,//baseProductPrice
            addons:req.body.addons,
            subtotal:req.body.subtotal,
            orderId:ord.id,
            productId:req.body.productId,
            userId:req.user.id//req.body.userId

         })
     
   
     })
   })

   }

})
  }

  

