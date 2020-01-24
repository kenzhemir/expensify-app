import React from "react";
import ReactDOM from "react-dom";

const Info = props => (
	<div>
		<h1>Info</h1>
		<div>The info is: {props.info} </div>
	</div>
);

const withAdminWarning = WrappedComponent => props => (
	<div>
		{props.isAdmin && <p>This is private info, please don't share</p>}
		<WrappedComponent {...props} />
	</div>
);

const requireAuthentication = WrappedComponent => props => (
	<div>
		{props.isAuthenticated ? (
			<WrappedComponent {...props} />
		) : (
			<p>This is private info, please authenticate</p>
		)}
	</div>
);

const AdminInfo = withAdminWarning(Info);
const Authinfo = requireAuthentication(Info);

// ReactDOM.render(
// 	<AdminInfo isAdmin={true} info="There is your details" />,
// 	document.getElementById("app")
// );
ReactDOM.render(
	<Authinfo isAuthenticated={true} info="There is your details" />,
	document.getElementById("app")
);
