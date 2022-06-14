import React, { useState, useRef, useEffect, useContext } from "react";
import styled from "styled-components";
import DraggableComponent from "react-draggable";
import {
	IoMdArrowDropright,
	IoMdArrowDropdown,
	IoMdClose,
} from "react-icons/io";
import { MdDraw, MdEditLocationAlt } from "react-icons/md";
import { BsEraserFill } from "react-icons/bs";
import { MapContext } from "./GlobalContext";
import AnalysisBtn from "./AnalysisBtn";
import AnalysisProgress from "./AnalysisProgress";
import AnalysisResult from "./AnalysisResult";

const DrawPanel = () => {
	const window = useRef(null);
	const EditionRef = useRef();
	const ActionsDrawRef = useRef();
	const ActionsEditRef = useRef();
	const ActionsRemoveRef = useRef();
	const EfficiencyRef = useRef();
	const [opened, setOpened] = useState(true);
	const [percentageEfficiency, setPercentageEfficiency] = useState(20);
	const {
		removeTool,
		solarPanelDrawing,
		setSolarPanelDrawing,
		panelArea,
		buildingMean,
		calculateSolarData,
		setCalculateSolarData,
		calculatedSolarData,
		solarCalculationProgress,
		setSolarCalculationProgress,
	} = useContext(MapContext);
	const [totalCalculatedEnergy, setTotalCalculatedEnergy] = useState(0);

	useEffect(() => {
		if (calculatedSolarData.length > 0) {
			let TotalEnergy = 0;
			calculatedSolarData.forEach((data) => {
				if (data.id !== 1300) {
					const mean = data.id - 50;
					const area = data.area;
					const efficiency = EfficiencyRef.current.value;
					const energyFromPart = mean * area * (efficiency / 100);
					TotalEnergy += energyFromPart;
				} else {
					const mean = 1210;
					const area = data.area;
					const efficiency = EfficiencyRef.current.value;
					const energyFromPart = mean * area * (efficiency / 100);
					TotalEnergy += energyFromPart;
				}
			});
			setTotalCalculatedEnergy(TotalEnergy.toFixed(2));
		}
	}, [calculatedSolarData]);

	useEffect(() => {
		const arr = [ActionsDrawRef, ActionsEditRef, ActionsRemoveRef];
		if (!solarPanelDrawing) {
			arr.forEach((el) => {
				el.current.style.display = "none";
			});
		}
	}, [solarPanelDrawing]);

	const DrawSpecialPolygon = (e, action) => {
		setSolarPanelDrawing(true);
		const DocumentTools = document.querySelector(".leaflet-pm-draw");
		const PolygonButton = DocumentTools.querySelector(
			"div[title='Narysuj wielokąt']"
		);
		const actionsBtns = PolygonButton.querySelector(
			"div.leaflet-pm-actions-container"
		);
		if (action === "start") {
			const btn = PolygonButton.querySelector("a");
			const actions = e.target.closest("span").querySelector(".actions");
			actions.style.display = "flex";
			btn.click();
		} else if (action === "finish") {
			const btn = actionsBtns.querySelector("a.action-finish");
			btn.click();
		} else if (action === "removeVertex") {
			const btn = actionsBtns.querySelector("a.action-removeLastVertex");
			btn.click();
		} else if (action === "cancel") {
			const btn = actionsBtns.querySelector("a.action-cancel");
			btn.click();
		}
	};
	const EditSpecialPolygon = (e, action) => {
		const DocumentTools = document.querySelector(".leaflet-pm-edit");
		const EditButton = DocumentTools.querySelector("div[title='Edytuj']");
		const actionsBtns = EditButton.querySelector(
			"div.leaflet-pm-actions-container"
		);
		if (action === "Edit") {
			const btn = EditButton.querySelector("a");
			const actions = e.target.closest("span").querySelector(".actions");
			actions.style.display = "flex";
			if (solarPanelDrawing) {
				setSolarPanelDrawing(false);
			} else {
				setSolarPanelDrawing(true);
			}
			btn.click();
		} else if (action === "finish") {
			const btn = actionsBtns.querySelector("a.action-finishMode");
			setSolarPanelDrawing(false);
			btn.click();
		}
	};
	const DeleteSpecialPolygon = (e, action) => {
		setSolarPanelDrawing(true);
		const DocumentTools = document.querySelector(".leaflet-pm-edit");
		const DelButton = DocumentTools.querySelector("div[title='Usuń']");
		const actionsBtns = DelButton.querySelector(
			"div.leaflet-pm-actions-container"
		);
		if (action === "Delete") {
			const btn = DelButton.querySelector("a");
			ActionsRemoveRef.current.style.display = "flex";
			if (solarPanelDrawing) {
				setSolarPanelDrawing(false);
			} else {
				setSolarPanelDrawing(true);
			}
			btn.click();
		} else if (action === "cancel") {
			const btn = actionsBtns.querySelector("a.action-finishMode");
			setSolarPanelDrawing(false);
			btn.click();
		}
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
						<span>Rysuj panel</span>
					</div>
					<button class="BtnClose" onClick={() => removeTool("DrawPanel")}>
						<IoMdClose />
					</button>
				</div>
				<div>
					<div
						ref={EditionRef}
						className={`Content ${opened && "ContentOpened"}`}
					>
						<div className="Controls">
							<span>
								<button onClick={(e) => DrawSpecialPolygon(e, "start")}>
									<MdDraw className="ico" />
									Rysuj
								</button>
								<span className="actions" ref={ActionsDrawRef}>
									<button onClick={(e) => DrawSpecialPolygon(e, "finish")}>
										Zakończ
									</button>
									<button
										onClick={(e) => DrawSpecialPolygon(e, "removeVertex")}
									>
										Usuń ostatni punkt
									</button>
									<button onClick={(e) => DrawSpecialPolygon(e, "cancel")}>
										Anuluj
									</button>
								</span>
							</span>
							<span>
								<button onClick={(e) => EditSpecialPolygon(e, "Edit")}>
									<MdEditLocationAlt className="ico" />
									Edytuj
								</button>
								<span className="actions" ref={ActionsEditRef}>
									<button onClick={(e) => EditSpecialPolygon(e, "finish")}>
										Zakończ
									</button>
								</span>
							</span>
							<span>
								<button
									className="actions"
									onClick={(e) => DeleteSpecialPolygon(e, "Delete")}
								>
									<BsEraserFill className="ico" />
									Usuń
								</button>
								<span ref={ActionsRemoveRef}>
									<button onClick={(e) => DeleteSpecialPolygon(e, "cancel")}>
										Zakończ
									</button>
								</span>
							</span>
						</div>
						<div className="Content-options">
							<form>
								<label htmlFor="PanelEfficiency">Sprawność panelu:</label>
								<span>
									<input
										type="number"
										value={percentageEfficiency}
										min="1"
										max="100"
										id="PanelEfficiency"
										ref={EfficiencyRef}
										onChange={(e) => setPercentageEfficiency(e.target.value)}
									/>
									%
								</span>
								<label htmlFor="PanelEnergy">
									Średni dopływ energii słonecznej:
								</label>
								<span>
									<input
										type="text"
										value={(
											panelArea *
											buildingMean *
											(percentageEfficiency / 100)
										).toFixed(2)}
										id="PanelEnergy"
										readOnly
									/>
									kWh/m
									<sup>2</sup>/rok
								</span>
							</form>
							<div className="Content-options-analysis">
								<p className="Content-options-analysis-header">
									Analiza solarna dachu:
								</p>
								{solarCalculationProgress === 0 && (
									<AnalysisBtn fn={setCalculateSolarData} />
								)}
								{solarCalculationProgress < 100 &&
								solarCalculationProgress > 0 ? (
									<AnalysisProgress progress={solarCalculationProgress} />
								) : (
									""
								)}
								{solarCalculationProgress === 100 && (
									<AnalysisResult
										energy={totalCalculatedEnergy}
										progress={setSolarCalculationProgress}
									/>
								)}
							</div>
						</div>
					</div>
				</div>
			</LMWindow>
		</DraggableComponent>
	);
};

export default DrawPanel;

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

	.Content {
		transition: all 0.75s ease-in-out;
		max-height: 0rem;
		/* height: 25rem; */
		display: flex;
		flex-direction: column;
		/* overflow-y: scroll; */
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

		&-options {
			margin-top: 1rem;
			font-family: "Work Sans";
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			&-analysis {
				margin: 1rem 0rem;
				font-family: "Work Sans";
				width: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				&-header {
					font-size: 1.2rem;
				}
				&-desc {
					font-size: 0.75rem;
					padding: 0rem 0.75rem;
					text-align: justify;
				}
				& > span {
					&:nth-child(1) {
						font-family: "Work Sans";
						width: 100%;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
					}
					&:nth-child(2) {
						font-family: "Work Sans";
						width: 100%;

						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;

						& > button {
							margin: 0.5rem 0rem;
							padding: 0.5rem;
							background: #001f45;
							color: white;
							border: none;
							border-radius: 10px;
							font-family: "Work Sans";
							transition: all 0.5s ease-in-out;

							&:hover {
								cursor: pointer;
								background: #005fd3;
							}
						}
					}
				}
			}
			& > form {
				display: flex;
				flex-direction: column;
				font-family: "Work Sans";

				& > label {
					margin-top: 0.5rem;
					margin-left: 1rem;
				}
				& > span {
					display: flex;
					justify-content: left;
					align-items: center;
					padding-left: 1rem;

					& > input {
						width: 7rem;
						height: 1.5rem;
						margin-top: 0.5rem;
						margin-right: 0.5rem;
						text-align: right;
						border: 1px solid black;

						&::-webkit-inner-spin-button {
							opacity: 1;
							margin-left: 0.5rem;
							/* height: 100%; */
						}

						&:first-child {
							padding-right: 0.5rem;
						}
					}
				}
			}
		}

		& > div.Controls {
			display: flex;
			flex-direction: column;
			& > span {
				width: 100%;
				border-top: 1.5px solid grey;
				border-bottom: 1.5px solid grey;
				& > button {
					width: 100%;
					padding: 0.25rem;
					font-size: 1rem;
					display: flex;
					justify-content: left;
					align-items: center;
					border-radius: 0px;
					border: none;
					background: none;
					& > .ico {
						margin: 0rem 0.25rem 0rem 0rem;
					}

					&:hover {
						cursor: pointer;
					}
				}

				& > span {
					display: flex;
					flex-direction: column;
					display: none;

					& > button {
						padding: 0.25rem 0.5rem;
						border-radius: 0px;
						border: none;
						background: none;
						border-top: 1px solid grey;
						/* border-bottom: 1px solid grey; */
						&:hover {
							cursor: pointer;
						}
					}
				}
			}
		}
	}

	.ContentOpened {
		/* height: min-content; */
		max-height: 50rem;
		transition: all 0.75s ease-in-out;
	}

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
