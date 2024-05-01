const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const User = require("../model/users_model.js");


//telling passport to use passport-local strategy for authentication
passport.use(new LocalStrategy({
    //which field in the user's document should be used as the username
    usernameField: 'email'
},
//find the user who is making the request and establish the indentity
async function(email, password, done)
{
    try{
        let user = await User.findOne({email: email});
        if(!user || password != user.password)
        {   
            console.log("invalid username or password");
            return done(null, false);
        }
        else
        {
            console.log('user found', user);
            return done(null, user);
        }
    }catch(err){
        console.log("error finding the user --> passport");
        return done(err);
    }
    
}
));

passport.serializeUser((user, done)=>{
    done(null, user.id);
});

passport.deserializeUser(async (id, done)=>{
    try{
        let user = await User.findById(id);
        done(null, user);
    }catch(err){
        console.log("error in finding the user");
        done(err);
    }
    
});

//we are adding checkAuthenticated method in passport object(as we know we can add method and attributes in object on the 
//in javascript) which will used as middleware.
passport.checkAuthenticated = function(req, res, next)
{
    //passport by default adds isAuthenticaed() inside the request object
    if(req.isAuthenticated())
        return next();
    else
        res.redirect("/user/signin");
}

//This is another middleware which will send the user's data to the locals of views
passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated())
        res.locals.user = req.user;  //passport by defualt add a user property to the request object which contains the details of user if has signed in.
    return next();
}
module.exports = passport;