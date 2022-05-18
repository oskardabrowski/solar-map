import React, { useContext } from "react";
import LayersManagment from "./LayersManagment";
import { MapContext } from "./GlobalContext";
import MiniMap from "./MiniMap";
import DrawMeasurement from "./DrawMeasurement";

const Tools = () => {
  const { tools } = useContext(MapContext);
  return (
    <>
      {tools.includes("LayersManagement") && <LayersManagment />}
      {tools.includes("MiniMap") && <MiniMap />}
      <DrawMeasurement />
    </>
  );
};

export default Tools;
