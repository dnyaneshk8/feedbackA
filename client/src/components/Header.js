import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Payment from "./Payment";
class Header extends React.Component {
	renderContent() {
		switch (this.props.auth) {
			case null:
				console.log("it null");
				return <li>"Waiting for result"</li>;
				break;
			case false:
				console.log("it false");
				return (
					<li>
						<a href="auth/google">Login with google</a>
					</li>
				);
				break;
			default:
				return [
					<li key="0">
						<Payment />
					</li>,
					<li key="1" style={{ padding: "0 15px" }}>
						Credit : {this.props.auth.credits}
					</li>,
					<li key="2">
						<Link to="/surveys"> My surveys </Link>
					</li>,
					<li key="3">
						<a href="/api/logout">Logout</a>
					</li>
				];
				break;
		}
	}
	render() {
		return (
			<nav>
				<div className="nav-wrapper">
					<div className="container">
						<Link
							to={this.props.auth ? "/dashborad" : "/"}
							className="brand-logo"
						>
							Feedback
						</Link>

						<ul
							id="nav-mobile"
							className="right hide-on-med-and-down"
						>
							{this.renderContent()}
						</ul>
					</div>
				</div>
			</nav>
		);
	}
}

const mapStateToPros = ({ auth }) => {
	return { auth };
};
export default connect(mapStateToPros)(Header);
