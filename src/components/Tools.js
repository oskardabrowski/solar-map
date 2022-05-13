import React, { useContext } from "react";
import LayersManagment from "./LayersManagment";
import { MapContext } from "./GlobalContext";
import MiniMap from "./MiniMap";

const Tools = () => {
  const { tools } = useContext(MapContext);
  return (
    <>
      {tools.includes("LayersManagement") && <LayersManagment />}
      {tools.includes("MiniMap") && <MiniMap />}
    </>
  );
};

export default Tools;
