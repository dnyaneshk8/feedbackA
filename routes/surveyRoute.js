const _ = require("lodash");
const Path = require("path-parser");
const { URL } = require("url");
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
			recipients: recipients
				.split(",")
				.map(email => ({ email: email.trim() })),
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

	app.post("/api/surveys/webhooks", (req, res) => {
		console.log("Response is", req.body);
		const p = new Path("/api/surveys/:surveyId/:choice");
		const events = _.chain(req.body)
			.map(({ email, url }) => {
				const match = p.test(new URL(url).pathname);
				console.log("Match is", match);
				if (match) {
					return {
						email,
						surveyId: match.surveyId,
						choice: match.choice
					};
				}
			})
			.compact()
			.uniqBy("email", "surveyId")
			.each(({ surveyId, email, choice }) => {
				Survey.updateOne(
					{
						_id: surveyId,
						recipients: {
							$elemMatch: { email: email, responded: false }
						}
					},
					{
						$inc: { [choice]: 1 },
						$set: { "recipients.$.responded": true },
						lastResponded: new Date()
					}
				).exec();
			})
			.value();

		console.log("Events are ", events);
		res.send({});
	});

	app.get("/api/searchsurveys/:key", loggedInUser, (req, res) => {
		Survey.find({
			title: { $regex: ".*^" + req.params.key + ".*", $options: "i" }
		})
			.select({ recipients: false })
			.then(surveys => {
				if (surveys.length) {
					res.send(surveys);
				} else {
					res.send(false);
				}
			});
	});

	app.delete("/api/deletesurvey/:id", loggedInUser, (req, res) => {
		Survey.remove({
			_id: req.params.id
		}).then(() => {
			Survey.find({ _user: req.user.id })
				.select({ recipients: false })
				.then(surveys => {
					res.send(surveys);
				});
		});
	});
};
