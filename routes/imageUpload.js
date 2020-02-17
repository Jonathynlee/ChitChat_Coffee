const express = require('express');
const router  = express.Router();
const upload = require('../services/file-upload');

//const singleUpload = upload.single('image');


router.post("/", function(req, res){
console.log("request Recieved")
   /* singleUpload(req, res, function(err){
     
      

    })*/
    upload.upload(req.files.image, res);
    //res.send(req.files.image)
    

})

module.exports=router;