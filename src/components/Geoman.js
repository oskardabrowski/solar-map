import { useEffect, useContext } from "react";
import { MapContext } from "./GlobalContext";
import { useLeafletContext } from "@react-leaflet/core";
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import * as turf from "@turf/turf";

const Geoman = () => {
  const context = useLeafletContext();
  const { tools } = useContext(MapContext);

  useEffect(() => {
    const leafletContainer = context.layerContainer || context.map;
    if (!tools.includes("DrawTools")) {
      leafletContainer.pm.getGeomanLayers().forEach((layer) => {
        leafletContainer.removeLayer(layer);
      });
    }
  }, [tools]);

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
          if (e.shape === "Line") {
            layer
              .bindPopup(
                `${(turf.length(e.layer.toGeoJSON()) * 1000).toFixed(2)} m`,
                {
                  autoPan: false,
                }
              )
              .openPopup();
          } else if (e.shape === "Polygon" || e.shape === "Rectangle") {
            layer
              .bindPopup(`${turf.area(e.layer.toGeoJSON()).toFixed(2)} m2`, {
                autoPan: false,
              })
              .openPopup();
          } else if (e.shape === "Circle") {
            const latlng = e.layer._latlng;
            const radius = e.layer.options.radius;
            const circle = turf.circle([latlng.lat, latlng.lng], radius);
            layer
              .bindPopup(`${(turf.area(circle) / 1_000_000).toFixed(2)} m2`, {
                autoPan: false,
              })
              .openPopup();
          }
        });
        leafletContainer.pm.getGeomanLayers().map((layer, index) => {});
        shape.layer.on("pm:edit", (e) => {
          if (e.shape === "Line") {
            e.layer.bindPopup(
              `${(turf.length(e.layer.toGeoJSON()) * 1000).toFixed(2)} m`,
              {
                autoPan: false,
              }
            );
          } else if (e.shape === "Polygon" || e.shape === "Rectangle") {
            e.layer.bindPopup(
              `${turf.area(e.layer.toGeoJSON()).toFixed(2)} m2`,
              {
                autoPan: false,
              }
            );
          } else if (e.shape === "Circle") {
            const latlng = e.layer._latlng;
            const radius = e.layer._mRadius;
            const circle = turf.circle([latlng.lat, latlng.lng], radius);
            e.layer.bindPopup(
              `${(turf.area(circle) / 1_000_000).toFixed(2)} m2`,
              {
                autoPan: false,
              }
            );
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
