import React from "react";
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";
import { Link } from "react-router-dom";
import validateEmail from "../../utils/validateEmail";

class SurveyForm extends React.Component {
	renderFields() {
		return (
			<div>
				<Field
					label="Survey Title"
					name="title"
					type="text"
					component={SurveyField}
				/>

				<Field
					label="Survey subject"
					name="subject"
					type="text"
					component={SurveyField}
				/>
				<Field
					label="Survey body"
					name="body"
					type="text"
					component={SurveyField}
				/>
				<Field
					label="Recipients list"
					name="recipients"
					type="text"
					component={SurveyField}
				/>
			</div>
		);
	}
	render() {
		return (
			<div className="row" style={{ padding: "30px 0" }}>
				<form
					onSubmit={this.props.handleSubmit(
						this.props.onSubmitForm
					)}
					className="col s12"
				>
					{this.renderFields()}
					<Link to="/surveys">
						<button className="red btn left white-text">
							Cancel
						</button>
					</Link>
					<button className="btn right white-text" type="submit">
						Submit
						<i className="material-icons right">arrow_forward</i>
					</button>
				</form>
			</div>
		);
	}
}

function validate(values) {
	const error = {};

	error.recipients = validateEmail(values.recipients || "");

	if (!values.title) {
		error.title = "Please enter title";
	}

	if (!values.subject) {
		error.subject = "Please enter subject";
	}

	if (!values.body) {
		error.body = "Please enter body";
	}

	if (!values.recipients) {
		error.email = "Please enter email";
	}

	return error;
}

export default reduxForm({
	validate,
	form: "surveyForm",
	destroyOnUnmount: false
})(SurveyForm);
