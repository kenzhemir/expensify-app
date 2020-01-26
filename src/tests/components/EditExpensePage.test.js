import React from "react";
import { shallow } from "enzyme";
import { EditExpensePage } from "../../components/EditExpensePage";
import expenses from "../fixtures/expenses";

let editExpense, removeExpense, history, wrapper;

beforeEach(() => {
	editExpense = jest.fn();
	removeExpense = jest.fn();
	history = { push: jest.fn() };
	wrapper = shallow(
		<EditExpensePage
			editExpense={editExpense}
			removeExpense={removeExpense}
			history={history}
			expense={expenses[0]}
		/>
	);
});

test("should render edit expense page correctly", () => {
	expect(wrapper).toMatchSnapshot();
});

test("should handle editExpense", () => {
	const updates = { ...expenses[1], id: undefined };
	wrapper.find("ExpenseForm").prop("onSubmit")(updates);
	expect(editExpense).toHaveBeenLastCalledWith(expenses[0].id, updates);
	expect(history.push).toHaveBeenLastCalledWith("/");
});

test("should handle removeExpense", () => {
	wrapper.find("button").simulate("click");
	expect(removeExpense).toHaveBeenLastCalledWith({ id: expenses[0].id });
	expect(history.push).toHaveBeenLastCalledWith("/");
});
