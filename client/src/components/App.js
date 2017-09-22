import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header";
import Landing from "./Landing";
const Survey = () => <h4>Survey</h4>;
const Dashboard = () => <h4>Dashboard</h4>;

class App extends React.Component {
	componentDidMount() {
		this.props.fetchUser();
	}

	render() {
		return (
			<Router>
				<div className="container">
					<Header />
					<Route exact path="/" component={Landing} />
					<Route exact path="/survey" component={Survey} />
					<Route exact path="/dashboard" component={Dashboard} />
				</div>
			</Router>
		);
	}
}

export default connect(null, actions)(App);
