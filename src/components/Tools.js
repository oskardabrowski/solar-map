import React, { useContext } from "react";
import LayersManagment from "./LayersManagment";
import { MapContext } from "./GlobalContext";
import MiniMap from "./MiniMap";
import DrawMeasurement from "./DrawMeasurement";
import InfoWindow from "./InfoWindow";

const Tools = () => {
  const { tools, infoOpen } = useContext(MapContext);
  return (
    <>
      {tools.includes("LayersManagement") && <LayersManagment />}
      {tools.includes("MiniMap") && <MiniMap />}
      {tools.includes("DrawTools") && <DrawMeasurement />}
      {infoOpen === true && <InfoWindow />}
    </>
  );
};

export default Tools;
