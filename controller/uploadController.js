const mongoose = require("mongoose");

const FileUp =  require("../model/uploadModel");

var uploadFile = async(req,res)=>{
    req.files.forEach(element => {
            console.log(element)
            const myfile = new FileUp({
                _id: new mongoose.Types.ObjectId(),
                filename: element.filename,
                path: element.path,
                size: element.size
              });
              myfile.save()          
    });
    
}

module.exports.uploadFile = uploadFile