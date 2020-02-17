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
  });
  
});
  
}
 
 exports.apiOrderList = function (req, res) {

    db.order.findAll({where: {status:"placed"},order: ['orderDate'],
                                                                        
    include:[
             {
                model:db.orderItem,
                include:[db.product],
                group:"orderId",
                
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
   console.log("HEREEEEEEEEEEEE");
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
    
       console.log(id);
        db.order.update(req.body,
            {
              where: {
                id:id
              }
            })
            .then(function(dbPost) {
              console.log(dbPost);
              res.json(dbPost);
              
            }); 
    }

    exports.sendSMS=function(req,res){
        console.log("Ready to send SMS");
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken =  process.env.TWILIO_AUTH_TOKEN;
        console.log(accountSid,",",authToken);
        const client = require('twilio')(accountSid, authToken);
        
      client.messages
      .create(req.body)
      .then(message =>res.send(message.sid))

      
      
    }   

    
    

 
    
    
    

