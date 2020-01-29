import "react-dates/initialize";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";

import "normalize.css";
import "react-dates/lib/css/_datepicker.css";

import AppRouter from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import "./firebase/firebase";

import "./styles/styles.scss";
import { startSetExpenses } from "./actions/expenses";

const store = configureStore();

const jsx = (
	<Provider store={store}>
		<AppRouter />
	</Provider>
);

ReactDOM.render(<p>Loading...</p>, document.getElementById("app"));
store.dispatch(startSetExpenses()).then(() => {
	ReactDOM.render(jsx, document.getElementById("app"));
});
