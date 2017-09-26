import axios from "axios";
import { FETCH_USER, FETCH_SURVEYS } from "./types";

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

export const submitSurvey = (values, history) => {
	return function(dispatch) {
		axios.post("/api/addSurvey", values).then(res => {
			history.push("/");
			dispatch({ type: FETCH_USER, payload: res.data });
		});
	};
};

export const getSurveys = () => {
	return function(dispatch) {
		axios.get("/api/surveys").then(res => {
			dispatch({ type: FETCH_SURVEYS, payload: res.data });
		});
	};
};

export const searchSurveys = searchKey => {
	return function(dispatch) {
		axios.get("/api/searchsurveys/" + searchKey).then(res => {
			dispatch({ type: FETCH_SURVEYS, payload: res.data });
		});
	};
};
