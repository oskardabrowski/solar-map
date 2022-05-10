import React, { createContext, useContext, useState } from "react";

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
  const [tools, setTools] = useState(["LayersManagement"]);

  const removeTool = (tool) => {
    const toolsArr = tools.filter((el) => el != tool);
    setTools(toolsArr);
    console.log(tools);
  };

  const addTool = (tool) => {
    const toolArr = [...tools, tool];
    setTools(toolArr);
    console.log(tools);
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
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export { MapProvider, MapContext };
