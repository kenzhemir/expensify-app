import getTotalExpenses from "../../selectors/expenses-total";
import expenses, { totalAmount } from "../fixtures/expenses";

test("should return 0 if no expenses", () => {
	expect(getTotalExpenses([])).toBe(0);
});

test("should correctly add up single expense", () => {
	expect(getTotalExpenses([expenses[0]])).toBe(expenses[0].amount);
});

test("should correctly add up multiple expenses", () => {
	expect(getTotalExpenses(expenses)).toBe(totalAmount);
});
