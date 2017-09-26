var loggedInUser = require("../middlewares/loggedInUser");
var hasCredits = require("../middlewares/hasCredits");
var Mailer = require("../services/Mailer");
var surveyTemplate = require("../services/Templates/surveyTemplate");
var mongoose = require("mongoose");
var Survey = mongoose.model("survey");

module.exports = app => {
	app.post("/api/addSurvey", loggedInUser, hasCredits, (req, res) => {
		const { title, subject, body, recipients } = req.body;
		var survey = new Survey({
			title,
			subject,
			body,
			recipients: recipients.split(",").map(email => email),
			_user: req.user.id,
			datesent: Date.now()
		});

		const mailer = new Mailer(survey, surveyTemplate(survey));
		mailer.send(response => {
			survey.save((err, survey) => {
				req.user.credits -= 20;
				req.user.save((err, user) => {
					res.send(user);
				});
			});
		});
	});

	app.get("/api/surveys", loggedInUser, (req, res) => {
		Survey.find({ _user: req.user.id })
			.select({ recipients: false })
			.then(surveys => {
				res.send(surveys);
			});
	});

	app.get("/api/searchsurveys/:key",loggedInUser, (req, res) => {
		Survey.find({ "title": { $regex: '.*^' + req.params.key + '.*', $options: "i" }})
			.select({ recipients: false })
			.then(surveys => {
				if(surveys.length)
				{
					res.send(surveys);
				}
				else
				{
					res.send(false);
				}
				
			});
	});
};
