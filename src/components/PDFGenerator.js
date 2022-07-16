import React, { Component } from "react";
import styled from "styled-components";
import { PDFExport } from "@progress/kendo-react-pdf";
import SolarMapLogo from "../images/SolarMapLogo.png";

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
				<button onClick={this.exportPDF} className="ExportBtn">
					Download PDF
				</button>
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
	overflow-y: scroll;
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

	.ExportBtn {
		position: absolute;
		top: 0;
		left: 0;
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
