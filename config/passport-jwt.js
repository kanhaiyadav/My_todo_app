const passport = require("passport");

//importing the jwt strategy
const JWTStrategy = require("passport-jwt").Strategy;

//importing a module which will help us to extract the token from the header
const ExtractJWT = require("passport-jwt").ExtractJwt;

const User = require("../model/users_model.js");


let opts = {
    //extracting the token from the header
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    //the secret or key used to sign the token
    secretOrKey: "my_todo_app"
}

//payload contains all the info about the user
passport.use(new JWTStrategy(opts, async (payload, done) => {
    try {
        let user = await User.findById(payload._id);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (err) {
        console.log(err);
    }
}));

module.exports = passport;