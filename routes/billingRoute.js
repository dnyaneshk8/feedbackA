var keys = require("../config/keys");
var stripe = require("stripe")(keys.STRIPE_PUBLISHABLE_KEY);
var loggedInUser = require("../middlewares/loggedInUser");
module.exports = app => {
	app.post("/api/chargeUser", loggedInUser, (req, res) => {
		stripe.charges.create(
			{
				amount: 500,
				currency: "usd",
				source: req.body.id, // obtained with Stripe.js
				description: "Charge for feedback credit"
			},
			function(err, charge) {
				console.log("charge is", charge);

				req.user.credits += 500;
				req.user.save((err, user) => {
					if (err) {
						throw err;
					}
					res.send(user);
				});
			}
		);
	});
};
