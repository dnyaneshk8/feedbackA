import React from "react";
import { reduxForm, Field } from "redux-form";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";

class SurveyNew extends React.Component {
	state = { showFormReview: false };

	renderContent() {
		if (this.state.showFormReview) {
			return (
				<SurveyFormReview
					onBackPress={() => this.setState({ showFormReview: false })}
				/>
			);
		} else {
			return (
				<SurveyForm
					onSubmitForm={() =>
						this.setState({ showFormReview: true })}
				/>
			);
		}
	}

	render() {
		return (
			<div>
				{this.renderContent()}
				<div />
			</div>
		);
	}
}

export default reduxForm({
	form: "surveyForm"
})(SurveyNew);
