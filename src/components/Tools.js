import React, { useContext } from "react";
import LayersManagment from "./LayersManagment";
import { MapContext } from "./GlobalContext";

const Tools = () => {
  const { tools } = useContext(MapContext);
  return <>{tools.includes("LayersManagement") && <LayersManagment />}</>;
};

export default Tools;
