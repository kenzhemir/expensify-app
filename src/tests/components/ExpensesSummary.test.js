import React from "react";
import { ExpensesSummary } from "../../components/ExpensesSummary";
import { shallow } from "enzyme";

test("should render ExpensesSummary correctly with 1 expense", () => {
	const wrapper = shallow(
		<ExpensesSummary expensesCount={1} expensesTotal={9434} />
	);
	expect(wrapper).toMatchSnapshot();
});

test("should render ExpensesSummary correctly with multiple expenses", () => {
	const wrapper = shallow(
		<ExpensesSummary expensesCount={3} expensesTotal={9434} />
	);
	expect(wrapper).toMatchSnapshot();
});
