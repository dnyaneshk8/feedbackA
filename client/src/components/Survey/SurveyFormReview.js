import React from "react";
import SurveyForm from "./SurveyForm";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import * as actions from "../../actions";
const SurveyFormReview = ({ formValues, onBackPress, submitSurvey, history }) => {
	return (
		<div className="center-align">
			<h4>Please confirm your fields</h4>
			<div className="card-panel gray hoverable">
				<h5> Title </h5>
				<span>{formValues.title}</span>
				<h5> Subject </h5>
				<span>{formValues.subject}</span>
				<h5> Body </h5>
				<span>{formValues.body}</span>
			</div>
			<button className="btn red left" onClick={onBackPress}>
				Back to edit
			</button>
			<button
				className="btn green right"
				onClick={() => submitSurvey(formValues, history)}
			>
				Send
				<i className="material-icons right">send</i>
			</button>
		</div>
	);
};

const mapStateToPros = state => {
	console.log("State values are", state);
	return { formValues: state.form.surveyForm.values };
};
export default connect(mapStateToPros, actions)(withRouter(SurveyFormReview));
