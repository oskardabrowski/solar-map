import { useEffect, useContext } from "react";
import { MapContext } from "./GlobalContext";
import { useLeafletContext } from "@react-leaflet/core";
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
// import "leaflet.pm";
// import "leaflet.pm/dist/leaflet.pm.css";
// import "leaflet.pm-measure-path";
// import "leaflet.pm-measure-path/dist/leaflet.pm-measure-path.css";
import * as turf from "@turf/turf";
import L from "leaflet";

const Geoman = () => {
  const context = useLeafletContext();
  const { tools } = useContext(MapContext);
  const map = context.layerContainer || context.map;

  useEffect(() => {
    if (!tools.includes("DrawTools")) {
      map.pm.getGeomanLayers().forEach((layer) => {
        if (!layer.hasOwnProperty("defaultOptions")) {
          map.removeLayer(layer);
        } else {
          if (!layer.defaultOptions.hasOwnProperty("blocked")) {
            map.removeLayer(layer);
          }
        }
      });
    }
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

    map.on("pm:drawend", function (e) {});

    map.on("pm:create", function (e) {
      e.layer.showMeasurements();
      console.log(e.layer);
      // e.layer.setStyle({ color: "green" });

      e.layer.on("pm:edit", function (x) {});
    });

    map.on("pm:create", (e) => {
      // e.layer.showMeasurements();
      // if (e.layer && e.layer.pm) {
      //   const shape = e;
      //   // shape.layer.pm.enable();
      //   shape.layer.showMeasurements();
      //   console.log(shape.layer);
      //   console.log(leafletContainer.pm.getGeomanLayers());
      //   // leafletContainer.each;
      //   leafletContainer.pm.getGeomanLayers().map((layer, index) => {
      //     // layer.showMeasurements();
      //     // console.log(layer);
      //     if (e.shape === "Line") {
      //       // layer.showMeasurements();
      //     } else if (e.shape === "Polygon" || e.shape === "Rectangle") {
      //       layer
      //         .bindPopup(
      //           `${turf.area(e.layer.toGeoJSON()).toFixed(2)} m${"2".sup()}`,
      //           {
      //             autoPan: false,
      //           }
      //         )
      //         .openPopup();
      //       // .showMeasurements();
      //       layer.eachLayer(function (lr) {
      //         lr.showMeasurements();
      //       });
      //     } else if (e.shape === "Circle") {
      //       const latlng = e.layer._latlng;
      //       const radius = e.layer.options.radius;
      //       const circle = turf.circle([latlng.lat, latlng.lng], radius);
      //       layer
      //         .bindPopup(
      //           `${(turf.area(circle) / 1_000_000).toFixed(2)} m${"2".sup()}`,
      //           {
      //             autoPan: false,
      //           }
      //         )
      //         .openPopup();
      //       // .showMeasurements();
      //     }
      //   });
      //   // leafletContainer.pm.getGeomanLayers().map((layer, index) => {});
      //   shape.layer.on("pm:edit", (e) => {
      //     // if (e.shape === "Line") {
      //     //   e.layer.bindPopup(
      //     //     `${(turf.length(e.layer.toGeoJSON()) * 1000).toFixed(2)} m`,
      //     //     {
      //     //       autoPan: false,
      //     //     }
      //     //   );
      //     // } else if (e.shape === "Polygon" || e.shape === "Rectangle") {
      //     //   e.layer.bindPopup(
      //     //     `${turf.area(e.layer.toGeoJSON()).toFixed(2)} m2`,
      //     //     {
      //     //       autoPan: false,
      //     //     }
      //     //   );
      //     // } else if (e.shape === "Circle") {
      //     //   const latlng = e.layer._latlng;
      //     //   const radius = e.layer._mRadius;
      //     //   const circle = turf.circle([latlng.lat, latlng.lng], radius);
      //     //   e.layer.bindPopup(
      //     //     `${(turf.area(circle) / 1_000_000).toFixed(2)} m2`,
      //     //     {
      //     //       autoPan: false,
      //     //     }
      //     //   );
      //     // }
      //   });
      // }
    });

    map.on("pm:remove", (e) => {});

    return () => {
      map.pm.removeControls();
      map.pm.setGlobalOptions({ pmIgnore: true });
    };
  }, [context]);

  return null;
};

export default Geoman;
