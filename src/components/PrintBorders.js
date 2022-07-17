import React, { useContext } from "react";
import styled from "styled-components";
import { MapContext } from "./GlobalContext";

const PrintBorders = () => {
	const { show } = useContext(MapContext);
	return (
		<BordersOfArea>
			<div className={`Borders ${show && "MenuOpen"}`}></div>
		</BordersOfArea>
	);
};

export default PrintBorders;

const BordersOfArea = styled.div`
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

	.Borders {
		width: 420px;
		height: 594px;
		font-size: 1.5rem;
		border: 2px solid black;
		margin-top: 5.5rem;
	}

	.MenuOpen {
		margin-left: 7.5rem;
	}
`;
