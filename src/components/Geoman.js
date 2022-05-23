import { useEffect } from "react";
import { useLeafletContext } from "@react-leaflet/core";
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import GeoUtil from "leaflet-geometryutil";
import * as turf from "@turf/turf";

const Geoman = () => {
  const context = useLeafletContext();

  useEffect(() => {
    const leafletContainer = context.layerContainer || context.map;

    leafletContainer.pm.addControls({
      drawMarker: false,
      drawCircleMarker: false,
      drawText: false,
      cutPolygon: false,
    });

    leafletContainer.pm.setLang("pl");

    leafletContainer.pm.setGlobalOptions({ pmIgnore: false });

    leafletContainer.on("pm:create", (e) => {
      if (e.layer && e.layer.pm) {
        const shape = e;
        console.log(e);
        console.log(turf.area(e.layer.toGeoJSON()));

        // enable editing of circle
        shape.layer.pm.enable();

        // console.log(`object created: ${shape.layer.pm.getShape()}`);
        // console.log(leafletContainer.pm.getGeomanLayers(true).toGeoJSON());
        // leafletContainer.pm
        //   .getGeomanLayers(true)
        //   .bindPopup("i am whole")
        //   .openPopup();
        leafletContainer.pm.getGeomanLayers().map((layer, index) => {
          layer.bindPopup(`${turf.area(e.layer.toGeoJSON())} m2`);
        });
        leafletContainer.pm.getGeomanLayers().map((layer, index) => {
          console.log(layer);
        });
        //   .map((layer, index) => layer.showMeasurements());
        shape.layer.on("pm:edit", (e) => {
          const event = e;
          // console.log(leafletContainer.pm.getGeomanLayers(true).toGeoJSON());
        });
      }
    });

    leafletContainer.on("pm:remove", (e) => {
      //   console.log("object removed");
      // console.log(leafletContainer.pm.getGeomanLayers(true).toGeoJSON());
    });

    return () => {
      leafletContainer.pm.removeControls();
      leafletContainer.pm.setGlobalOptions({ pmIgnore: true });
    };
  }, [context]);

  return null;
};

export default Geoman;
