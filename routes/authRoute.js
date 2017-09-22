const passport = require("passport");

module.exports = app => {
	app.get(
		"/auth/google",
		passport.authenticate("google", { scope: ["profile", "email"] })
	);

	app.get(
		"/auth/google/callback",
		passport.authenticate("google"),
		(req, res, next) => {
			res.redirect("/survey");
		}
	);

	app.get("/api/getCurrentUser", (req, res, next) => {
		res.send(req.user);
	});

	app.get("/api/logout", (req, res, next) => {
		req.logout();
		res.redirect("/");
	});
};
