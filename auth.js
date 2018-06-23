const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('./models/user');


module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        User.findById(id, function(err, user){
            done(err, user);
        })
    });
    passport.use(new GoogleStrategy({
            clientID: "1025965622161-3999akuia2ldi9hbq04ql76o4ueu35k6.apps.googleusercontent.com",
            clientSecret: "-XYIr4LwZbKiETriK6UQCrYE",
            callbackURL: "http://localhost:5000/auth/google/callback"
        },
        (token, refreshToken, profile, done) => {
            console.log(profile);

            User.findOne({googleId: profile.id}, function(err, user){
                if (err)
                return done(err);

                if (user){
                    return done(null, user);
                }
                else{
                    const newUser = new User();

                    newUser.googleId = profile.id;
                    newUser.googleToken = token;
                    newUser.googleName = profile.displayName;
                    newUser.googleEmail = profile.emails[0].value;

                    newUser.save(function(err){
                        if (err)
                        throw err;
                    return done(null, newUser);
                    });
                }
            });
        }));
};