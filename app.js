const express =require('express');
var  mongoose=require("mongoose");
var passport=require('passport');
var bodyParser=require('body-parser');
var localStrategy=require('passport-local');
var  passportLocalMongoose=require('passport-local-mongoose');
const User=require("./models/user");
var Customer=require("./models/customer");
var Admin=require("./models/admin");
var sensitiveData=require("./sensitiveData");

mongoose.connect(
 sensitiveData.mongoDbUrl

).then(()=>{
    console.log(' sucessfully connect to MongoDb');
   // seedDB();
}).catch((error)=>{
console.log('unable to connect to MongoDb');
console.error(error);
});

var app=express();
app.use(express.static("public")); 
app.use(require("express-session")({
secret:"Rusty is the best and cutest dog in the world",
resave:false,
saveUninitialized:false
}));


app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: true}))
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//=============
//Routes
//===================

app.get("/",(req,res)=>{
    res.render("home");
});
app.get("/register",(req,res)=>{
    res.render("register");

});
app.post("/register",(req,res)=>{
   var Schema1;
   if(req.body.userType==="customer")
       Schema1=Customer;
  else 
     Schema1=Admin;
   
     Schema1.register(new Schema1({username:req.body.username}),req.body.password)
   .then((user)=>{
        passport.authenticate("local")(req,res,()=>{

        res.redirect("/secret");
         });
        /* passport.authenticate("local").then(
          (req,res,()=>{
          res.redirect("/secret");
           }))
           .catch((error)=>{console.log("error "+error);});
           */
   })
   .catch((error)=>{console.log("error "+error)});
});
// middleware...
app.get("/login",(req,res)=>{
  res.render("logIn");
});
app.post("/login",
        passport.authenticate("local",
        { successRedirect:"/secret",
          failureRedirect:"/login"
        }),
        (req,res)=>{
         
        });
app.get("/secret",isLoggedIn,(req,res)=>{
  console.log( req.user);
  res.render("secret");
});
// log out
app.get("/logout",(req,res)=>{
 
req.logout((error)=>{
    if(error){ console.log("error"+error)}
    res.redirect("/");
});
//res.redirect("/");
});
app.get("/viewAllUser",(req,res)=>{
  User.find().then((users)=>{
    res.render("viewAllUser",
    {users:users});  
}).catch((error)=>{
      console.log("error");
});
});

app.get("/viewAllCustomer",(req,res)=>{
  Customer.find().then((users)=>{
    res.render("viewAllCustomer",
    {users:users});  
}).catch((error)=>{
      console.log("error");
});
});
// middleware
function isLoggedIn(req,res,next){
if(req.isAuthenticated()){
    return next();
}
 res.redirect("/login");
}
app.listen(process.env.PORT||3000,process.env.IP,()=>{
    console.log("server Started");
})
