const aws = require(`aws-sdk`);
const multer = require('multer');
const multerS3 = require('multer-s3');
let imageData;

exports.testThis = function(){
    console.log("tested");
} 

exports.upload = function(file, response) {
    console.log("trying to Upload File")
    let s3bucket = new aws.S3({
      accessKeyId:'',
      secretAccessKey:'',
     Bucket: ''



    });
    console.log("credentials submitted")
    s3bucket.createBucket(function () {
        var params = {
          Bucket: '',
          Key: file.name,
          Body: file.data,
          ACL: 'public-read'
        };
        s3bucket.upload(params, function (err, data) {
          if (err) {
            console.log('error in callback');
            console.log(err);
          }
          console.log('success');
          imageData =  data;
          response.send(imageData.Location)
          console.log(imageData.Location);
        });
    });
    
  }



