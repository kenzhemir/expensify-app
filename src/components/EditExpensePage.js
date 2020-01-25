import { connect } from "react-redux";
import React from "react";

import { editExpense } from "../actions/expenses";
import { removeExpense } from "../actions/expenses";
import ExpenseForm from "./ExpenseForm";

const EditExpensePage = props => {
	console.log(props);
	return (
		<div>
			<ExpenseForm
				expense={props.expense}
				onSubmit={expense => {
					props.dispatch(editExpense(props.expense.id, expense));
				}}
			/>
			<button
				onClick={e => {
					props.dispatch(removeExpense({ id: props.expense.id }));
					props.history.push("/");
				}}
			>
				Remove
			</button>
		</div>
	);
};

const mapStateToProps = (state, props) => ({
	expense: state.expenses.find(expense => expense.id === props.match.params.id)
});

export default connect(mapStateToProps)(EditExpensePage);
