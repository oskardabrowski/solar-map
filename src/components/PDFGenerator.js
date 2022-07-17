import React, { Component, useContext } from "react";
import styled from "styled-components";
import { PDFExport } from "@progress/kendo-react-pdf";
import SolarMapLogo from "../images/SolarMapLogo.png";
import { MapContext } from "./GlobalContext";

const CloseBtn = () => {
	const { setTakeScreen } = useContext(MapContext);
	return (
		<button onClick={() => setTakeScreen(false)} className="ExportMenu-Exit">
			Wróć
		</button>
	);
};
class PDFGenerator extends Component {
	map;

	exportPDF = () => {
		document.querySelector(".PaperA4").style.transform = "scale(1)";
		this.map.save();
		setTimeout(() => {
			document.querySelector(".PaperA4").style.transform = "scale(.9)";
		}, 500);
	};

	render() {
		return (
			<PDFWindow>
				<div className="ExportMenu">
					<button onClick={this.exportPDF} className="ExportMenu-Download">
						Pobierz PDF
					</button>
					<CloseBtn />
				</div>
				<PDFExport
					paperSize={"Letter"}
					fileName="MapTest.pdf"
					title=""
					subject=""
					keywords=""
					ref={(r) => (this.map = r)}
				>
					<div className="PaperA4">
						<img src={SolarMapLogo} alt="" className="Logo" />
						<div className="MapCanvasContainer"></div>
					</div>
				</PDFExport>
			</PDFWindow>
		);
	}
}

export default PDFGenerator;

const PDFWindow = styled.div`
	position: fixed;
	z-index: 100000000000000;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	/* padding: 3rem 0rem; */

	.PaperA4 {
		width: 38.25rem;
		height: 49.25rem;
		background-color: white;
		position: relative;
		overflow: hidden;
		transform: scale(0.9);
	}

	.Logo {
		width: 12.5rem;
		position: absolute;
		top: 1.5rem;
		left: 1.75rem;
		z-index: 100000000;
	}

	.ExportMenu {
		position: absolute;
		top: 5rem;
		left: 10rem;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		justify-content: space-evenly;
		width: 12.5rem;
		height: 5rem;

		& > button {
			padding: 0.5rem 0rem;
			border: none;
			border-radius: 50rem;
			font-family: "Work Sans";
			color: black;
			background-color: white;
			transition: all 0.5s ease-in-out;

			&:hover {
				color: white;
				background-color: #001f45;
				cursor: pointer;
			}
		}
	}

	.MapCanvasContainer {
		width: 94%;
		height: 96%;
		background: skyblue;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		& > canvas {
			width: 100%;
			height: 100%;
		}
	}
`;
