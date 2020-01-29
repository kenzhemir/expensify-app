import authReducer from "../../reducers/auth";

test("should set uid when login action is dispatched", () => {
	const action = { type: "LOGIN", uid: "23414" };
	const state = authReducer(undefined, action);
	expect(state.uid).toBe(action.uid);
});

test("should unset uid when logout action is dispatched", () => {
	const action = { type: "LOGOUT" };
	const state = authReducer({ uid: "123414" }, action);
	expect(state).toEqual({});
});
