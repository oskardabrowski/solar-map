import { SiOpenstreetmap } from "react-icons/si";
import { RiMapFill } from "react-icons/ri";
import { MdInsertPhoto } from "react-icons/md";

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
			code: "stamentonerlite",
			url: "https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png",
			attribution:
				'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
			attributionCode: (
				<>
					Map tiles by <a href="http://stamen.com">Stamen Design</a>,{" "}
					<a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>{" "}
					&mdash; Map data &copy;{" "}
					<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>{" "}
					contributors
				</>
			),
			name: "Stamen Toner Lite",
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
			url: "http://localhost:8080/Tiles/Orto2021/{z}/{x}/{y}.png",
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
			url: "http://localhost:8080/Tiles/SolarRasterRoofs512/{z}/{x}/{y}.png",
			googleDrive:
				"https://nrfachowqojnxfsh6wd8qq.on.drv.tw/www.tiles/SolarRasterRoofs512/{z}/{x}/{y}.png",
			name: "Klasyfikacja dachów",
			ico: <RiMapFill className="Map-tile-desc-ico" />,
		},
		{
			code: "All",
			url: "http://localhost:8080/Tiles/SolarRasterAll256/{z}/{x}/{y}.png",
			googleDrive:
				"https://nrfachowqojnxfsh6wd8qq.on.drv.tw/www.tiles/SolarRasterAll256/{z}/{x}/{y}.png",
			name: "Klasyfikacja powierzchni",
			ico: <RiMapFill className="Map-tile-desc-ico" />,
		},
		{
			code: "GradientAll",
			url: "http://localhost:8080/Tiles/SolarRasterAllGradient256/{z}/{x}/{y}.png",
			googleDrive:
				"https://nrfachowqojnxfsh6wd8qq.on.drv.tw/www.tiles/SolarRasterAllGradient256/{z}/{x}/{y}.png",
			name: "Gradient powierzchni",
			ico: <RiMapFill className="Map-tile-desc-ico" />,
		},
		{
			code: "SkyView",
			url: "http://localhost:8080/Tiles/SkyViewMap256/{z}/{x}/{y}.png",
			googleDrive:
				"https://nrfachowqojnxfsh6wd8qq.on.drv.tw/www.tiles/SkyViewMap256/{z}/{x}/{y}.png",
			name: "Widoczność nieba",
			ico: <RiMapFill className="Map-tile-desc-ico" />,
		},
		{
			code: "Buildings",
			url: "http://localhost:8080/Tiles/ObrysBDOT/{z}/{x}/{y}.png",
			googleDrive:
				"https://nrfachowqojnxfsh6wd8qq.on.drv.tw/www.tiles/SkyViewMap256/{z}/{x}/{y}.png",
			name: "Obrysy Budynków",
			ico: <RiMapFill className="Map-tile-desc-ico" />,
		},
	],
};

export default AllMaps;

// ! https://nrfachowqojnxfsh6wd8qq.on.drv.tw/www.tiles/
