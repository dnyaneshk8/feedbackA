if (process.env.NODE_ENV === "production") {
	//system is in production
	module.exports = require("./prod.js");
} else {
	//system is in development
	module.exports = require("./dev.js");
}
