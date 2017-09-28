module.exports = (req, res, next) => {
	if (req.user.credits < 20) {
		res.send(403, "You don't have enough credits");
	}

	next();
};
