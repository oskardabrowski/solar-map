import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import styled from "styled-components";
const AnalysisProgress = ({ progress }) => {
	return (
		<ProgressBar>
			<CircularProgress
				size={80}
				variant="determinate"
				value={progress}
				sx={{
					color: "#001F45",
				}}
			/>
			<p class="percentage">{progress}%</p>
		</ProgressBar>
	);
};

const ProgressBar = styled.span`
	width: 100%;
	margin-top: 1rem;
	font-family: "Work Sans";
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	position: relative;
	& > .percentage {
		position: absolute;
	}
`;

export default AnalysisProgress;
