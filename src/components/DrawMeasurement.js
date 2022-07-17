import React, { useState, useRef, useEffect, useContext } from "react";
import styled from "styled-components";
import DraggableComponent from "react-draggable";
import {
	IoMdArrowDropright,
	IoMdArrowDropdown,
	IoMdClose,
} from "react-icons/io";
import { MapContext } from "./GlobalContext";

const DrawMeasurement = () => {
	const window = useRef(null);
	const EditionRef = useRef();
	const [opened, setOpened] = useState(true);
	const { removeTool } = useContext(MapContext);
	const [toolsSet, setToolsSet] = useState(false);

	useEffect(() => {
		if (toolsSet) {
			const DocumentTools = document.querySelector(".leaflet-pm-draw");
			const ToolsArr = DocumentTools.querySelectorAll(".button-container");
			const EditTools = document.querySelector(".leaflet-pm-edit");
			const EditAllTools = EditTools.querySelectorAll(".button-container");
			ToolsArr.forEach((el) => {
				const title = el.getAttribute("title");
				const titleParagraph = document.createElement("p");
				titleParagraph.classList.add("ToolTitle");
				titleParagraph.textContent = title;
				const btn = el.querySelector(".leaflet-buttons-control-button");
				if (!btn.querySelector(".ToolTitle")) {
					btn.appendChild(titleParagraph);
				}
			});
			EditAllTools.forEach((el) => {
				let title = el.getAttribute("title");
				if (!el.getAttribute("title")) {
					title = "Obróć element";
				}
				const titleParagraph = document.createElement("p");
				titleParagraph.classList.add("ToolTitle");
				titleParagraph.textContent = title;
				const btn = el.querySelector(".leaflet-buttons-control-button");
				if (!btn.querySelector(".ToolTitle")) {
					btn.appendChild(titleParagraph);
				}
			});
		}
	}, [toolsSet]);

	useEffect(() => {
		setTimeout(() => {
			const DocumentTools = document.querySelector(".leaflet-pm-draw");
			EditionRef.current.appendChild(DocumentTools);
			const EditTools = document.querySelector(".leaflet-pm-edit");
			EditionRef.current.appendChild(EditTools);

			setTimeout(() => {
				setToolsSet(true);
			}, 10);
		}, 10);
	}, []);

	const RemoveDrawToolsHandler = () => {
		const ToolsContainer = document.querySelector(".ToolsContainer");
		const DocumentTools = document.querySelector(".leaflet-pm-draw");
		ToolsContainer.appendChild(DocumentTools);
		const EditTools = document.querySelector(".leaflet-pm-edit");
		ToolsContainer.appendChild(EditTools);
		setTimeout(() => {
			removeTool("DrawTools");
		}, 1);
	};

	return (
		<DraggableComponent nodeRef={window} handle="div.PanelTitle">
			<LMWindow ref={window}>
				<div className="PanelTitle">
					<div>
						<button
							className="PanelTitle-BtnOpen"
							onClick={() => setOpened(!opened)}
						>
							{opened ? <IoMdArrowDropdown /> : <IoMdArrowDropright />}
						</button>
						<span>Pomiary</span>
					</div>
					<button class="BtnClose" onClick={() => RemoveDrawToolsHandler()}>
						<IoMdClose />
					</button>
				</div>
				<GeomanStyles>
					<div
						ref={EditionRef}
						className={`Content ${opened && "ContentOpened"}`}
					></div>
				</GeomanStyles>
			</LMWindow>
		</DraggableComponent>
	);
};

export default DrawMeasurement;

const GeomanStyles = styled.div`
	.button-container {
		width: 100%;
		height: auto;
		background-color: white;
		color: black;
		border-bottom: 1px solid grey;
		padding: 0px !important;
		margin: 0px !important;
	}
	a.leaflet-buttons-control-button {
		width: 100% !important;
		height: 2rem !important;
		padding: 0 !important;
		display: flex;
		align-items: center;
		font-family: "Arial";
		color: black;
		text-decoration: none;
		& > div {
			width: 1.2rem !important;
			margin: 0rem 1rem;
		}
	}
	.leaflet-pm-actions-container {
		position: relative !important;
		top: 0 !important;
		left: 0 !important;
		width: 100% !important;
		display: none;
		min-height: 30px;
		justify-content: center;

		& > a {
			border-bottom: 1px solid grey !important;
			&:last-child {
				border-bottom: 1.5px solid black !important;
			}
		}
	}
	.leaflet-pm-action {
		display: flex !important;
		align-items: center;
		justify-content: center;
		border-radius: 0px;
		background-color: white !important;
		color: black !important;
		text-decoration: none;
		font-family: "Arial";
	}
	.leaflet-pm-draw {
		&:last-child {
			border-bottom: 1px solid grey !important;
		}
	}
	.show-options {
		display: flex !important;
	}
`;

const LMWindow = styled.div`
	position: absolute;
	top: 80px;
	right: 350px;
	width: 20rem;
	z-index: 500000;
	background-color: white;
	display: flex;
	flex-direction: column;
	justify-content: stretch;
	border-radius: 10px;
	overflow: hidden;

	.DrawElement {
		display: flex;
		flex-direction: column;
		& > button {
			padding: 0.5rem;
			font-size: 1.1rem;
			text-align: left;
			border-radius: 0px;
			background: none;
			border: none;
			border-bottom: 1px solid grey;

			&:hover {
				cursor: pointer;
				background-color: #ebebeb;
			}

			& > .ico {
				margin: 0rem 0.5rem;
			}
		}
		&-options {
			border-bottom: 1px solid grey;
			display: inline-grid;
			grid-template-columns: auto auto auto;
			& > button {
				padding: 0.15rem;
				background: none;
				border-radius: 0px;
				border: none;
				&:hover {
					cursor: pointer;
					background-color: #ebebeb;
				}
				&:first-child {
					border-right: 1px solid grey;
				}
				&:last-child {
					border-left: 1px solid grey;
				}
			}
		}
	}

	.Content {
		transition: all 0.5s ease-in-out;
		max-height: 0rem;
		display: flex;
		flex-direction: column;
		transition: max-height 0.75s ease-in-out;
	}

	.ContentOpened {
		max-height: 50rem;
		transition: max-height 0.75s ease-in-out;
	}

	.BtnClose {
		color: white;
		background: none;
		border: none;
		font-size: 1.2rem;
		display: flex;
		align-items: center;
		justify-content: center;

		&:hover {
			cursor: pointer;
		}
	}

	.PanelTitle {
		background-color: #001f45;
		color: white;
		padding: 0.5rem;
		font-family: "Work Sans";
		display: flex;
		justify-content: space-between;
		z-index: 200;
		border-radius: 10px 10px 0px 0px;

		&:hover {
			cursor: move;
		}

		& > div {
			display: flex;

			& > span {
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}

		&-BtnOpen {
			color: white;
			background: none;
			border: none;
			display: flex;
			align-items: center;
			justify-content: center;
			width: min-content;
			font-size: 1.2rem;
			margin-right: 0.5rem;

			&:hover {
				cursor: pointer;
			}
		}
	}
`;
