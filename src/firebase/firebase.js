import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
// Your web app's Firebase configuration
// process.env.NODE_ENV

var firebaseConfig = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.FIREBASE_DATABASE_URL,
	projectId: process.env.FIREBASE_PROJECT_ID,
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.FIREBASE_APP_ID
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default };

// database.ref("expenses").on("child_removed", snapshot => {
// 	console.log(snapshot.key, snapshot.val());
// });

// database.ref("expenses").on("child_changed", snapshot => {
// 	console.log(snapshot.key, snapshot.val());
// });

// database.ref("expenses").on("child_added", snapshot => {
// 	console.log(snapshot.key, snapshot.val());
// });

// // database
// // 	.ref("expenses")
// // 	.once("value")
// // 	.then(snapshot => {
// // 		const expenses = [];
// // 		snapshot.forEach(childSnapshot => {
// // 			expenses.push({ ...childSnapshot.val(), id: childSnapshot.key });
// // 		});
// // 		console.log(expenses);
// // 	})
// // 	.catch(e => console.log(e));

// // database.ref("expenses").on("value", snapshot => {
// // 	const expenses = [];
// // 	snapshot.forEach(childSnapshot => {
// // 		expenses.push({ ...childSnapshot.val(), id: childSnapshot.key });
// // 	});
// // 	console.log(expenses);
// // });

// // database.ref("expenses").push({
// // 	id: "1",
// // 	description: "Gum",
// // 	amount: 195,
// // 	note: "",
// // 	createdAt: 0
// // });

// // database.ref().on("value", snapshot => {
// // 	const val = snapshot.val();
// // 	console.log(`${val.name} is a ${val.job.title} at ${val.job.company}`);
// // });

// // database
// // 	.ref()
// // 	.set({
// // 		name: "Miras",
// // 		age: 23,
// // 		stressLevel: 6,
// // 		job: {
// // 			title: "Software developer",
// // 			company: "Google"
// // 		},
// // 		location: {
// // 			city: "Tartu",
// // 			country: "Estonia"
// // 		}
// // 	})
// // 	.then(() => {
// // 		console.log("Data is saved");
// // 	})
// // 	.catch(e => {
// // 		console.log("This failed", e);
// // 	});

// // database
// // 	.ref("location")
// // 	.once("value")
// // 	.then(snapshot => {
// // 		const val = snapshot.val();
// // 		console.log(val);
// // 	})
// // 	.catch(e => {
// // 		console.log(e);
// // 	});

// // const onValueChange = database.ref().on(
// // 	"value",
// // 	snapshot => {
// // 		console.log(snapshot.val());
// // 	},
// // 	e => {
// // 		console.log(e);
// // 	}
// // );
// // setTimeout(() => {
// // 	database.ref("age").set(34);
// // }, 3500);

// // setTimeout(() => {
// // 	database.ref().off(onValueChange);
// // }, 7000);

// // setTimeout(() => {
// // 	database.ref("age").set(36);
// // }, 10500);

// // database
// // 	.ref("attributes")
// // 	.set({
// // 		height: 183,
// // 		weight: 33
// // 	})
// // 	.then(() => {
// // 		console.log("Data is saved");
// // 	})
// // 	.catch(e => {
// // 		console.log("This is error", e);
// // 	});

// // database
// // 	.ref()
// // 	.remove()
// // 	.then(() => {
// // 		console.log("Removed!");
// // 	})
// // 	.catch(() => {
// // 		console.log("Error while remove");
// // 	});

// // database.ref().update({
// // 	stressLevel: 9,
// // 	"job/company": "Amazon",
// // 	"location/city": "Seattle"
// // });
