import React, { createContext, useState } from "react";

const MapContext = createContext();

const MapProvider = ({ children }) => {
	const [zoomLevel, setZoomLevel] = useState(12);
	const [mapCenter, setMapCenter] = useState([53.01, 18.63]);
	const [mapTile, setMapTile] = useState("default");
	const [mapType, setMapType] = useState("2D");
	const [solarTile, setSolarTile] = useState("Roofs");
	const [skyHDR, setSkyHDR] = useState("Terrain");
	const [coords, setCoords] = useState({ lat: 53.01, lng: 18.63 });
	const [mouseAppCoords, setMouseAppCoords] = useState({ x: 0, y: 0 });
	const [searchedLocation, setSearchedLocation] = useState(null);
	const [generalLegendSeen, setGeneralLegendSeen] = useState(false);
	const [tools, setTools] = useState(["LayersManagement", "MiniMap", "Coords"]);
	const [mapBounds, setMapBounds] = useState();
	const [infoOpen, setInfoOpen] = useState(false);
	const [solarPanelDrawing, setSolarPanelDrawing] = useState(false);
	const [panelArea, setPanelArea] = useState(0);
	const [panelLocationData, setPanelLocationData] = useState({
		city: false,
		district: "",
		districtPart: "",
		building: false,
	});
	const [calculateSolarData, setCalculateSolarData] = useState(false);
	const [buildingMean, setBuildingMean] = useState(0);
	const [calculatedSolarData, setCalculatedSolarData] = useState([]);
	const [solarCalculationProgress, setSolarCalculationProgress] = useState(0);
	const [isAppLoading, setIsAppLoading] = useState(true);
	const [mapRef, setMapRef] = useState();

	const removeTool = (tool) => {
		const toolsArr = tools.filter((el) => el != tool);
		setTools(toolsArr);
	};

	const addTool = (tool) => {
		const toolArr = [...tools, tool];
		setTools(toolArr);
	};

	return (
		<MapContext.Provider
			value={{
				zoomLevel,
				setZoomLevel,
				mapTile,
				setMapTile,
				solarTile,
				setSolarTile,
				mapType,
				setMapType,
				skyHDR,
				setSkyHDR,
				coords,
				setCoords,
				mouseAppCoords,
				setMouseAppCoords,
				mapCenter,
				setMapCenter,
				searchedLocation,
				setSearchedLocation,
				generalLegendSeen,
				setGeneralLegendSeen,
				tools,
				removeTool,
				addTool,
				setTools,
				mapBounds,
				setMapBounds,
				infoOpen,
				setInfoOpen,
				solarPanelDrawing,
				setSolarPanelDrawing,
				panelArea,
				setPanelArea,
				setBuildingMean,
				buildingMean,
				panelLocationData,
				setPanelLocationData,
				calculateSolarData,
				setCalculateSolarData,
				calculatedSolarData,
				setCalculatedSolarData,
				solarCalculationProgress,
				setSolarCalculationProgress,
				isAppLoading,
				setIsAppLoading,
				mapRef,
				setMapRef,
			}}
		>
			{children}
		</MapContext.Provider>
	);
};

export { MapProvider, MapContext };
