import { useEffect, useContext } from "react";
import { MapContext } from "./GlobalContext";
import { useLeafletContext } from "@react-leaflet/core";
import { TorGranice } from "./layers/TorGranice";
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import * as turf from "@turf/turf";
import swal from "sweetalert";
import L from "leaflet";

const Geoman = () => {
	const context = useLeafletContext();
	const {
		tools,
		solarPanelDrawing,
		setSolarPanelDrawing,
		setPanelArea,
		setBuildingMean,
		panelLocationData,
		setPanelLocationData,
		calculateSolarData,
		setCalculateSolarData,
	} = useContext(MapContext);
	const map = context.layerContainer || context.map;
	const layers = map.pm.getGeomanLayers();

	function CalculateSolarIrradiation() {
		const index = layers.findIndex((el) => el.SolarPanel === true);
		if (index != -1) {
			const SolarLayersList = [500, 600, 700, 800, 900, 1000, 1100, 1200, 1300];
			const panel = layers[index].toGeoJSON();
			if (panelLocationData.city === true) {
				if (panelLocationData.building === true) {
					async function getData() {
						const MeasurementsList = [];
						await SolarLayersList.forEach(async (el) => {
							const data = await fetch(
								`http://localhost:8080/Tiles/dist-parts/${panelLocationData.district}/${panelLocationData.districtPart}/${el}.json`
							);
							const response = await data.json();
							let totalArea = 0;
							if (el === 500 || el === 600) {
								// console.log(response.features[0].geometry.coordinates);
								await response.features[0].geometry.coordinates.forEach(
									async (feature) => {
										const polygon = await turf.polygon(feature);
										const result = await turf.booleanOverlap(polygon, panel);
										console.log(`${el}: ${result}`);
										if (result) {
											const section = await turf.intersect(polygon, panel);
											const area = turf.area(section);
											console.log(`Section: ${area}`);
											console.log(`Section: ${typeof area}`);
											const ElementTotalArea = MeasurementsList.filter(
												(item) => item.id === el
											);
											console.log(ElementTotalArea);
											if (ElementTotalArea.length > 0) {
												MeasurementsList.map((item) => {
													if (item.id === el) {
														const currentArea = item.area;
														const newArea = currentArea + area;
														item.area = newArea;
													}
												});
											} else {
												MeasurementsList.push({ id: el, area: area });
											}
											console.log(MeasurementsList);
										}
									}
								);
							} else {
								await response.features.forEach(async (feature) => {
									const polygon = await turf.polygon(
										feature.geometry.coordinates[0]
									);
									const result = await turf.booleanOverlap(polygon, panel);
									console.log(`${el}: ${result}`);
									if (result) {
										const section = await turf.intersect(polygon, panel);
										const area = turf.area(section);
										console.log(`Section: ${area}`);
										console.log(`Section: ${typeof area}`);
										const ElementTotalArea = MeasurementsList.filter(
											(item) => item.id === el
										);
										console.log(ElementTotalArea);
										if (ElementTotalArea.length > 0) {
											MeasurementsList.map((item) => {
												if (item.id === el) {
													const currentArea = item.area;
													const newArea = currentArea + area;
													item.area = newArea;
												}
											});
										} else {
											MeasurementsList.push({ id: el, area: area });
										}
										console.log(MeasurementsList);
									}
								});
							}
							// await MeasurementsList.push({ item: el, area: totalArea });
							// console.log(MeasurementsList);
						});
						// await console.log(MeasurementsList);
					}
					getData();
				} else {
					swal(
						"Analiza może przebiegać tylko wewnątrz pojedynczego budynku!",
						"Narysuj panel w obrębie jednego budynku",
						"error"
					);
				}
			} else {
				swal(
					"Twój panel znajduje się poza miastem!",
					"Narysuj go w obrębie budynku wewnątrz Torunia",
					"error"
				);
			}
		} else {
		}
		setCalculateSolarData(false);
	}

	useEffect(() => {
		if (calculateSolarData === true) {
			CalculateSolarIrradiation();
		}
	}, [calculateSolarData]);

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

	async function IdentifyRoof(layer) {
		let cityPart = "",
			districtPart = "",
			SearchedBuilding = "";
		const collection = await fetch("./JSON/cityParts.json");
		const data = await collection.json();
		const borders = turf.polygon(
			TorGranice.features[0].geometry.coordinates[0]
		);
		const geoLayer = layer.toGeoJSON();
		const isInBorders = await turf.booleanContains(borders, geoLayer);
		const checkIsInBorders = async () => {
			if (isInBorders) {
				await data.features.forEach(async (feature) => {
					const polygon = turf.polygon(feature.geometry.coordinates[0]);
					const result = await turf.booleanContains(polygon, geoLayer);
					const part = feature.properties.Dzielnica;
					if (result) {
						cityPart = part;
					}
				});
				await checkDistrict();
			} else {
				swal(
					"Twój panel znajduje się poza miastem!",
					"Narysuj go w obrębie budynku wewnątrz Torunia",
					"error"
				);
				cityPart = "";
				districtPart = "";
				SearchedBuilding = "";
				setPanelLocationData({
					city: false,
					district: cityPart,
					districtPart: districtPart,
					building: false,
				});
			}
		};

		const checkDistrict = async () => {
			if (cityPart.length === 0) {
				swal(
					"Twój panel jest zbyt duży!",
					"Narysuj go w obrębie budynku",
					"error"
				);
				districtPart = "";
				SearchedBuilding = "";
				setPanelLocationData({
					city: true,
					district: cityPart,
					districtPart: districtPart,
					building: false,
				});
			} else {
				const collection = await fetch(`./JSON/district/${cityPart}.json`);
				const data = await collection.json();
				await data.features.forEach(async (feature) => {
					const polygon = turf.polygon(feature.geometry.coordinates[0]);
					const result = await turf.booleanContains(polygon, geoLayer);
					const part = feature.properties.Symbol;
					if (result) {
						districtPart = part;
					}
				});
				await checkBuilding();
			}
		};

		const checkBuilding = async () => {
			if (districtPart.length === 0) {
				swal(
					"Twój panel jest zbyt duży!",
					"Narysuj go w obrębie budynku",
					"error"
				);
			} else {
				const collection = await fetch(
					`http://localhost:8080/Tiles/dist-parts/${districtPart}.json`
				);
				const data = await collection.json();
				await data.features.forEach(async (feature) => {
					const polygon = turf.polygon(feature.geometry.coordinates[0]);
					const result = await turf.booleanContains(polygon, geoLayer);
					const buildingFromGeoJSON = feature.properties.gml_id;
					if (result) {
						SearchedBuilding = buildingFromGeoJSON;
						setBuildingMean(feature.properties._mean);
						setPanelLocationData({
							city: true,
							district: cityPart,
							districtPart: districtPart,
							building: true,
						});
					}
				});
				await AlertWhenPanelIsOutside();
			}
		};

		const AlertWhenPanelIsOutside = () => {
			if (SearchedBuilding.length === 0) {
				swal(
					"Twój panel nie znajduje się w obrębie budynku!",
					"Narysuj go w obrębie budynku lub edytuj",
					"error"
				);
				setBuildingMean(0);
				setPanelLocationData({
					city: true,
					district: cityPart,
					districtPart: districtPart,
					building: false,
				});
				SearchedBuilding = "";
			}
		};

		if (layer.SolarPanel === true) {
			await checkIsInBorders();
		}
	}

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

		map.on("pm:create", function (e) {
			IdentifyRoof(e.layer);
			e.layer.on("pm:edit", function (e) {
				IdentifyRoof(e.layer);
			});
		});
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
