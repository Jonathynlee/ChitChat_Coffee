

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
