import React, { useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import AppLogo from "../images/SolarMapLogo.svg";
import UnivesityLogo from "../images/UMKAkronimLogo.svg";
import Loader from "./Loader";
import { MapContext } from "./GlobalContext";
import PDFGenerator from "./PDFGenerator";

const Head = styled.header`
	width: 100%;
	background-color: #001f45;
	height: auto;
	display: flex;
	justify-content: space-between;
	align-items: center;
	z-index: 100000000000000000000000;
	position: relative;
	& > img {
		height: 2.5rem;
		margin: 0.8rem 1rem;
		width: auto;
	}

	.ToolsContainer {
		position: absolute;
		bottom: 100%;
		left: 0%;
	}
`;

const Header = () => {
	const ToolsContainerRef = useRef();
	const { isAppLoading, takeScreen } = useContext(MapContext);
	useEffect(() => {
		setTimeout(() => {
			const DocumentTools = document.querySelector(".leaflet-pm-draw");
			ToolsContainerRef.current.appendChild(DocumentTools);
			const EditTools = document.querySelector(".leaflet-pm-edit");
			ToolsContainerRef.current.appendChild(EditTools);
		}, 10);
	}, [isAppLoading]);
	return (
		<Head className="header">
			<img className="AppLogo" src={AppLogo} alt={AppLogo} />
			<img className="UniversityLogo" src={UnivesityLogo} alt={UnivesityLogo} />
			<div className="ToolsContainer" ref={ToolsContainerRef}></div>
			<Loader />
			{takeScreen ? <PDFGenerator /> : ""}
		</Head>
	);
};

export default Header;
