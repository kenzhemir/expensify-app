import { SingleDatePicker } from "react-dates";
import moment from "moment";
import React, { Component } from "react";

import "react-dates/lib/css/_datepicker.css";

// const date = new Date();
const now = moment();
console.log(now.format("MMM Do, YYYY"));

export default class ExpenseForm extends Component {
	constructor(props) {
		super(props);
		const { description, note, amount, createdAt } = props.expense || {};
		this.state = {
			description: description || "",
			note: note || "",
			amount: amount ? (amount / 100).toString() : "",
			createdAt: createdAt ? moment(createdAt) : moment(),
			calendarFocused: false,
			error: ""
		};
	}
	onDescriptionChange = e => {
		const description = e.target.value;
		this.setState(() => ({ description }));
	};
	onAmountChange = e => {
		const amount = e.target.value;
		if (amount.match(/^\d*(\d\.\d{0,2})?$/)) {
			this.setState(() => ({ amount }));
		}
	};
	onNoteChange = e => {
		const note = e.target.value;
		this.setState(() => ({ note }));
	};
	onDateChange = createdAt => {
		if (createdAt) {
			this.setState(() => ({ createdAt }));
		}
	};
	onFocusChange = ({ focused }) => {
		this.setState(() => ({ calendarFocused: focused }));
	};
	onSubmit = e => {
		e.preventDefault();
		if (!this.state.description || !this.state.amount) {
			this.setState({ error: "Please provide description and amount" });
		} else {
			this.setState({ error: undefined });
			this.props.onSubmit({
				description: this.state.description,
				amount: parseFloat(this.state.amount, 10) * 100,
				createdAt: this.state.createdAt.valueOf(),
				note: this.state.note
			});
		}
	};
	render() {
		return (
			<div>
				{this.state.error && <p>{this.state.error}</p>}
				<form onSubmit={this.onSubmit}>
					<input
						type="text"
						autoFocus
						placeholder="Description"
						value={this.state.description}
						onChange={this.onDescriptionChange}
					/>
					<input
						type="text"
						placeholder="Amount"
						value={this.state.amount}
						onChange={this.onAmountChange}
					/>
					<SingleDatePicker
						date={this.state.createdAt}
						onDateChange={this.onDateChange}
						focused={this.state.calendarFocused}
						onFocusChange={this.onFocusChange}
						numberOfMonths={1}
						isOutsideRange={() => false}
					/>
					<textarea
						name=""
						value={this.state.note}
						onChange={this.onNoteChange}
						placeholder="Add a note to your expense (optional)"
					></textarea>
					<button>Add expense</button>
				</form>
			</div>
		);
	}
}
