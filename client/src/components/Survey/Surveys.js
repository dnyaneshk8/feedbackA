import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import SurveyList from "./SurveyList";
import { Link } from "react-router-dom";
class Surveys extends React.Component {
	componentDidMount() {
		this.props.getSurveys();
	}

	render() {
		return (
			<div>
				<h3 className="center">Survey List</h3>
				<SurveyList />
				<div className="fixed-action-btn">
					<Link
						to="/survey/new"
						className="btn-floating btn-large red"
					>
						<i className="material-icons">add</i>
					</Link>
				</div>
			</div>
		);
	}
}

export default connect(null, actions)(Surveys);
