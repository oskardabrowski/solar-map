import { useEffect, useContext } from "react";
import { MapContext } from "./GlobalContext";
import { useLeafletContext } from "@react-leaflet/core";
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import * as turf from "@turf/turf";
import L from "leaflet";

const Geoman = () => {
  const context = useLeafletContext();
  const { tools, solarPanelDrawing, setSolarPanelDrawing, setPanelArea } =
    useContext(MapContext);
  const map = context.layerContainer || context.map;
  const layers = map.pm.getGeomanLayers();

  useEffect(() => {
    const arr = [];
    map.pm.getGeomanLayers().forEach((layer) => {
      if (layer.SolarPanel === true) {
        layer.setStyle({ color: "lime", fillColor: "lime", fillOpacity: "1" });
        if (layer.pm._shape !== "Polygon") {
          map.removeLayer(layer);
        } else {
          arr.push(layer);
        }
      }
      if (arr.length > 1) {
        map.removeLayer(arr[0]);
      }
    });
    map.pm.getGeomanLayers().forEach((layer) => {
      if (layer.SolarPanel === true) {
        const area = turf.area(layer.toGeoJSON());
        setPanelArea(area);
      }
    });
  }, [map.pm.getGeomanLayers()]);

  map.on("pm:create", function (e) {
    e.layer.showMeasurements();
    e.layer.SolarPanel = solarPanelDrawing;

    setSolarPanelDrawing(false);
  });
  map.on("pm:drawend", function (e) {
    setSolarPanelDrawing(false);
  });

  useEffect(() => {
    if (!tools.includes("DrawTools")) {
      map.pm.getGeomanLayers().forEach((layer) => {
        if (
          !layer.hasOwnProperty("defaultOptions") &&
          layer.SolarPanel !== true
        ) {
          map.removeLayer(layer);
        }
      });
    }
    // else if (!tools.includes("DrawTools")) {
    //   map.pm.getGeomanLayers().forEach((layer) => {
    //     if (
    //       layer.SolarPanel === true
    //     ) {
    //       map.removeLayer(layer);
    //     }
    //   });
    // }
  }, [tools]);

  useEffect(() => {
    map.pm.addControls({
      drawMarker: false,
      drawCircleMarker: false,
      drawText: false,
      cutPolygon: false,
    });

    map.pm.setLang("pl");

    map.pm.setGlobalOptions({ pmIgnore: false });

    map.pm.getGeomanLayers().forEach((el) => {
      if (el.hasOwnProperty("defaultOptions")) {
        el.setStyle({ pmIgnore: true });
      }
    });

    map.pm.Draw.getShapes();

    map.pm.disableDraw("Poly");

    map.on("pm:drawstart", function (e) {});

    map.on("pm:remove", (e) => {});

    return () => {
      map.pm.removeControls();
      map.pm.setGlobalOptions({ pmIgnore: true });
    };
  }, [context]);

  return null;
};

export default Geoman;
