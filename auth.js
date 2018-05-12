const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    passport.use(new GoogleStrategy({
            clientID: "1025965622161-3999akuia2ldi9hbq04ql76o4ueu35k6.apps.googleusercontent.com",
            clientSecret: "-XYIr4LwZbKiETriK6UQCrYE",
            callbackURL: "http://localhost:5000/auth/google/callback"
        },
        (token, refreshToken, profile, done) => {
            return done(null, {
                profile: profile,
                token: token
            });
        }));
};