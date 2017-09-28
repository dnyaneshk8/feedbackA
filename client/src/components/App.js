import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import SurveyNew from "./Survey/SurveyNew";
import Surveys from "./Survey/Surveys";

class App extends React.Component {
	componentDidMount() {
		this.props.fetchUser();
	}

	render() {
		return (
			<Router>
				<div>
					<Header />
					<div className="container">
						<Route exact path="/" component={Landing} />
						<Route exact path="/surveys" component={Surveys} />
						<Route path="/dashboard" component={Dashboard} />
						<Route path="/survey/new" component={SurveyNew} />
					</div>
				</div>
			</Router>
		);
	}
}

export default connect(null, actions)(App);
