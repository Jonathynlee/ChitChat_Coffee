var db=require("../models");

exports.manageAccounts=function(req,res){

    console.log("HIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHI");


    db.User.findAll({
        raw: true,
        where: {
          username: 'Aysen Unlu'
        }
      }).then(function(dbUser) {
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

