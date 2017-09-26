import React from "react";

export default ({ input, label, meta: { touched, error } }) => {
	return (
		<div>
			<label>{label}</label>
			<input {...input} />
			<div className="red-text" style={{ margin: "5px 0" }}>
				{touched && error}
			</div>
		</div>
	);
};
