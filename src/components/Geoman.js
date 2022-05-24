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
        shape.layer.pm.enable();
        leafletContainer.pm.getGeomanLayers().map((layer, index) => {
          console.log(layer);
          if (e.shape === "Line") {
            layer
              .bindPopup(`${turf.length(e.layer.toGeoJSON()) * 1000} m`, {
                autoPan: false,
              })
              .openPopup();
          } else if (e.shape === "Polygon" || e.shape === "Rectangle") {
            layer
              .bindPopup(`${turf.area(e.layer.toGeoJSON())} m2`, {
                autoPan: false,
              })
              .openPopup();
          } else if (e.shape === "Circle") {
            const latlng = e.layer._latlng;
            const radius = e.layer.options.radius;
            const circle = turf.circle([latlng.lat, latlng.lng], radius);
            layer
              .bindPopup(`${turf.area(circle) / 1_000_000} m2`, {
                autoPan: false,
              })
              .openPopup();
          }
        });
        leafletContainer.pm.getGeomanLayers().map((layer, index) => {
          console.log(layer);
        });
        shape.layer.on("pm:edit", (e) => {
          if (e.shape === "Line") {
            e.layer.bindPopup(`${turf.length(e.layer.toGeoJSON()) * 1000} m`);
          } else if (e.shape === "Polygon" || e.shape === "Rectangle") {
            e.layer.bindPopup(`${turf.area(e.layer.toGeoJSON())} m2`);
          } else if (e.shape === "Circle") {
            const latlng = e.layer._latlng;
            const radius = e.layer._mRadius;
            const circle = turf.circle([latlng.lat, latlng.lng], radius);
            e.layer.bindPopup(`${turf.area(circle) / 1_000_000} m2`);
          }
        });
      }
    });

    leafletContainer.on("pm:remove", (e) => {});

    return () => {
      leafletContainer.pm.removeControls();
      leafletContainer.pm.setGlobalOptions({ pmIgnore: true });
    };
  }, [context]);

  return null;
};

export default Geoman;
