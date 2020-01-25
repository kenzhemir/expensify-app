import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";

import "normalize.css";

import { addExpense } from "./actions/expenses";
import { setTextFilter } from "./actions/filters";
import AppRouter from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import getVisibleExpenses from "./selectors/expenses";

import "./styles/styles.scss";
import "react-dates/initialize";

const store = configureStore();

store.dispatch(
	addExpense({ amount: 5400, createdAt: 100, description: "Water bill" })
);
store.dispatch(addExpense({ amount: 19500, description: "Rent" }));
store.dispatch(addExpense({ amount: 1000, description: "Gas bill" }));

const state = store.getState();
console.log(getVisibleExpenses(state.expenses, state.filters));

const jsx = (
	<Provider store={store}>
		<AppRouter />
	</Provider>
);

ReactDOM.render(jsx, document.getElementById("app"));
