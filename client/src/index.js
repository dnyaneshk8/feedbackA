import "materialize-css/dist/css/materialize.min.css";
//import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import reactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";

import reducers from "./reducers";
import reduxThunk from "redux-thunk";
import App from "./components/App";
import axios from "axios";
window.axios = axios;

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));
reactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.querySelector("#root")
);
