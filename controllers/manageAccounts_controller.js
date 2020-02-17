var db=require("../models");

const session        = require('express-session'); 

exports.manageAccounts=function(req,res){

    


    db.user.findAll({
      
        raw: true,
        where: {
          username: 'Aysen Unlu'
        }
      }).then(function(dbUser) {
        
        res.render(
          "manageAccounts",
          {trip: dbUser[0]}
        );
      });
    /*
    res.render("manageAccounts", { item: arr });
    */
}

