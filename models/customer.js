const mongoose=require('mongoose');
var passportLocalMongoose=require("passport-local-mongoose");
var userSchema=require('./user');

const customerSchema= new mongoose.Schema(
    { 
      customerAddress:{type: String, default:"add to add"}
    }
    //,baseOption
);

module.exports=userSchema.discriminator("customer",customerSchema);