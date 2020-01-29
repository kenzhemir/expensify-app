import { login, logout } from "../../actions/auth";

test("should return login action object", () => {
	const uid = "12323";
	const action = login(uid);
	expect(action).toEqual({ type: "LOGIN", uid });
});

test("should return logout action object", () => {
	const action = logout();
	expect(action).toEqual({ type: "LOGOUT" });
});
