import React from "react";
import styled from "styled-components";

const AnalysisResult = ({ energy, progress }) => {
	return (
		<MeasurementsResult>
			<p>
				{energy} kWh/m<sup>2</sup>/rok
			</p>
			<a onClick={() => progress(0)}>Zresetuj wynik</a>
		</MeasurementsResult>
	);
};

const MeasurementsResult = styled.span`
	margin: 1rem 0rem;
	& > a {
		margin-top: 0.5rem;
		color: "#001F45";
		text-decoration: underline;

		&:hover {
			cursor: pointer;
			color: blue;
		}
	}
`;

export default AnalysisResult;
