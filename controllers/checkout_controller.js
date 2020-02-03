var db=require("../models");


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

