import React, { useState, useRef, useEffect, useContext } from "react";
import styled from "styled-components";
import DraggableComponent from "react-draggable";
import {
	IoMdArrowDropright,
	IoMdArrowDropdown,
	IoMdClose,
} from "react-icons/io";
import { ResizableBox } from "react-resizable";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import { MapLayerActions } from "./LayersReducer";
import { MapContext } from "./GlobalContext";

const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};

const LayersManagment = () => {
	const window = useRef(null);
	const [opened, setOpened] = useState(true);
	const [size, setSize] = useState(400);
	const sizeRef = useRef(null);
	const [activeLayers, setActiveLayers] = useState(["Roofs"]);
	const [activeLegends, setActiveLegends] = useState(["Roofs"]);

	const { generalLegendSeen, removeTool } = useContext(MapContext);

	const dispatch = useDispatch();

	const layers = useSelector((state) => state.layers.array);
	useEffect(() => {
		const layersArray = [];
		layers.forEach((el) => layersArray.push(el.code));
		setActiveLayers(layersArray.reverse());
	}, [layers]);

	async function onDragEnd(result) {
		if (!result.destination) {
			return;
		}

		const reducerArr = [];

		const newitems = await reorder(
			layers,
			layers.length - 1 - result.source.index,
			layers.length - 1 - result.destination.index
		);

		await newitems.forEach((el) => {
			const code = el.code;
			const obj = { code: code, index: 1000 };
			reducerArr.push(obj);
		});

		dispatch(MapLayerActions.removeLayer(reducerArr));
	}

	useEffect(async () => {
		if (opened !== true) {
			document.querySelector(".ContentContainer").style.transition =
				"all .5s ease-in-out";
			setSize(0);
			setTimeout(() => {
				document.querySelector(".ContentContainer").style.transition =
					"all .5s ease-in-out";
			}, 501);
		} else {
			setSize(400);
			setTimeout(() => {
				document.querySelector(".ContentContainer").style.transition =
					"all 0s ease-in-out";
			}, 500);
		}
	}, [opened]);

	const legendRoofStore = [
		{ desc: "> 1200 kWh/m", color: "#E81014" },
		{ desc: "1101 - 1200 kWh/m", color: "#F25922" },
		{ desc: "1001 - 1100 kWh/m", color: "#FA8D34" },
		{ desc: "901 - 1000 kWh/m", color: "#FCC44C" },
		{ desc: "801 - 900 kWh/m", color: "#FFEF14" },
		{ desc: "701 - 800 kWh/m", color: "#CEDE81" },
		{ desc: "601 - 700 kWh/m", color: "#A0C29B" },
		{ desc: "501 - 600 kWh/m", color: "#6DA9B3" },
		{ desc: "< 500 kWh/m", color: "#2892C7" },
	];

	const openLegend = (e, code) => {
		const btn = e.target.closest("article");
		const legend = btn.parentElement.querySelector(".Content-legend");
		legend.classList.toggle("ContentOpened");

		if (activeLegends.includes(code)) {
			const newArr = activeLegends.filter((el) => el !== code);
			setActiveLegends(newArr);
		} else {
			const newArr = [...activeLegends, code];
			setActiveLegends(newArr);
		}
	};

	let items = [
		{
			id: "item-1",
			code: "Roofs",
			content: (
				<>
					<article className="Content-btn">
						<span
							className="Content-btn-ico"
							onClick={(e) => openLegend(e, "Roofs")}
						>
							{activeLegends.includes("Roofs") ? (
								<IoMdArrowDropdown />
							) : (
								<IoMdArrowDropright />
							)}
						</span>
						Klasyfikacja dachów
					</article>
					<div
						className={`Content-legend ${
							!generalLegendSeen && "ContentOpened"
						}`}
					>
						{legendRoofStore.map((el, index) => (
							<div key={index} className="RoofsLegendElement">
								<div style={{ backgroundColor: `${el.color}` }}></div>
								<span>
									{el.desc}
									<sup>2</sup>
								</span>
							</div>
						))}
					</div>
				</>
			),
		},
		{
			id: "item-2",
			code: "All",
			content: (
				<>
					<article className="Content-btn">
						<span
							className="Content-btn-ico"
							onClick={(e) => openLegend(e, "All")}
						>
							{activeLegends.includes("All") ? (
								<IoMdArrowDropdown />
							) : (
								<IoMdArrowDropright />
							)}
						</span>
						Klasyfikacja powierzchni
					</article>
					<div className="Content-legend">
						{legendRoofStore.map((el, index) => (
							<div key={index} className="RoofsLegendElement">
								<div style={{ backgroundColor: `${el.color}` }}></div>
								<span>
									{el.desc}
									<sup>2</sup>
								</span>
							</div>
						))}
					</div>
				</>
			),
		},
		{
			id: "item-3",
			code: "GradientAll",
			content: (
				<>
					<article className="Content-btn">
						<span
							className="Content-btn-ico"
							onClick={(e) => openLegend(e, "GradientAll")}
						>
							{activeLegends.includes("GradientAll") ? (
								<IoMdArrowDropdown />
							) : (
								<IoMdArrowDropright />
							)}
						</span>
						Gradient Powierzchni
					</article>
					<div className="Content-legend">
						<div className="Content-legend-gradient">
							<div className="Content-legend-gradient-box"></div>
							<div className="Content-legend-gradient-desc">
								<span>
									1220 kWh/m<sup>2</sup>
								</span>
								<span>
									610 kWh/m<sup>2</sup>
								</span>
								<span>
									0 kWh/m<sup>2</sup>
								</span>
							</div>
						</div>
					</div>
				</>
			),
		},
		{
			id: "item-4",
			code: "SkyView",
			content: (
				<>
					<article className="Content-btn">
						<span
							className="Content-btn-ico"
							onClick={(e) => openLegend(e, "SkyView")}
						>
							{activeLegends.includes("SkyView") ? (
								<IoMdArrowDropdown />
							) : (
								<IoMdArrowDropright />
							)}
						</span>
						Widoczność nieba
					</article>
					<div className="Content-legend">
						<div className="Content-legend-gradient">
							<div className="Content-legend-gradient-view"></div>
							<div className="Content-legend-gradient-desc">
								<span>100%</span>
								<span>50%</span>
								<span>0%</span>
							</div>
						</div>
					</div>
				</>
			),
		},
		{
			id: "item-5",
			code: "Buildings",
			content: (
				<>
					<article className="Content-btn">
						<span
							className="Content-btn-ico"
							onClick={(e) => openLegend(e, "Buildings")}
						>
							{activeLegends.includes("Buildings") ? (
								<IoMdArrowDropdown />
							) : (
								<IoMdArrowDropright />
							)}
						</span>
						Obrysy Budynków
					</article>
					<div className="Content-legend">
						<div className="Content-legend-building">
							<span></span>
						</div>
					</div>
				</>
			),
		},
	];

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
						<span>Zarządzanie warstwami</span>
					</div>
					<button
						class="BtnClose"
						onClick={() => removeTool("LayersManagement")}
					>
						<IoMdClose />
					</button>
				</div>
				<ResizableBox
					className="ContentContainer"
					width={"100%"}
					height={size}
					ref={sizeRef}
					axis="y"
				>
					<DragDropContext onDragEnd={onDragEnd}>
						<Droppable droppableId="droppable" className="Dropable">
							{(provided, snapshot) => (
								<div
									{...provided.droppableProps}
									ref={provided.innerRef}
									className="Content"
									style={{ position: "relative" }}
								>
									{activeLayers.map((elementCode, index) => {
										const item = items.find((el) => el.code === elementCode);
										return (
											<Draggable
												key={item.id}
												draggableId={item.id}
												index={index}
											>
												{(provided, snapshot) => (
													<div
														className="testElement"
														ref={provided.innerRef}
														{...provided.draggableProps}
														{...provided.dragHandleProps}
														snapshot={snapshot}
													>
														{item.content}
													</div>
												)}
											</Draggable>
										);
									})}
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					</DragDropContext>
				</ResizableBox>
			</LMWindow>
		</DraggableComponent>
	);
};

export default LayersManagment;

const LMWindow = styled.div`
	position: absolute;
	top: 80px;
	right: 10px;
	width: 20rem;
	z-index: 5000;
	background-color: white;
	display: flex;
	flex-direction: column;
	justify-content: stretch;
	border-radius: 10px;
	overflow: hidden;

	.testElement {
		top: auto !important;
		left: auto !important;
	}

	.SpecialZindex {
		z-index: 1000000;
	}
	.RoofsLegendElement {
		display: flex;
		align-items: center;
		& > div {
			width: 1.5rem;
			height: 1.5rem;
			margin: 0.5rem;
			border-radius: 50%;
		}

		& > span {
			font-family: "Arial";
			font-size: 0.9rem;
		}
	}

	.ContentOpened {
		height: 100% !important;
		clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%) !important;
	}

	.Content {
		height: min-content;
		margin-bottom: 5rem;
		position: relative !important;
		&-btn {
			width: 100%;
			display: flex;
			align-items: left;
			font-size: 0.9rem;
			margin-top: 0.25rem;
			background: none;
			border: none;
			font-family: "Work Sans";
			&-ico {
				margin: 0rem 0.5rem;
				font-size: 1rem;
				&:hover {
					cursor: pointer;
				}
			}
		}

		&-legend {
			padding-bottom: 1rem;
			height: 0;
			clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
			&-building {
				display: flex;
				justify-content: left;

				& > span {
					width: 4rem;
					height: 2rem;
					margin-left: 1rem;
					border: 2px solid black;
				}
			}
			&-gradient {
				display: flex;
				justify-content: left;
				&-box {
					height: 15rem;
					width: 4rem;
					background: linear-gradient(to top, #2892c7, #ffef14, #e81014);
					margin-left: 0.5rem;
					margin-bottom: 0.5rem;
					border: 1.5px solid black;
				}
				&-view {
					height: 15rem;
					width: 4rem;
					background: linear-gradient(to top, black, white);
					margin-left: 0.5rem;
					margin-bottom: 0.5rem;
					border: 1.5px solid black;
				}
				&-desc {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					margin-bottom: 0.5rem;
					margin-left: 0.5rem;
					font-family: "Arial";
				}
			}
		}
	}

	.react-resizable {
		position: relative;
		overflow-y: scroll;
		::-webkit-scrollbar {
			width: 10px;
		}
		::-webkit-scrollbar-track {
			background: white;
		}
		::-webkit-scrollbar-thumb {
			background: #001f45;
		}
		::-webkit-scrollbar-thumb:hover {
			background: #004aa5;
			cursor: pointer;
		}
	}
	.react-resizable-handle {
		position: fixed;
		width: 100%;
		height: 1rem;
		bottom: 0;
		right: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		&::before {
			content: "...";
			margin-bottom: 1rem;
			font-size: 2rem;
			color: grey;
		}
		background-color: darkgray;
		cursor: n-resize;
	}

	.Content {
		resize: vertical;
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
