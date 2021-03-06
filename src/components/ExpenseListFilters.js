import React from "react";
import { connect } from "react-redux";
import {
	setTextFilter,
	sortByDate,
	sortByAmount,
	setStartDate,
	setEndDate
} from "../actions/filters";
import { DateRangePicker } from "react-dates";

export class ExpenseListFilters extends React.Component {
	state = {
		calendarFocused: null
	};
	onTextChange = e => {
		this.props.setTextFilter(e.target.value);
	};
	onSortChange = e => {
		if (e.target.value === "date") {
			this.props.sortByDate();
		} else if (e.target.value === "amount") {
			this.props.sortByAmount();
		}
	};
	onDatesChange = ({ startDate, endDate }) => {
		this.props.setStartDate(startDate);
		this.props.setEndDate(endDate);
	};
	onFocusChange = calendarFocused => {
		this.setState(() => ({ calendarFocused }));
	};
	render() {
		return (
			<div className="content-container">
				<div className="input-group">
					<div className="input-group__item">
						<input
							type="text"
							value={this.props.filters.text}
							onChange={this.onTextChange}
							className="text-input"
							placeholder="Search expenses"
						/>
					</div>
					<div className="input-group__item">
						<select
							value={this.props.filters.sortBy}
							onChange={this.onSortChange}
							className="select"
						>
							<option value="date">Date</option>
							<option value="amount">Amount</option>
						</select>
					</div>
					<div className="input-group__item">
						<DateRangePicker
							startDate={this.props.filters.startDate}
							startDateId="filter_date_range_start_date"
							endDate={this.props.filters.endDate}
							endDateId="filter_date_range_end_date"
							onDatesChange={this.onDatesChange}
							focusedInput={this.state.calendarFocused}
							onFocusChange={this.onFocusChange}
							numberOfMonths={1}
							showClearDates={true}
							isOutsideRange={() => false}
						/>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	filters: state.filters
});

const mapDispatchToProps = dispatch => ({
	setTextFilter: value => dispatch(setTextFilter(value)),
	sortByAmount: () => dispatch(sortByAmount()),
	sortByDate: () => dispatch(sortByDate()),
	setStartDate: startDate => dispatch(setStartDate(startDate)),
	setEndDate: endDate => dispatch(setEndDate(endDate))
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);
