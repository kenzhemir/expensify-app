import { shallow } from "enzyme";
import React from "react";

import { LoginPage } from "../../components/LoginPage";

test("should render login page", () => {
	const wrapper = shallow(<LoginPage />);
	expect(wrapper).toMatchSnapshot();
});

test("should login when button clicked", () => {
	const startLogin = jest.fn();
	const wrapper = shallow(<LoginPage startLogin={startLogin} />);
	wrapper.find("button").simulate("click");
	expect(startLogin).toHaveBeenCalled();
});
