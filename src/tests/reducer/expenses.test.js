import expensesReducer from "../../reducers/expenses";
import expenses from "../fixtures/expenses";

test("should set default state", () => {
	const state = expensesReducer(undefined, { type: "@@INIT" });
	expect(state).toEqual([]);
});

test("should remove expense with id", () => {
	const testAction = { type: "REMOVE_EXPENSE", id: expenses[0].id };
	const state = expensesReducer(expenses, testAction);
	expect(state).toEqual([expenses[1], expenses[2]]);
});

test("should not remove expense if id not found", () => {
	const testAction = { type: "REMOVE_EXPENSE", id: "-1" };
	const state = expensesReducer(expenses, testAction);
	expect(state).toEqual(expenses);
});

test("should add expense", () => {
	const expense = {
		id: "510",
		description: "laptop",
		amount: "200000",
		createdAt: 34000,
		note: "Hi!"
	};
	const testAction = { type: "ADD_EXPENSE", expense };
	const state = expensesReducer(expenses, testAction);
	expect(state).toEqual([...expenses, expense]);
});

test("should edit expense", () => {
	const updates = {
		amount: "200000"
	};
	const testAction = { type: "EDIT_EXPENSE", id: expenses[0].id, updates };
	const state = expensesReducer(expenses, testAction);
	expect(state[0].amount).toBe("200000");
});

test("should not edit expense if id not found", () => {
	const updates = {
		amount: "200000"
	};
	const testAction = { type: "EDIT_EXPENSE", id: "-1", updates };
	const state = expensesReducer(expenses, testAction);
	expect(state).toEqual(expenses);
});
