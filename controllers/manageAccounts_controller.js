var db=require("../models");

const session        = require('express-session'); 

exports.manageAccounts=function(req,res){

    //console.log(JSON.parse(req.session.user.datavalues));


    db.user.findAll({
      
        raw: true,
        where: {
          username: 'Aysen Unlu'
        }
      }).then(function(dbUser) {
        //console.log(req.session);
        console.log("testtest");
        //console.log(dbTrip[0].username);
        //console.log(dbTrip.username);
        res.render(
          "manageAccounts",
          {trip: dbUser[0]}
        );
      });
    /*
    res.render("manageAccounts", { item: arr });
    */
}

