import "materialize-css/dist/css/materialize.min.css";
import React from "react";
import reactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";

import reducers from "./reducers";
import reduxThunk from "redux-thunk";
import App from "./components/App";

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));
console.log("Stripe key is", process.env.REACT_APP_SECRET_CODE);
reactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.querySelector("#root")
);
