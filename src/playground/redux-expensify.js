import { createStore, combineReducers } from "redux";
import uuid from "uuid";

// ADD_EXPENSE
const addExpense = ({
	description = "",
	note = "",
	amount = 0,
	createdAt = 0
} = {}) => ({
	type: "ADD_EXPENSE",
	expense: {
		id: uuid(),
		description,
		note,
		amount,
		createdAt
	}
});

// REMOVE_EXPENSE
const removeExpense = ({ id } = {}) => ({
	type: "REMOVE_EXPENSE",
	id
});

// EDIT_EXPENSE
const editExpense = (id, updates = {}) => ({
	type: "EDIT_EXPENSE",
	id,
	updates
});

const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
	switch (action.type) {
		case "ADD_EXPENSE":
			return [...state, action.expense];
		case "REMOVE_EXPENSE":
			return state.filter(({ id }) => id != action.id);
		case "EDIT_EXPENSE":
			return state.map(expense =>
				expense.id == action.id ? { ...expense, ...action.updates } : expense
			);
		default:
			return state;
	}
};

// SET_TEXT_FILTER
const setTextFilter = (text = "") => ({ type: "SET_TEXT_FILTER", text });
// SORT_BY_AMOUNT
const sortByAmount = () => ({ type: "SORT_BY_AMOUNT" });
// SORT_BY_DATE
const sortByDate = () => ({ type: "SORT_BY_DATE" });
// SET_START_DATE
const setStartDate = startDate => ({ type: "SET_START_DATE", startDate });
// SET_END_DATE
const setEndDate = endDate => ({ type: "SET_END_DATE", endDate });

const filterReducerDefaultState = {
	text: "",
	sortBy: "date", // date|amount
	startDate: undefined,
	endDate: undefined
};
const filtersReducer = (state = filterReducerDefaultState, action) => {
	switch (action.type) {
		case "SET_TEXT_FILTER":
			return { ...state, text: action.text };
		case "SORT_BY_DATE":
			return { ...state, sortBy: "date" };
		case "SORT_BY_AMOUNT":
			return { ...state, sortBy: "amount" };
		case "SET_START_DATE":
			return { ...state, startDate: action.startDate };
		case "SET_END_DATE":
			return { ...state, endDate: action.endDate };
		default:
			return state;
	}
};

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
	return expenses
		.filter(expense => {
			const startDateMatch =
				typeof startDate !== "number" || expense.createdAt >= startDate;
			const endDateMatch =
				typeof endDate !== "number" || expense.createdAt <= endDate;
			const textMatch = expense.description
				.toLowerCase()
				.includes(text.toLowerCase());
			return startDateMatch && endDateMatch && textMatch;
		})
		.sort((a, b) => {
			if (sortBy === "date") {
				return a.createdAt < b.createdAt ? 1 : -1;
			} else if (sortBy === "amount") {
				return a.amount < b.amount ? 1 : -1;
			}
		});
};

const store = createStore(
	combineReducers({ expenses: expensesReducer, filters: filtersReducer })
);

store.subscribe(() => {
	const { expenses, filters } = store.getState();
	const visibleExpenses = getVisibleExpenses(expenses, filters);
	console.log(visibleExpenses);
});

const expOne = store.dispatch(addExpense({ description: "Rent", amount: 100 }));
const expTwo = store.dispatch(addExpense({ description: "Coffee", amount: 2 }));
// store.dispatch(removeExpense({ id: expOne.expense.id }));
// store.dispatch(editExpense(expTwo.expense.id, { amount: 4 }));

store.dispatch(setTextFilter("cof"));
// store.dispatch(setTextFilter());
// store.dispatch(sortByDate());
// store.dispatch(sortByAmount());
// store.dispatch(setStartDate(-1));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(400));
// store.dispatch(setEndDate(-2));

const demoState = {
	expenses: [
		{
			id: "43ntn0nq3t",
			description: "January rent",
			note: "This is final payment",
			payment: 54550,
			createdAt: 0
		}
	],
	filters: {
		text: "rent",
		sortBy: "amount", // date|amount
		startDate: undefined,
		endDate: undefined
	}
};

// const user = {
// 	name: "Jen",
// 	age: 23
// };

// console.log({
// 	...user,
// 	location: "Tartu",
// 	age: 33
// });
