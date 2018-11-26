var express =   require("express");
var app =   express();

var bodyParser =    require("body-parser");
app.use(bodyParser.json());

const cors = require('cors')
app.use(cors())


var config = require('config')

var multer  =   require('multer');
var path = require('path')

//Mongo configration
const mongoose = require("mongoose");

mongoose.connect(config.mongo.mlib_url,{ useNewUrlParser: true });
mongoose.Promise = global.Promise;

var dbupload = require("./controller/uploadController")

// Initializing multer storage  
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

var upload = multer({ storage : storage }).array('userPhoto',15);


app.post('/upload',function(req,res){
    upload(req,res,function(err) {
        // console.log(req.body);
        // console.log(req.files);

        if(err) {
          //  console.log(err)
            return res.end("Error uploading file.");
        }
        dbupload.uploadFile(req,res)
        res.end("File is uploaded");
    });
});

app.listen(9099,function(){
    console.log("Working on port 9099");
});