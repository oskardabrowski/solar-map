import React, { useContext } from "react";
import styled from "styled-components";
import { AiOutlinePlus } from "react-icons/ai";
import { MapContext } from "./GlobalContext";

const PrintCenter = () => {
	const { show } = useContext(MapContext);
	return (
		<CenterOfWindow>
			<div className={`cross ${show && "MenuOpen"}`}>
				<AiOutlinePlus />
			</div>
		</CenterOfWindow>
	);
};

export default PrintCenter;

const CenterOfWindow = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: transparent;
	z-index: 100000;
	pointer-events: none;
	display: flex;
	align-items: center;
	justify-content: center;

	.cross {
		width: 1.5rem;
		height: 1.5rem;
		font-size: 1.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 4.1rem;
	}

	.MenuOpen {
		margin-left: 7.5rem;
	}
`;
