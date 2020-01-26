import { shallow } from "enzyme";
import React from "react";

import ExpenseDashboardPage from "../../components/ExpenseDashboardPage";

test("should render expense list with expenses", () => {
	const wrapper = shallow(<ExpenseDashboardPage />);
	expect(wrapper).toMatchSnapshot();
});
