var helper = require("sendgrid").mail;
const sendGrid = require("sendgrid");
const keys = require("../config/keys");

class Mailer extends helper.Mail {
	constructor({ subject, recipients }, surveyTemplate) {
		super();

		this.sgApi = sendGrid(keys.sendGridKey);
		this.from_email = new helper.Email("dnyaneshk08@gmail.com");
		this.from = new helper.Email("dnyaneshk08@gmail.com", 'Dnyanesh');
		this.recipients = this.formateAddresses(recipients);
		this.subject = subject;
		this.content = new helper.Content("text/html", surveyTemplate);
		this.addContent(this.content);
		//this.addClickTracking();
		this.addRecipients(recipients);
		console.log('Properties are ',this.toJSON());
	}

	formateAddresses(recipients) {
		//console.log("Recipients  are ",recipients);
		return recipients.map((email) => {
			return new helper.Email(email);
		});
	}

	addClickTracking() {
		const trackingSettings = new helper.TrackingSettings();
		const clickTracking = new helper.ClickTracking(true, true);

		trackingSettings.setClickTracking(clickTracking);
		setImmediate(this.addClickTracking(trackingSettings));
	}

	addRecipients() {
		const personalize = new helper.Personalization();
		
		this.recipients.forEach(recipient => {
			personalize.addTo(recipient);	
		});
		this.addPersonalization(personalize);
	}

	send(callback) {
		var request = this.sgApi.emptyRequest({
			method: "POST",
			path: "/v3/mail/send",
			body: this.toJSON()
		});

		this.sgApi.API(request, function(error, response) {
			if (error) {
				console.log("Error response received");
			}
			console.log("Response code is ",response.statusCode);
			console.log(response.body);
			console.log(response.headers);
			 callback(response);
		});
	}
}

module.exports = Mailer;
