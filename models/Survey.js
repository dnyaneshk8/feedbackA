var mongoose = require("mongoose");
const { Schema } = mongoose;
var Recipient = require("./Recipient");

const Survey = new Schema({
	title: String,
	subject: String,
	body: String,
	recipients: [Recipient],
	_user: { type: Schema.Types.ObjectId, ref: "user" },
	datesent: Date,
	yes: { type: Number, default: 0 },
	no: { type: Number, default: 0 },
	lastResponded: Date
});

mongoose.model("survey", Survey);
