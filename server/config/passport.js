const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const controller = require('../controllers/authController.api.js');


passport.use('local', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'  //add session: false here?
},
    controller.authenticate)
);

passport.use('jwt', new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET || 'another secret'
},
    function (jwtPayload, cb) {
        return cb(null, jwtPayload);
    }
));

module.exports = passport;
