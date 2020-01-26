import filtersReducer from "../../reducers/filters";
import moment from "moment";

const defaultState = {
	text: "",
	sortBy: "date",
	startDate: moment().startOf("month"),
	endDate: moment().endOf("month")
};

test("should set up default filter values", () => {
	const state = filtersReducer(undefined, { type: "@@INIT" });
	expect(state).toEqual(defaultState);
});

test("should set sortBy to amount", () => {
	const state = filtersReducer(undefined, { type: "SORT_BY_AMOUNT" });
	expect(state).toEqual({
		...defaultState,
		sortBy: "amount"
	});
});

test("should set sortBy to date", () => {
	const testAction = { type: "SORT_BY_DATE" };
	const state = filtersReducer(
		{ ...defaultState, sortBy: "amount" },
		testAction
	);
	expect(state).toEqual({
		...defaultState,
		sortBy: "date"
	});
	expect(filtersReducer(defaultState, testAction)).toEqual(defaultState);
});

test("should set text filter", () => {
	const testAction = { type: "SET_TEXT_FILTER", text: "some text" };
	const state = filtersReducer(undefined, testAction);
	expect(state).toEqual({
		...defaultState,
		text: testAction.text
	});
});

test("should set startDate filter", () => {
	const testAction = { type: "SET_START_DATE", startDate: moment(0) };
	const state = filtersReducer(undefined, testAction);
	expect(state).toEqual({
		...defaultState,
		startDate: testAction.startDate
	});
});

test("should set endDate filter", () => {
	const testAction = { type: "SET_END_DATE", endDate: moment(0) };
	const state = filtersReducer(undefined, testAction);
	expect(state).toEqual({
		...defaultState,
		endDate: testAction.endDate
	});
});
