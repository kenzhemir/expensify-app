import React from "react";
import { shallow } from "enzyme";
import { ExpenseListFilters } from "../../components/ExpenseListFilters";
import { filters, altFilters } from "../fixtures/filters";
import moment from "moment";

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
	setTextFilter = jest.fn();
	sortByDate = jest.fn();
	sortByAmount = jest.fn();
	setStartDate = jest.fn();
	setEndDate = jest.fn();
	wrapper = shallow(
		<ExpenseListFilters
			filters={filters}
			setTextFilter={setTextFilter}
			sortByDate={sortByDate}
			sortByAmount={sortByAmount}
			setStartDate={setStartDate}
			setEndDate={setEndDate}
		/>
	);
});

test("should render ExpenseListFilters correctly", () => {
	expect(wrapper).toMatchSnapshot();
});

test("should render ExpenseListFilters with alt filters correctly", () => {
	expect(wrapper.setProps({ filters: altFilters })).toMatchSnapshot();
});

test("should handle text change", () => {
	const value = "some input";
	wrapper.find("input").prop("onChange")({ target: { value } });
	expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test("should sort by date", () => {
	const value = "date";
	wrapper.setProps({ filters: altFilters });
	wrapper.find("select").prop("onChange")({ target: { value } });
	expect(sortByDate).toHaveBeenCalled();
});

test("should sort by amount", () => {
	const value = "amount";
	wrapper.find("select").prop("onChange")({ target: { value } });
	expect(sortByAmount).toHaveBeenCalled();
});

test("should handle date changes", () => {
	const startDate = moment(0).add(3, "years");
	const endDate = moment(0).add(5, "years");
	wrapper.find("withStyles(DateRangePicker)").prop("onDatesChange")({
		startDate,
		endDate
	});
	expect(setStartDate).toHaveBeenLastCalledWith(startDate);
	expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

test("should handle date focus changes", () => {
	const onFocusChange = wrapper
		.find("withStyles(DateRangePicker)")
		.prop("onFocusChange");
	onFocusChange("startDate");
	expect(wrapper.state("calendarFocused")).toBe("startDate");
	onFocusChange("endDate");
	expect(wrapper.state("calendarFocused")).toBe("endDate");
	onFocusChange(null);
	expect(wrapper.state("calendarFocused")).toBe(null);
});
