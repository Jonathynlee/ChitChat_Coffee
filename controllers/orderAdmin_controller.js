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
    const id=req.params.id;
    
       db.orderItem.update(req.body,
         {
           where: {
             id:id
           }
         })
         .then(function(dbPost) {
           res.json(dbPost);
         }); 
    
}

exports.updateStatusOrder=function(req,res){
    const id=req.params.id;
    
    
        db.order.update(req.body,
            {
              where: {
                id:id
              }
            })
            .then(function(dbPost) {
              res.json(dbPost);
              
            }); 
    }

    
    

 
    
    
    

