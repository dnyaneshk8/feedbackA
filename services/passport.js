const passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
var keys = require("../config/keys");
var mongoose = require("mongoose");

var User = mongoose.model("users");

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
		done(null, user);
	});
});

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.GoogleClientId,
			clientSecret: keys.GoogleClientSecret,
			callbackURL: "/auth/google/callback",
			proxy: true
		},
		(authToken, refreshToken, profile, done) => {
			User.findOne({ googleId: profile.id }).then(existingUser => {
				if (existingUser === null) {
					//user already does not exist. Hence create new user

					new User({ googleId: profile.id }).save().then(user => {
						done(null, user);
					});
				} else {
					console.log("user exists");
					done(null, existingUser);
				}
			});
		}
	)
);
