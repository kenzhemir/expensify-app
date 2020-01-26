import { shallow } from "enzyme";
import React from "react";

import ExpenseListItem from "../../components/ExpenseListItem";
import expenses from "../fixtures/expenses";

test("should render expense list with expenses", () => {
	const wrapper = shallow(<ExpenseListItem {...expenses[0]} />);
	expect(wrapper).toMatchSnapshot();
});
