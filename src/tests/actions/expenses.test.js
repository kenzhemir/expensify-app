import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
	startAddExpense,
	addExpense,
	editExpense,
	removeExpense,
	setExpenses,
	startSetExpenses,
	startRemoveExpense,
	startEditExpense
} from "../../actions/expenses";
import expenses from "../fixtures/expenses";
import database from "../../firebase/firebase";

const createMockStore = configureMockStore([thunk]);
const uid = "thisistestuid";
const defaultAuthState = { auth: { uid } };

beforeEach(done => {
	const expensesData = {};
	expenses.forEach(expense => {
		expensesData[expense.id] = { ...expense, id: null };
	});
	database
		.ref(`users/${uid}/expenses`)
		.set(expensesData)
		.then(() => done());
});

/** ADD ACTIONS */

test("should set up add expense object with provided values", () => {
	const action = addExpense(expenses[0]);
	expect(action).toEqual({
		type: "ADD_EXPENSE",
		expense: expenses[0]
	});
});

test("should add expense to database and store", done => {
	const store = createMockStore(defaultAuthState);
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
			return database
				.ref(`users/${uid}/expenses/${actions[0].expense.id}`)
				.once("value");
		})
		.then(snapshot => {
			expect(snapshot.val()).toEqual(expenseData);
			done();
		});
});

test("should add expense with defaults to database and store", done => {
	const store = createMockStore(defaultAuthState);
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
			return database
				.ref(`users/${uid}/expenses/${actions[0].expense.id}`)
				.once("value");
		})
		.then(snapshot => {
			expect(snapshot.val()).toEqual(expenseDefaults);
			done();
		});
});

/** EDIT ACTIONS */

test("should set up edit expense action object", () => {
	const action = editExpense("123abc", { note: "note value" });
	expect(action).toEqual({
		type: "EDIT_EXPENSE",
		id: "123abc",
		updates: { note: "note value" }
	});
});

test("should set up set expenses action object with data", () => {
	const action = setExpenses(expenses);
	expect(action).toEqual({ type: "SET_EXPENSES", expenses });
});

test("should fetch expenses from database to store", done => {
	const store = createMockStore(defaultAuthState);
	store.dispatch(startSetExpenses()).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: "SET_EXPENSES",
			expenses
		});
		done();
	});
});

test("should edit expense in database and store", done => {
	const updates = { description: "new test description" };
	const store = createMockStore(defaultAuthState);
	store
		.dispatch(startEditExpense(expenses[0].id, updates))
		.then(() => {
			const actions = store.getActions();
			expect(actions[0]).toEqual({
				type: "EDIT_EXPENSE",
				id: expenses[0].id,
				updates
			});
			return database
				.ref(`users/${uid}/expenses/${expenses[0].id}`)
				.once("value");
		})
		.then(snapshot => {
			expect(snapshot.val()).toEqual({
				...expenses[0],
				...updates,
				id: undefined
			});
			done();
		});
});

/** REMOVE ACTIONS */

test("should set up remove expense action object", () => {
	const action = removeExpense({ id: "123abc" });
	expect(action).toEqual({ type: "REMOVE_EXPENSE", id: "123abc" });
});

test("should remove expense from the database and store", done => {
	const store = createMockStore(defaultAuthState);
	store
		.dispatch(startRemoveExpense({ id: expenses[0].id }))
		.then(() => {
			const actions = store.getActions();
			expect(actions[0]).toEqual({
				type: "REMOVE_EXPENSE",
				id: expenses[0].id
			});
			return database
				.ref(`users/${uid}/expenses/${expenses[0].id}`)
				.once("value");
		})
		.then(snapshot => {
			expect(snapshot.val()).toBeFalsy();
			done();
		});
});
