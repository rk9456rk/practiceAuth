const mongoose=require('mongoose');
var passportLocalMongoose=require("passport-local-mongoose");
var userSchema=require('./user');

const adminSchema= new mongoose.Schema(
    { 
      adminPower:{type: String, default:"super"}
    }//, baseOption
);

module.exports=userSchema.discriminator("admin",adminSchema);