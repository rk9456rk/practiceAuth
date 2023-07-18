const mongoose=require('mongoose');
var passportLocalMongoose=require("passport-local-mongoose");

const userSchema= new mongoose.Schema(
    { username:String,
      usertype:String,
      password:String
      
    }
);
userSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model("UserTemp",userSchema);