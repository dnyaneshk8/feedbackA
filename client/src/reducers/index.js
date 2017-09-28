import { combineReducers } from "redux";
import authReducer from "./authReducer";
import surveysReducer from "./surveysReducer";
import { reducer as reduxReducer } from "redux-form";

export default combineReducers({
	auth: authReducer,
	form: reduxReducer,
	surveys: surveysReducer
});
