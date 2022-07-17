import React, { useContext } from "react";
import LayersManagment from "./LayersManagment";
import { MapContext } from "./GlobalContext";
import MiniMap from "./MiniMap";
import DrawMeasurement from "./DrawMeasurement";
import InfoWindow from "./InfoWindow";
import DrawPanel from "./DrawPanel";
import CoordsAtr from "./CoordsAtr";
import SelectMapPart from "./SelectMapPart";
import PrintCenter from "./PrintCenter";
import PrintBorders from "./PrintBorders";

const Tools = () => {
	const { tools, infoOpen, showCross, showPrintBorders } =
		useContext(MapContext);
	return (
		<>
			{tools.includes("LayersManagement") && <LayersManagment />}
			{tools.includes("MiniMap") && <MiniMap />}
			{tools.includes("DrawTools") && <DrawMeasurement />}
			{tools.includes("DrawPanel") && <DrawPanel />}
			{tools.includes("Coords") && <CoordsAtr />}
			{tools.includes("Print") && <SelectMapPart />}
			{infoOpen === true && <InfoWindow />}
			{showCross && <PrintCenter />}
			{showPrintBorders && <PrintBorders />}
		</>
	);
};

export default Tools;
