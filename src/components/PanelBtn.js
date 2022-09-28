import React from "react";

const PanelBtn = ({ name, ico, PanelHandler, code }) => {
	return (
		<button
			className="buttons-btn"
			onClick={() => PanelHandler(code)}
			title={name}
		>
			{ico}
		</button>
	);
};

export default PanelBtn;
