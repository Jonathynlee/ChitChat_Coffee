var db=require("../models");

exports.OrderFill=function(req,res){
    
    res.render("orderFullfill");
}

exports.OrderList=function(req,res){
      
    db.order.findAll({where: {status:"placed"},order: ['orderDate'],
                                                                        
            include:[
                     {
                        model:db.orderItem,
                        include:[db.product],
                        group:"orderId"
                     },
                     db.user
            ] 
            
      
 } 
).then(function(reslt){
     console.log(reslt)

/
//res.render("orderList");
res.render('orderList', {
    layout: 'main-admin'
   // trip: dbTrip
  });
  
});
  
}
 
 exports.apiOrderList = function (req, res) {

    db.order.findAll({where: {status:"placed"},order: ['orderDate'],
                                                                        
    include:[
             {
                model:db.orderItem,
                include:[db.product],
                group:"orderId"
             },
             db.user
    ] 
    

} 
).then(function(reslt){
console.log(reslt);
  res.send(reslt);
  
});
}

exports.orderPartReady=function(req,res){
    console.log("part of the order is ready");
}
