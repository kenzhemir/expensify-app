import React from "react";
import { shallow } from "enzyme";
import { EditExpensePage } from "../../components/EditExpensePage";
import expenses from "../fixtures/expenses";

let startEditExpense, startRemoveExpense, history, wrapper;

beforeEach(() => {
	startEditExpense = jest.fn();
	startRemoveExpense = jest.fn();
	history = { push: jest.fn() };
	wrapper = shallow(
		<EditExpensePage
			startEditExpense={startEditExpense}
			startRemoveExpense={startRemoveExpense}
			history={history}
			expense={expenses[0]}
		/>
	);
});

test("should render edit expense page correctly", () => {
	expect(wrapper).toMatchSnapshot();
});

test("should handle startEditExpense", () => {
	const updates = { ...expenses[1], id: undefined };
	wrapper.find("ExpenseForm").prop("onSubmit")(updates);
	expect(startEditExpense).toHaveBeenLastCalledWith(expenses[0].id, updates);
	expect(history.push).toHaveBeenLastCalledWith("/");
});

test("should handle startRemoveExpense", () => {
	wrapper.find("button").simulate("click");
	expect(startRemoveExpense).toHaveBeenLastCalledWith({ id: expenses[0].id });
	expect(history.push).toHaveBeenLastCalledWith("/");
});
