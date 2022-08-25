import React, {
	useState,
	useRef,
	useEffect,
	useContext,
	Component,
	Suspense,
} from "react";
import { useLeafletContext } from "@react-leaflet/core";
import {
	MapContainer,
	TileLayer,
	GeoJSON,
	useMapEvents,
	useMap,
	Marker,
	FeatureGroup,
	Rectangle,
	CircleMarker,
	Popup,
} from "react-leaflet";
import styled from "styled-components";
import { TorBufor } from "../components/layers/TorBufor";
import { TorGranice } from "../components/layers/TorGranice";
import { MapContext } from "../components/GlobalContext";
import AllMaps from "../components/Maps";
import L from "leaflet";
import { useSelector } from "react-redux";
import Geoman from "../components/Geoman";
import EndFetchingData from "../components/EndFetchingData";
import { SimpleMapScreenshoter } from "leaflet-simple-map-screenshoter";
import { devMode } from "../components/Maps";

function GetIcon(_iconSize) {
	return L.icon({
		iconUrl: require("../images/pin3.png"),
		iconSize: [50, 85],
		iconAnchor: [25, 85],
	});
}
const snapshotOptions = {
	hideElementsWithSelectors: [],
	hidden: true,
};

const screenshotter = new SimpleMapScreenshoter(snapshotOptions);

function MapEventsComponent() {
	const {
		setZoomLevel,
		setCoords,
		setMapCenter,
		searchedLocation,
		setMapBounds,
		setMapRef,
		takeScreen,
	} = useContext(MapContext);
	const map = useMap();
	const context = useLeafletContext();

	useEffect(() => {
		if (map) {
			screenshotter.addTo(map);
			setMapRef(map);
		}
	}, [map]);

	useEffect(() => {
		if (takeScreen == true) {
			takeScreenShot();
		}
	}, [takeScreen]);

	const takeScreenShot = () => {
		screenshotter.takeScreen("image").then((image) => {
			var img = new Image();

			img.onload = () => {
				const canvas = document.createElement("canvas");
				const ctx = canvas.getContext("2d");
				canvas.width = 420;
				canvas.height = 594;
				canvas.style.background = "skyblue";
				ctx.drawImage(
					img,
					window.innerWidth / 2 - 210,
					window.innerHeight / 2 - 320,
					420,
					594,
					0,
					0,
					420,
					594
				);

				var imageurl = canvas.toDataURL("image/png");
				const resultantImage = new Image();
				resultantImage.style = "border: 1px solid black";
				resultantImage.src = imageurl;
				document.querySelector(".MapCanvasContainer").appendChild(canvas);
			};
			img.src = image;
		});
	};

	useEffect(() => {
		if (searchedLocation !== null) {
			const { shapeY, shapeX } = searchedLocation;
			map.flyTo([shapeY, shapeX], 19);
		}
	}, [searchedLocation]);

	const mapEvents = useMapEvents({
		zoomend: (e) => {
			setZoomLevel(mapEvents.getZoom());
			const centerMapCoords = e.target.getCenter();
			const MapBounds = e.target.getBounds();
			setMapCenter(centerMapCoords);
			setMapBounds(MapBounds);
		},
		mousemove(e) {
			setCoords(e.latlng);
		},
		dragend: (e) => {
			const centerMapCoords = e.target.getCenter();
			const MapBounds = e.target.getBounds();
			setMapCenter(centerMapCoords);
			setMapBounds(MapBounds);
		},
	});

	return null;
}

const DisableEdit = () => {
	const AllLayersDisabled = document.querySelectorAll(".DisabledGEOJSON");
	AllLayersDisabled.forEach((el) => {
		el.editing.disable();
	});
};
DisableEdit();

export default function Map() {
	const { mapTile, searchedLocation } = useContext(MapContext);
	const layers = useSelector((state) => state.layers.array);
	const arrExists = layers.map((el) => el.code);
	const MapRef = useRef();
	const [thisMap, setThisMap] = useState(null);

	return (
		<MapStyles id="MapContainer">
			<MapContainer
				className={`flatmap`}
				center={[53.01, 18.63]}
				zoom={12}
				maxZoom={25}
				minZoom={12}
				ref={MapRef}
				maxBounds={[
					[52.93, 18.35],
					[53.1, 18.9],
				]}
				id="generalMap"
				whenCreated={(map) => setThisMap({ map })}
			>
				<Suspense fallback={null}>
					<EndFetchingData />
					<FeatureGroup>
						<GeoJSON
							className="TorBufor DisabledGEOJSON"
							data={TorBufor}
							onClick={(e) => e.preventDefault()}
							blocked={true}
						/>
						<GeoJSON
							className="TorGranice DisabledGEOJSON"
							data={TorGranice}
							onClick={(e) => e.preventDefault()}
							blocked={true}
						/>
					</FeatureGroup>

					<MapEventsComponent />
					<Geoman />
					{searchedLocation != null && (
						<Marker
							icon={GetIcon()}
							position={[searchedLocation.shapeY, searchedLocation.shapeX]}
						></Marker>
					)}
					{devMode === false && (
						<>
							{AllMaps.layers.map((map, index) => (
								<>
									{arrExists.includes(map.code) && (
										<TileLayer
											key={index}
											url={map.url}
											zIndex={10000 + arrExists.indexOf(map.code)}
											minZoom={1}
											maxZoom={28}
											minNativeZoom={0}
											maxNativeZoom={19}
										/>
									)}
								</>
							))}
						</>
					)}
					{devMode === true && (
						<>
							{AllMaps.layers.map((map, index) => (
								<>
									{arrExists.includes(map.code) && (
										<TileLayer
											key={index}
											url={map.devUrl}
											zIndex={10000 + arrExists.indexOf(map.code)}
											minZoom={1}
											maxZoom={28}
											minNativeZoom={0}
											maxNativeZoom={19}
										/>
									)}
								</>
							))}
						</>
					)}
				</Suspense>
				{AllMaps.baseMaps.map((map, index) => (
					<>
						{mapTile === map.code && (
							<TileLayer
								key={index}
								url={map.url}
								attribution={map.attribution}
								minZoom={1}
								maxZoom={28}
								minNativeZoom={0}
								maxNativeZoom={19}
							/>
						)}
					</>
				))}
			</MapContainer>
		</MapStyles>
	);
}

const MapStyles = styled.div`
	height: 100%;
	width: 100%;
	.flatmap {
		height: 100%;
		min-height: 90vh;
		cursor: -webkit-grab;
		cursor: grab;

		&:active {
			cursor: -webkit-grabbing;
			cursor: grabbing;
		}
	}

	.whileEdit {
		&:hover {
			cursor: crosshair !important;
		}
	}

	.CreatingShapeCursor {
		&:hover {
			cursor: crosshair !important;
		}
		&:active {
			cursor: crosshair !important;
		}
	}

	.TorBufor {
		color: white;
		fill: white;
		fill-opacity: 0.55;
		stroke: none;

		&:hover {
			cursor: context-menu;
		}
	}

	.TorGranice {
		color: black;
		fill: none;
		stroke: black;
		stroke-width: 2.5px;
		&:hover {
			cursor: context-menu;
		}
	}

	.leaflet-pane,
	.leaflet-tile,
	.leaflet-marker-icon,
	.leaflet-marker-shadow,
	.leaflet-tile-container,
	.leaflet-map-pane svg,
	.leaflet-map-pane canvas,
	.leaflet-zoom-box,
	.leaflet-image-layer,
	.leaflet-layer {
		position: absolute;
		left: 0;
		top: 0;
	}
	.leaflet-container {
		overflow: hidden;
	}
	.leaflet-tile,
	.leaflet-marker-icon,
	.leaflet-marker-shadow {
		-webkit-user-select: none;
		-moz-user-select: none;
		user-select: none;
		-webkit-user-drag: none;
	}
	.leaflet-safari .leaflet-tile {
		image-rendering: -webkit-optimize-contrast;
	}
	.leaflet-safari .leaflet-tile-container {
		width: 1600px;
		height: 1600px;
		-webkit-transform-origin: 0 0;
	}
	.leaflet-marker-icon,
	.leaflet-marker-shadow {
		display: block;
	}
	.leaflet-container .leaflet-overlay-pane svg,
	.leaflet-container .leaflet-marker-pane img,
	.leaflet-container .leaflet-tile-pane img,
	.leaflet-container img.leaflet-image-layer {
		max-width: none !important;
	}

	.leaflet-container.leaflet-touch-zoom {
		-ms-touch-action: pan-x pan-y;
		touch-action: pan-x pan-y;
	}
	.leaflet-container.leaflet-touch-drag {
		-ms-touch-action: pinch-zoom;
	}
	.leaflet-container.leaflet-touch-drag.leaflet-touch-drag {
		-ms-touch-action: none;
		touch-action: none;
	}
	.leaflet-tile {
		filter: inherit;
		visibility: hidden;
	}
	.leaflet-tile-loaded {
		visibility: inherit;
	}
	.leaflet-zoom-box {
		width: 0;
		height: 0;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		z-index: 800;
	}
	.leaflet-overlay-pane svg {
		-moz-user-select: none;
	}

	.leaflet-pane {
		z-index: 400;
	}

	.leaflet-tile-pane {
		z-index: 200;
	}
	.leaflet-overlay-pane {
		z-index: 400;
	}
	.leaflet-shadow-pane {
		z-index: 500;
	}
	.leaflet-marker-pane {
		z-index: 600;
	}
	.leaflet-tooltip-pane {
		z-index: 650;
	}
	.leaflet-popup-pane {
		z-index: 700;
	}

	.leaflet-map-pane canvas {
		z-index: 100;
	}
	.leaflet-map-pane svg {
		z-index: 200;
	}

	.leaflet-vml-shape {
		width: 1px;
		height: 1px;
	}
	.lvml {
		behavior: url(#default#VML);
		display: inline-block;
		position: absolute;
	}

	.leaflet-control {
		position: relative;
		z-index: 800;
		pointer-events: visiblePainted;
		pointer-events: auto;
	}
	.leaflet-top,
	.leaflet-bottom {
		position: absolute;
		z-index: 1000;
		pointer-events: none;
	}
	.leaflet-top {
		top: 0;
	}
	.leaflet-right {
		right: 0;
	}
	.leaflet-bottom {
		bottom: 0;
	}
	.leaflet-left {
		left: 0;
	}
	.leaflet-control {
		float: left;
		clear: both;
	}
	.leaflet-right .leaflet-control {
		float: right;
	}
	.leaflet-top .leaflet-control {
		margin-top: 10px;
	}
	.leaflet-bottom .leaflet-control {
		margin-bottom: 10px;
	}
	.leaflet-left .leaflet-control {
		margin-left: 10px;
	}
	.leaflet-right .leaflet-control {
		margin-right: 10px;
	}

	.leaflet-fade-anim .leaflet-tile {
		will-change: opacity;
	}
	.leaflet-fade-anim .leaflet-popup {
		opacity: 0;
		-webkit-transition: opacity 0.2s linear;
		-moz-transition: opacity 0.2s linear;
		-o-transition: opacity 0.2s linear;
		transition: opacity 0.2s linear;
	}
	.leaflet-fade-anim .leaflet-map-pane .leaflet-popup {
		opacity: 1;
	}
	.leaflet-zoom-animated {
		-webkit-transform-origin: 0 0;
		-ms-transform-origin: 0 0;
		transform-origin: 0 0;
	}
	.leaflet-zoom-anim .leaflet-zoom-animated {
		will-change: transform;
	}
	.leaflet-zoom-anim .leaflet-zoom-animated {
		-webkit-transition: -webkit-transform 0.25s cubic-bezier(0, 0, 0.25, 1);
		-moz-transition: -moz-transform 0.25s cubic-bezier(0, 0, 0.25, 1);
		-o-transition: -o-transform 0.25s cubic-bezier(0, 0, 0.25, 1);
		transition: transform 0.25s cubic-bezier(0, 0, 0.25, 1);
	}
	.leaflet-zoom-anim .leaflet-tile,
	.leaflet-pan-anim .leaflet-tile {
		-webkit-transition: none;
		-moz-transition: none;
		-o-transition: none;
		transition: none;
	}

	.leaflet-zoom-anim .leaflet-zoom-hide {
		visibility: hidden;
	}

	.leaflet-interactive {
		cursor: pointer;
	}
	.leaflet-grab {
		cursor: -webkit-grab;
		cursor: -moz-grab;
	}
	.leaflet-crosshair,
	.leaflet-crosshair .leaflet-interactive {
		cursor: crosshair;
	}
	.leaflet-popup-pane,
	.leaflet-control {
		cursor: auto;
	}
	.leaflet-dragging .leaflet-grab,
	.leaflet-dragging .leaflet-grab .leaflet-interactive,
	.leaflet-dragging .leaflet-marker-draggable {
		cursor: move;
		cursor: -webkit-grabbing;
		cursor: -moz-grabbing;
	}
	.leaflet-marker-icon,
	.leaflet-marker-shadow,
	.leaflet-image-layer,
	.leaflet-pane > svg path,
	.leaflet-tile-container {
		pointer-events: none;
	}

	.leaflet-marker-icon.leaflet-interactive,
	.leaflet-image-layer.leaflet-interactive,
	.leaflet-pane > svg path.leaflet-interactive {
		pointer-events: visiblePainted;
		pointer-events: auto;
	}

	.leaflet-container {
		background: #ddd;
		outline: 0;
	}
	.leaflet-container a {
		color: #0078a8;
	}
	.leaflet-container a.leaflet-active {
		outline: 2px solid orange;
	}
	.leaflet-zoom-box {
		border: 2px dotted #38f;
		background: rgba(255, 255, 255, 0.5);
	}

	.leaflet-container {
		font: 12px/1.5 "Helvetica Neue", Arial, Helvetica, sans-serif;
	}

	.leaflet-bar {
		box-shadow: 0 1px 5px rgba(0, 0, 0, 0.65);
		border-radius: 4px;
	}
	.leaflet-bar a,
	.leaflet-bar a:hover {
		background-color: #fff;
		border-bottom: 1px solid #ccc;
		width: 26px;
		height: 26px;
		line-height: 26px;
		display: block;
		text-align: center;
		text-decoration: none;
		color: black;
	}
	.leaflet-bar a,
	.leaflet-control-layers-toggle {
		background-position: 50% 50%;
		background-repeat: no-repeat;
		display: block;
	}
	.leaflet-bar a:hover {
		background-color: #f4f4f4;
	}
	.leaflet-bar a:first-child {
		border-top-left-radius: 4px;
		border-top-right-radius: 4px;
	}
	.leaflet-bar a:last-child {
		border-bottom-left-radius: 4px;
		border-bottom-right-radius: 4px;
		border-bottom: none;
	}
	.leaflet-bar a.leaflet-disabled {
		cursor: default;
		background-color: #f4f4f4;
		color: #bbb;
	}

	.leaflet-touch .leaflet-bar a {
		width: 30px;
		height: 30px;
		line-height: 30px;
	}
	.leaflet-control-zoom-in,
	.leaflet-control-zoom-out {
		font: bold 18px "Lucida Console", Monaco, monospace;
		text-indent: 1px;
	}
	.leaflet-control-zoom-out {
		font-size: 20px;
	}

	.leaflet-touch .leaflet-control-zoom-in {
		font-size: 22px;
	}
	.leaflet-touch .leaflet-control-zoom-out {
		font-size: 24px;
	}
	.leaflet-control-layers {
		box-shadow: 0 1px 5px rgba(0, 0, 0, 0.4);
		background: #fff;
		border-radius: 5px;
	}
	.leaflet-control-layers-toggle {
		background-image: url(images/layers.png);
		width: 36px;
		height: 36px;
	}
	.leaflet-retina .leaflet-control-layers-toggle {
		background-image: url(images/layers-2x.png);
		background-size: 26px 26px;
	}
	.leaflet-touch .leaflet-control-layers-toggle {
		width: 44px;
		height: 44px;
	}
	.leaflet-control-layers .leaflet-control-layers-list,
	.leaflet-control-layers-expanded .leaflet-control-layers-toggle {
		display: none;
	}
	.leaflet-control-layers-expanded .leaflet-control-layers-list {
		display: block;
		position: relative;
	}
	.leaflet-control-layers-expanded {
		padding: 6px 10px 6px 6px;
		color: #333;
		background: #fff;
	}
	.leaflet-control-layers-scrollbar {
		overflow-y: scroll;
		padding-right: 5px;
	}
	.leaflet-control-layers-selector {
		margin-top: 2px;
		position: relative;
		top: 1px;
	}
	.leaflet-control-layers label {
		display: block;
	}
	.leaflet-control-layers-separator {
		height: 0;
		border-top: 1px solid #ddd;
		margin: 5px -10px 5px -6px;
	}
	.leaflet-default-icon-path {
		background-image: url(images/marker-icon.png);
	}
	.leaflet-container .leaflet-control-attribution {
		background: #fff;
		background: rgba(255, 255, 255, 0.7);
		margin: 0;
	}
	.leaflet-control-attribution,
	.leaflet-control-scale-line {
		padding: 0 5px;
		color: #333;
	}
	.leaflet-control-attribution a {
		text-decoration: none;
	}
	.leaflet-control-attribution a:hover {
		text-decoration: underline;
	}
	.leaflet-container .leaflet-control-attribution,
	.leaflet-container .leaflet-control-scale {
		font-size: 11px;
	}
	.leaflet-left .leaflet-control-scale {
		margin-left: 5px;
	}
	.leaflet-bottom .leaflet-control-scale {
		margin-bottom: 5px;
	}
	.leaflet-control-scale-line {
		border: 2px solid #777;
		border-top: none;
		line-height: 1.1;
		padding: 2px 5px 1px;
		font-size: 11px;
		white-space: nowrap;
		overflow: hidden;
		-moz-box-sizing: border-box;
		box-sizing: border-box;

		background: #fff;
		background: rgba(255, 255, 255, 0.5);
	}
	.leaflet-control-scale-line:not(:first-child) {
		border-top: 2px solid #777;
		border-bottom: none;
		margin-top: -2px;
	}
	.leaflet-control-scale-line:not(:first-child):not(:last-child) {
		border-bottom: 2px solid #777;
	}

	.leaflet-touch .leaflet-control-attribution,
	.leaflet-touch .leaflet-control-layers,
	.leaflet-touch .leaflet-bar {
		box-shadow: none;
	}
	.leaflet-touch .leaflet-control-layers,
	.leaflet-touch .leaflet-bar {
		border: 2px solid rgba(0, 0, 0, 0.2);
		background-clip: padding-box;
	}

	/* popup */

	.leaflet-popup {
		position: absolute;
		text-align: center;
		margin-bottom: 20px;
	}
	.leaflet-popup-content-wrapper {
		padding: 1px;
		text-align: left;
		border-radius: 12px;
	}
	.leaflet-popup-content {
		margin: 13px 19px;
		line-height: 1.4;
	}
	.leaflet-popup-content p {
		margin: 18px 0;
	}
	.leaflet-popup-tip-container {
		width: 40px;
		height: 20px;
		position: absolute;
		left: 50%;
		margin-left: -20px;
		overflow: hidden;
		pointer-events: none;
	}
	.leaflet-popup-tip {
		width: 17px;
		height: 17px;
		padding: 1px;

		margin: -10px auto 0;

		-webkit-transform: rotate(45deg);
		-moz-transform: rotate(45deg);
		-ms-transform: rotate(45deg);
		-o-transform: rotate(45deg);
		transform: rotate(45deg);
	}
	.leaflet-popup-content-wrapper,
	.leaflet-popup-tip {
		background: white;
		color: #333;
		box-shadow: 0 3px 14px rgba(0, 0, 0, 0.4);
	}
	.leaflet-container a.leaflet-popup-close-button {
		position: absolute;
		top: 0;
		right: 0;
		padding: 4px 4px 0 0;
		border: none;
		text-align: center;
		width: 18px;
		height: 14px;
		font: 16px/14px Tahoma, Verdana, sans-serif;
		color: #c3c3c3;
		text-decoration: none;
		font-weight: bold;
		background: transparent;
	}
	.leaflet-container a.leaflet-popup-close-button:hover {
		color: #999;
	}
	.leaflet-popup-scrolled {
		overflow: auto;
		border-bottom: 1px solid #ddd;
		border-top: 1px solid #ddd;
	}

	.leaflet-oldie .leaflet-popup-content-wrapper {
		zoom: 1;
	}
	.leaflet-oldie .leaflet-popup-tip {
		width: 24px;
		margin: 0 auto;

		-ms-filter: "progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678)";
		filter: progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678);
	}
	.leaflet-oldie .leaflet-popup-tip-container {
		margin-top: -1px;
	}

	.leaflet-oldie .leaflet-control-zoom,
	.leaflet-oldie .leaflet-control-layers,
	.leaflet-oldie .leaflet-popup-content-wrapper,
	.leaflet-oldie .leaflet-popup-tip {
		border: 1px solid #999;
	}
	.leaflet-div-icon {
		background: #fff;
		border: 1px solid #666;
	}
	.leaflet-tooltip {
		position: absolute;
		padding: 6px;
		background-color: #fff;
		border: 1px solid #fff;
		border-radius: 3px;
		color: #222;
		white-space: nowrap;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		pointer-events: none;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
	}
	.leaflet-tooltip.leaflet-clickable {
		cursor: pointer;
		pointer-events: auto;
	}
	.leaflet-tooltip-top:before,
	.leaflet-tooltip-bottom:before,
	.leaflet-tooltip-left:before,
	.leaflet-tooltip-right:before {
		position: absolute;
		pointer-events: none;
		border: 6px solid transparent;
		background: transparent;
		content: "";
	}
	.leaflet-tooltip-bottom {
		margin-top: 6px;
	}
	.leaflet-tooltip-top {
		margin-top: -6px;
	}
	.leaflet-tooltip-bottom:before,
	.leaflet-tooltip-top:before {
		left: 50%;
		margin-left: -6px;
	}
	.leaflet-tooltip-top:before {
		bottom: 0;
		margin-bottom: -12px;
		border-top-color: #fff;
	}
	.leaflet-tooltip-bottom:before {
		top: 0;
		margin-top: -12px;
		margin-left: -6px;
		border-bottom-color: #fff;
	}
	.leaflet-tooltip-left {
		margin-left: -6px;
	}
	.leaflet-tooltip-right {
		margin-left: 6px;
	}
	.leaflet-tooltip-left:before,
	.leaflet-tooltip-right:before {
		top: 50%;
		margin-top: -6px;
	}
	.leaflet-tooltip-left:before {
		right: 0;
		margin-right: -12px;
		border-left-color: #fff;
	}
	.leaflet-tooltip-right:before {
		left: 0;
		margin-left: -12px;
		border-right-color: #fff;
	}
`;
