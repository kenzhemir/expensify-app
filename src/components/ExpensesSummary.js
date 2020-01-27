import { connect } from "react-redux";
import numeral from "numeral";
import React from "react";

import getTotalExpenses from "../selectors/expenses-total";
import selectExpenses from "../selectors/expenses";

export const ExpensesSummary = ({ expensesCount, expensesTotal }) => {
	const expenseWord = expensesCount == 1 ? "expense" : "expenses";
	const formattedTotal = numeral(expensesTotal / 100).format("$0,0.00");
	return (
		<p>
			Viewing {expensesCount} {expenseWord} totalling {formattedTotal}
		</p>
	);
};

const mapStateToProps = state => {
	const visibleExpenses = selectExpenses(state.expenses, state.filters);
	return {
		expensesCount: visibleExpenses.length,
		expensesTotal: getTotalExpenses(visibleExpenses)
	};
};

export default connect(mapStateToProps)(ExpensesSummary);
