const promise = new Promise((resolve, reject) => {
	setTimeout(() => {
		reject("oh, something happened");
	}, 4000);
});

console.log("before");

promise
	.then(data => {
		console.log(data);
	})
	.catch(data => {
		console.error(data);
	});

// setTimeout(() => {
// 	console.log("after 5s");
// 	promise.then(data => {
// 		console.log(data);
// 	});
// }, 5000);

console.log("after");
