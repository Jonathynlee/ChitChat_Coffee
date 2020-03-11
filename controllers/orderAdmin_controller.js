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
        const accountSid =process.env.TWILIO_ACCOUNT_SID;
        const authToken =process.env.TWILIO_AUTH_TOKEN;
        const client = require('twilio')(accountSid, authToken);
        
      client.messages
      .create(req.body)
      .then(message =>res.send(message.sid))

      
      
    }   

    exports.placePastOrder=function(req,res){
      const orderNo=req.params.id;
      console.log("ready to put things in the past with order No "+req.params.id);
      db.order.findOne({where: {id:orderNo,
                                } ,
                        include:[
                            {
                              model:db.orderItem,
                              include:[db.product]
                            }
                        ] 
            
                        }  
                        ).then(function(reslt){
                            console.log(reslt);
                            console.log(reslt.orderDate);
                            let data={orderDate:reslt.orderDate,
                                      status:reslt.status,
                                      amount:reslt.total,
                                      userId:reslt.userId,
                                      products:[]};
                            for(let i=0;i<reslt.orderItems.length;i++){   
                                let product={id:reslt.orderItems[i].productId,
                                             name:reslt.orderItems[i].product.name,
                                             quantity:reslt.orderItems[i].quantity,
                                             addons:reslt.orderItems[i].addons};
                                data.products.push(product); 
                                
                            } 
                            data.products=JSON.stringify(data.products);
                            //data is ready
                            console.log(data);
                            //create past orders
                            db.past_order.create(data).then(async()=>{
                                for(let i=0;i<reslt.orderItems.length;i++){
                                  await db.orderItem.destroy({where:{id:reslt.orderItems[i].id}});
                                }    
                               await  db.order.destroy({where: {
                                                                id:orderNo
                                                      }});
                              res.send("done");  
                               
                            });
                            
                            
                            
                         
                                    
                            
                          });
     }
    
    

 
    
    
    

