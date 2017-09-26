import React from "react";
import { Link } from "react-router-dom";

class Dashboard extends React.Component {
	render() {
		return (
			<div>
				<h4>Dashboard</h4>
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

export default Dashboard;
