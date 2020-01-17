//const express = require("express");

//const router = express.Router();
//import the model (burger.js) to use its database functions


var db = require("../models");

exports.index = function (req, res) {
   const arr = [{
      image: "/assets/images/englishbreakfastTea.jpg",
      id: 1,
      name: "English Breakfast Tea",
      inventory: 2,
      quantity: 2,
      price: 4.00, flag: true
   },

   {
      id: 2,
      image: "/assets/images/ButterCroissant.jpg",
      name: "Butter Croissant",
      quantity: 2,
      inventory: 10,
      price: 3.00,
      flag: false
   }];
   res.render("shoppingCart", { item: arr });
}
//It's going to be fetched from database



/*router.get("/",async function(req,res){
    
 
 //res.render("shoppingCart",{item:arr})
});

router.get("/orderFullfill",async function(req,res){
    
  
   res.render("orderFullfill");
  });

  router.get("/orderList",async function(req,res){
    
   
   res.render("orderList");
  });*/