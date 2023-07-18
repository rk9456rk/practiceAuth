var mongoose=require('mongoose');
var passportLocalMongoose=require("passport-local-mongoose")
const baseOptions={
  discriminatorKey: 'itemtype'
 // discriminatorKey:"kind"
  ,
  collection:'items',
 // timestamps:true,
};
var UserSchema= new mongoose.Schema({
  username: String,
 // usertype:String,
  password:String,
 // baseOptions,
});
UserSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model("UserTemp",UserSchema);

