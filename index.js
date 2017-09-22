const express = require("express");
const app = express();
var mongoose = require("mongoose");
var keys = require("./config/keys");
var bodyParser = require("body-parser");
require("./models/User");
const CookieSession = require("cookie-session");
require("./services/passport");
const passport = require("passport");

app.use(
	new CookieSession({
		maxAge: 10 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
);

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.monogURI);
require("./routes/authRoute")(app);
require("./routes/billingRoute")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
