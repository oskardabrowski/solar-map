import React, { useState, useRef, useEffect, useContext } from "react";
import styled from "styled-components";
import DraggableComponent from "react-draggable";
import {
	IoMdArrowDropright,
	IoMdArrowDropdown,
	IoMdClose,
} from "react-icons/io";
import { MapContext } from "./GlobalContext";

const SelectMapPart = () => {
	const window = useRef(null);
	const EditionRef = useRef();
	const [opened, setOpened] = useState(true);
	const [toolsSet, setToolsSet] = useState(false);
	const { removeTool, setTakeScreen } = useContext(MapContext);

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
						<span>Pobierz mapę</span>
					</div>
					<button class="BtnClose">
						<IoMdClose />
					</button>
				</div>
				<div
					ref={EditionRef}
					className={`Content ${opened && "ContentOpened"}`}
				>
					<button onClick={() => setTakeScreen(true)}>Download</button>
				</div>
			</LMWindow>
		</DraggableComponent>
	);
};

export default SelectMapPart;

const LMWindow = styled.div`
	position: absolute;
	top: 80px;
	right: 350px;
	width: 20rem;
	z-index: 5000;
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
