var mongoose = require("mongoose");
const { Schema } = mongoose;

const Recipient = new Schema({
	email: String,
	responded: { type: Boolean, default: false }
});

mongoose.model("recipient", Recipient);
