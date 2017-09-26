import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import * as actions from "../actions";

class Payment extends React.Component {
	render() {
		console.log(process.env.REACT_APP_SECRET_CODE);

		return (
			// ...
			<StripeCheckout
				name="Feedback"
				description="Pay $5 for 500 credits"
				amount={500}
				token={token => this.props.billingUser(token)}
				stripeKey={process.env.REACT_APP_SECRET_CODE}
			>
				<button className="btn btn-primary">Add credit</button>
			</StripeCheckout>
		);
	}
}
export default connect(null, actions)(Payment);
