var db=require("../models");


exports.index=function(req,res){
   res.render("createProduct");
}

exports.getCategories = function(req, res){
   db.category.findAll({
      
   }).then(function(response){
      res.json(response)
   })
}

exports.addCategory =function(req, res){
   db.category.create({
      name:req.body.name,
      description:req.body.description
   }).then(function(response){
      res.json(response)
   })
}

exports.addProduct  =function(req, res){
  
   db.product.create({
      name:req.body.name,
      quantity:1,
      EstimatedTime: parseInt(req.body.EstimatedTime),
      basePrice:parseFloat(req.body.basePrice),
      addOns:req.body.addOns,
      image:req.body.image,
      description:req.body.description,
      seasonal:req.body.seasonal,
      sizes:req.body.sizes,
      temp:req.body.temp,
      categoryId:parseInt(req.body.categoryId)
   })


   res.json(req.body);
}

exports.deleteCategory  =function(req, res){
db.category.destroy({
   where:{id:req.body.id}
}).then(function(response){
   res.json(response)
})
}
