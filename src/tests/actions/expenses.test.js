import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
	startAddExpense,
	addExpense,
	editExpense,
	removeExpense,
	setExpenses,
	startSetExpenses
} from "../../actions/expenses";
import expenses from "../fixtures/expenses";
import database from "../../firebase/firebase";

const createMockStore = configureMockStore([thunk]);

beforeEach(done => {
	const expensesData = {};
	expenses.forEach(expense => {
		expensesData[expense.id] = { ...expense, id: null };
	});
	database
		.ref("expenses")
		.set(expensesData)
		.then(() => done());
});

test("should set up remove expense action object", () => {
	const action = removeExpense({ id: "123abc" });
	expect(action).toEqual({ type: "REMOVE_EXPENSE", id: "123abc" });
});

test("should set up edit expense action object", () => {
	const action = editExpense("123abc", { note: "note value" });
	expect(action).toEqual({
		type: "EDIT_EXPENSE",
		id: "123abc",
		updates: { note: "note value" }
	});
});

test("should set up add expense object with provided values", () => {
	const action = addExpense(expenses[0]);
	expect(action).toEqual({
		type: "ADD_EXPENSE",
		expense: expenses[0]
	});
});

test("should add expense to database and store", done => {
	const store = createMockStore({});
	const expenseData = {
		description: "mouse",
		amount: 3000,
		note: "this is good",
		createdAt: 1000
	};
	store
		.dispatch(startAddExpense(expenseData))
		.then(() => {
			const actions = store.getActions();
			expect(actions[0]).toEqual({
				type: "ADD_EXPENSE",
				expense: { id: expect.any(String), ...expenseData }
			});
			return database.ref(`expenses/${actions[0].expense.id}`).once("value");
		})
		.then(snapshot => {
			expect(snapshot.val()).toEqual(expenseData);
			done();
		});
});
test("should add expense with defaults to database and store", done => {
	const store = createMockStore({});
	const expenseDefaults = {
		description: "",
		note: "",
		amount: 0,
		createdAt: 0
	};
	store
		.dispatch(startAddExpense())
		.then(() => {
			const actions = store.getActions();
			expect(actions[0]).toEqual({
				type: "ADD_EXPENSE",
				expense: { id: expect.any(String), ...expenseDefaults }
			});
			return database.ref(`expenses/${actions[0].expense.id}`).once("value");
		})
		.then(snapshot => {
			expect(snapshot.val()).toEqual(expenseDefaults);
			done();
		});
});

test("should set up set expenses action object with data", () => {
	const action = setExpenses(expenses);
	expect(action).toEqual({ type: "SET_EXPENSES", expenses });
});

test("should fetch expenses from database to store", done => {
	const store = createMockStore({});
	store.dispatch(startSetExpenses()).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: "SET_EXPENSES",
			expenses
		});
		done();
	});
});
