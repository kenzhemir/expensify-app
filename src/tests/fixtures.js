import moment from "moment";
export const expenses = [
	{
		id: "1",
		description: "Gum",
		amount: 195,
		note: "",
		createdAt: 0
	},
	{
		id: "2",
		description: "Rent",
		amount: 19500,
		note: "",
		createdAt: moment(0)
			.subtract(4, "days")
			.valueOf()
	},
	{
		id: "3",
		description: "Credit Card",
		amount: 4500,
		note: "",
		createdAt: moment(0)
			.add(4, "days")
			.valueOf()
	}
];
