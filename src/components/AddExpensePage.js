import { connect } from "react-redux";
import React from "react";

import { startAddExpense } from "../actions/expenses";
import ExpenseForm from "./ExpenseForm";
import SimplePageHeader from "./SimplePageHeader";

export class AddExpensePage extends React.Component {
	onSubmit = expense => {
		this.props.startAddExpense(expense);
		this.props.history.push("/");
	};
	render() {
		return (
			<div>
				<SimplePageHeader title="Add Expense" />
				<div className="content-container">
					<ExpenseForm onSubmit={this.onSubmit} />
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	startAddExpense: expense => dispatch(startAddExpense(expense))
});

export default connect(undefined, mapDispatchToProps)(AddExpensePage);
