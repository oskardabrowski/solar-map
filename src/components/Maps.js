import { SiOpenstreetmap } from "react-icons/si";
import { RiMapFill } from "react-icons/ri";
import { MdInsertPhoto } from "react-icons/md";

export const devMode = true;

const AllMaps = {
	baseMaps: [
		{
			code: "default",
			url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
			attribution:
				'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
			attributionCode: (
				<>
					&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>{" "}
					contributors
				</>
			),
			name: "Open Street Map",
			ico: <SiOpenstreetmap className="Map-tile-desc-ico" />,
		},
		{
			code: "frhot",
			url: "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>',
			attributionCode: (
				<>
					&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>{" "}
					contributors, Tiles style by{" "}
					<a href="https://www.hotosm.org/" target="_blank">
						Humanitarian OpenStreetMap Team
					</a>{" "}
					hosted by{" "}
					<a href="https://openstreetmap.fr/" target="_blank">
						OpenStreetMap France
					</a>
				</>
			),
			name: "Open Street Map HOT",
			ico: <SiOpenstreetmap className="Map-tile-desc-ico" />,
		},
		{
			code: "topo",
			url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
			attribution:
				'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
			attributionCode: (
				<>
					Map data: &copy;{" "}
					<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>{" "}
					contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map
					style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (
					<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>
					)
				</>
			),
			name: "Open Topo Map",
			ico: <SiOpenstreetmap className="Map-tile-desc-ico" />,
		},
		{
			code: "cartodbdark",
			url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
			attributionCode: (
				<>
					&copy;{" "}
					<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>{" "}
					contributors &copy; <a href="https://carto.com/attributions">CARTO</a>
				</>
			),
			name: "Carto DB Dark",
			ico: <RiMapFill className="Map-tile-desc-ico" />,
		},
		{
			code: "cartodbvoyager",
			url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
			attributionCode: (
				<>
					&copy;{" "}
					<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>{" "}
					contributors &copy; <a href="https://carto.com/attributions">CARTO</a>
				</>
			),
			name: "Carto DB Voyager",
			ico: <RiMapFill className="Map-tile-desc-ico" />,
		},
		{
			code: "cartodbpositron",
			url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
			attributionCode: (
				<>
					&copy;{" "}
					<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>{" "}
					contributors &copy; <a href="https://carto.com/attributions">CARTO</a>
				</>
			),
			name: "Carto DB Positron",
			ico: <RiMapFill className="Map-tile-desc-ico" />,
		},
		{
			code: "esriworldimagery",
			url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
			attribution:
				"Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
			attributionCode: (
				<>
					Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX,
					GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User
					Community
				</>
			),
			name: "Esri World Imagery",
			ico: <MdInsertPhoto className="Map-tile-desc-ico" />,
		},
		{
			code: "orto2021",
			url: "https://09autzsln5kxbytjc1nntg.on.drv.tw/www.tiles2/Orto2021/{z}/{x}/{y}.png",
			devUrl: "http://localhost:8080/Tiles/Orto2021/{z}/{x}/{y}.png",
			attribution:
				"&copy; <a href='https://www.geoportal.gov.pl/'>geoportal.gov.pl</a>",
			attributionCode: (
				<>
					&copy; <a href="https://www.geoportal.gov.pl/">geoportal.gov.pl</a>
				</>
			),
			name: "Ortofotomapa 2021",
			ico: <MdInsertPhoto className="Map-tile-desc-ico" />,
		},
	],
	layers: [
		{
			code: "Roofs",
			url: "https://nrfachowqojnxfsh6wd8qq.on.drv.tw/www.tiles/SolarRasterRoofs512/{z}/{x}/{y}.png",
			devUrl: "http://localhost:8080/Tiles/SolarRasterRoofs512/{z}/{x}/{y}.png",
			name: "Klasyfikacja dachów",
			ico: <RiMapFill className="Map-tile-desc-ico" />,
		},
		{
			code: "All",
			url: "https://nrfachowqojnxfsh6wd8qq.on.drv.tw/www.tiles/SolarRasterAll256/{z}/{x}/{y}.png",
			devUrl: "http://localhost:8080/Tiles/SolarRasterAll256/{z}/{x}/{y}.png",
			name: "Klasyfikacja powierzchni",
			ico: <RiMapFill className="Map-tile-desc-ico" />,
		},
		{
			code: "GradientAll",
			url: "https://nrfachowqojnxfsh6wd8qq.on.drv.tw/www.tiles/SolarRasterAllGradient256/{z}/{x}/{y}.png",
			devUrl:
				"http://localhost:8080/Tiles/SolarRasterAllGradient256/{z}/{x}/{y}.png",
			name: "Gradient powierzchni",
			ico: <RiMapFill className="Map-tile-desc-ico" />,
		},
		{
			code: "SkyView",
			url: "https://nrfachowqojnxfsh6wd8qq.on.drv.tw/www.tiles/SkyViewMap256/{z}/{x}/{y}.png",
			devUrl: "http://localhost:8080/Tiles/SkyViewMap256/{z}/{x}/{y}.png",
			name: "Widoczność nieba",
			ico: <RiMapFill className="Map-tile-desc-ico" />,
		},
		{
			code: "Buildings",
			url: "https://09autzsln5kxbytjc1nntg.on.drv.tw/www.tiles2/ObrysBDOT/{z}/{x}/{y}.png",
			devUrl: "http://localhost:8080/Tiles/ObrysBDOT/{z}/{x}/{y}.png",
			name: "Obrysy Budynków",
			ico: <RiMapFill className="Map-tile-desc-ico" />,
		},
	],
	models: [
		{
			url: "https://09autzsln5kxbytjc1nntg.on.drv.tw/www.tiles2/GLTF/CityGltfTile1_Map.gltf",
			devUrl: "http://localhost:8080/Tiles/GLTF/CityGltfTile1_Map.gltf",
			position: [0, 0, 0],
			scale: 1,
		},
		{
			url: "https://09autzsln5kxbytjc1nntg.on.drv.tw/www.tiles2/GLTF/CityGltfTile2_Map.gltf",
			devUrl: "http://localhost:8080/Tiles/GLTF/CityGltfTile2_Map.gltf",
			position: [-26.425, -0.0, 0.29],
			scale: 0.943,
		},
		{
			url: "https://09autzsln5kxbytjc1nntg.on.drv.tw/www.tiles2/GLTF/CityGltfTile3_Map.gltf",
			devUrl: "http://localhost:8080/Tiles/GLTF/CityGltfTile3_Map.gltf",
			position: [39.44, -1.11, 0.4],
			scale: 0.955,
		},
		{
			url: "https://09autzsln5kxbytjc1nntg.on.drv.tw/www.tiles2/GLTF/CityGltfTile4_Map.gltf",
			devUrl: "http://localhost:8080/Tiles/GLTF/CityGltfTile4_Map.gltf",
			position: [0.75, -0.1625, -45.9],
			scale: 1.045,
		},
		{
			url: "https://09autzsln5kxbytjc1nntg.on.drv.tw/www.tiles2/GLTF/CityGltfTile5_Map.gltf",
			devUrl: "http://localhost:8080/Tiles/GLTF/CityGltfTile5_Map.gltf",
			position: [3.25, 0.1005, 47],
			scale: 1,
		},
		{
			url: "https://09autzsln5kxbytjc1nntg.on.drv.tw/www.tiles2/GLTF/CityGltfTile6_Map.gltf",
			devUrl: "http://localhost:8080/Tiles/GLTF/CityGltfTile6_Map.gltf",
			position: [-66.8, -0.02, -46.45],
			scale: 0.8935,
		},
		{
			url: "https://09autzsln5kxbytjc1nntg.on.drv.tw/www.tiles2/GLTF/CityGltfTile7_Map.gltf",
			devUrl: "http://localhost:8080/Tiles/GLTF/CityGltfTile7_Map.gltf",
			position: [57.5, -0.15, -46.81],
			scale: 0.895,
		},
		{
			url: "https://09autzsln5kxbytjc1nntg.on.drv.tw/www.tiles2/GLTF/CityGltfTile8_Map.gltf",
			devUrl: "http://localhost:8080/Tiles/GLTF/CityGltfTile8_Map.gltf",
			position: [53, 0.08, 44.95],
			scale: 0.78,
		},
		{
			url: "https://09autzsln5kxbytjc1nntg.on.drv.tw/www.tiles2/GLTF/CityGltfTile9_Map.gltf",
			devUrl: "http://localhost:8080/Tiles/GLTF/CityGltfTile9_Map.gltf",
			position: [-65.8, -0.10001, 47.1],
			scale: 0.9025,
		},
		{
			url: "https://09autzsln5kxbytjc1nntg.on.drv.tw/www.tiles2/GLTF/CityGltfTile10_Map.gltf",
			devUrl: "http://localhost:8080/Tiles/GLTF/CityGltfTile10_Map.gltf",
			position: [-8.65, 0.1, 95.25],
			scale: 0.9025,
		},
		{
			url: "https://09autzsln5kxbytjc1nntg.on.drv.tw/www.tiles2/GLTF/CityGltfTile11_Map.gltf",
			devUrl: "http://localhost:8080/Tiles/GLTF/CityGltfTile11_Map.gltf",
			position: [-38.5, 0.11, 95],
			scale: 0.85,
		},
		{
			url: "https://09autzsln5kxbytjc1nntg.on.drv.tw/www.tiles2/GLTF/CityGltfTile12_Map.gltf",
			devUrl: "http://localhost:8080/Tiles/GLTF/CityGltfTile12_Map.gltf",
			position: [-111.5, 0.11, 94.7],
			scale: 0.905,
		},
		{
			url: "https://09autzsln5kxbytjc1nntg.on.drv.tw/www.tiles2/GLTF/CityGltfTile13_Map.gltf",
			devUrl: "http://localhost:8080/Tiles/GLTF/CityGltfTile13_Map.gltf",
			position: [-102.15, -0.78, 47],
			scale: 0.895,
		},
		{
			url: "https://09autzsln5kxbytjc1nntg.on.drv.tw/www.tiles2/GLTF/CityGltfTile14_Map.gltf",
			devUrl: "http://localhost:8080/Tiles/GLTF/CityGltfTile14_Map.gltf",
			position: [99.7, 0.075, 47.5],
			scale: 0.895,
		},
		{
			url: "https://09autzsln5kxbytjc1nntg.on.drv.tw/www.tiles2/GLTF/CityGltfTile15_Map.gltf",
			devUrl: "http://localhost:8080/Tiles/GLTF/CityGltfTile15_Map.gltf",
			position: [-102.15, -0.78, 47],
			scale: 0.895,
		},
	],
};

export default AllMaps;

// ! https://nrfachowqojnxfsh6wd8qq.on.drv.tw/www.tiles/
