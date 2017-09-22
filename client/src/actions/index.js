import axios from "axios";
import { FETCH_USER } from "./types";

export const fetchUser = () => {
	return function(dispatch) {
		axios("/api/getCurrentUser").then(res =>
			dispatch({ type: FETCH_USER, payload: res.data })
		);
	};
};

export const billingUser = token => {
	return function(dispatch) {
		axios
			.post("/api/chargeUser", token)
			.then(res => dispatch({ type: FETCH_USER, payload: res.data }));
	};
};
