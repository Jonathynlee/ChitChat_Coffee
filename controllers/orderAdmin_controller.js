var db=require("../models");

exports.OrderFill=function(req,res){
    
    res.render("orderFullfill");
}

exports.OrderList=function(req,res){
   res.render("orderList");
}

//It's going to be fetched from database



 /*router.get("/orderFullfill",async function(req,res){
     
  console.log("here");
  res.render("orderFullfill");
 });*/

 



//module.exports=router;