import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import moment from "moment";

class SurveyList extends React.Component {

	onHandleChange(event)
	{
		if(event.target.value)
		{
			this.props.searchSurveys(event.target.value)
		}
		else
		{
			this.props.getSurveys();
		}
	}

	onHandleDelete(surveyId)
	{	
		console.log("Survey id is", surveyId);
		this.props.deleteSurvey(surveyId);
	}

	renderSurveys() {
		switch (this.props.surveys) {
			case null:
				return (
					<div>
						<div className="progress">
							<div className="indeterminate" />
						</div>
						<h4>Please wait while loading</h4>
					</div>
				);
				break;
			case false:
				return (
					<div id="card-alert" className="card deep-purple lighten-5">
						<div className="card-content deep-purple-text">
							<p>No data : No survey to display</p>
						</div>
						<button
							type="button"
							className="close deep-purple-text"
							data-dismiss="alert"
							aria-label="Close"
						>
							<span aria-hidden="true">X</span>
						</button>
					</div>
				);
				break;
			default:
				return this.props.surveys.map(survey => {
					return (
						<div className="row" key={survey._id}>
							<div className="col s12 m12">
								<div className="card blue-grey darken-1">
									<div className="card-content white-text">
										<span className="card-title">
											{survey.title}
										</span>
										<span>{survey.subject}</span>
										<hr />
										<p>{survey.body}</p>
									</div>
									<div className="card-action">
										<a href="#">Yes : {survey.yes}</a>
										<a href="#">No : {survey.no}</a>
										<button className="btn center red" onClick={(event) => this.onHandleDelete(survey._id)}>Delete survey</button>
										<a className="right">Last responded : { moment(survey.lastResponded).fromNow() }</a>
									</div>

								</div>
							</div>
						</div>
					);
				});
				break;
		}
	}

	render() {
		return (
			<div>
				<input id="search" placeholder="Search survey by title" onChange={(event) => this.onHandleChange(event)} />

				{this.renderSurveys()}


			</div>
		);
	}
}

function mapStateToPros({ surveys }) {
	return { surveys };
}

export default connect(mapStateToPros, actions)(SurveyList);
