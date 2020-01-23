// console.log("destructuring");

// const person = {
// 	age: 22,
// 	location: {
// 		city: "Tartu",
// 		temperature: 32
// 	}
// };

// const {
// 	name: firstName = "Anonymous",
// 	age,
// 	location: { temperature, city }
// } = person;

// console.log(`${firstName} is ${age}`);
// console.log(`It's ${temperature} in ${city}`);

// const book = {
// 	title: "Ego",
// 	author: "Ryan Holiday",
// 	publisher: {
// 		// name: "Penguin"
// 	}
// };

// const { name: publisherName = "Self published" } = book.publisher;

// console.log(publisherName);

// Array destructuring

// const addresses = ["132	Lunar", "Philladelphia", "Pensilvania", "14493"];
// const [, city, state = "New York"] = addresses;
// console.log(`You are in ${city} ${state}`);

const item = ["coffee", "2", "2.5", "2.65"];
const [coffee, , mediumPrice] = item;
console.log(`A med ${coffee} costs ${mediumPrice}`);
