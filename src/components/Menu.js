import React, {useState, useEffect, useContext} from 'react';
import styled from 'styled-components';
import {IoLayers, IoSearch, IoMap, IoImages} from 'react-icons/io5';
import {BsArrowLeftShort, BsArrowRightShort, BsFillInfoCircleFill} from 'react-icons/bs';
import {RiMapFill} from 'react-icons/ri';
import {AiFillTool} from 'react-icons/ai';
import {MdInsertPhoto, MdPhoto} from 'react-icons/md';
import {GrThreeDEffects} from 'react-icons/gr';
import {SiThreedotjs, SiOpenstreetmap} from 'react-icons/si';
import { BrowserRouter as Route, Link } from 'react-router-dom';
import { MapContext } from './GlobalContext';
import { MapContainer, TileLayer, useMapEvents, WMSTileLayer } from 'react-leaflet';
import L from 'leaflet';

function MapEventsComponent() {
	const { zoomLevel, mapCenter } = useContext(MapContext); // initial zoom level provided for MapContainer

    const map = useMapEvents({});

    useEffect(() => {
        map.setView(mapCenter, (zoomLevel-2))
    }, [mapCenter, zoomLevel])

    return null;
}

const Menu = () => {
    const {setSkyHDR, setMapTile, setSolarTile, mapType, setMapType, zoomLevel, mapCenter} = useContext(MapContext);
    const [show, setShow] = useState(false);
    const [activePanel, setActivePanel] = useState('');
    const AllPanels = document.querySelectorAll('.PanelData');
    useEffect(() => {setShow(!show)}, [])
    const PanelHandler = async (target) => {
        await AllPanels.forEach(el => {
            el.style.clipPath = 'circle(0% at 0 0)';
        });
        AllPanels.forEach((el) => {
            let classArr = []
            el.classList.forEach(el => classArr.push(el));
            if(classArr.includes(target) && target !== activePanel) {
                setActivePanel(target);
                el.style.clipPath = 'circle(145% at 0 0)';
            } else if (classArr.includes(target) && target === activePanel) {
                setActivePanel('');
                el.style.clipPath = 'circle(0% at 0 0)';
            }
        })
    }


	const props = {
  token: "public",
  version: "1.3",
  format: "image/png",
  transparent: true,
  tiles: true,
  uppercase: true,
  layers: "background,named_cyclones,named_cyclones_tracks,foreground",
  foo: [123, 5566]
};


    return (
        <MenuBar>
            <div className="hideShow">
                <button onClick={() => setShow(!show)}>
                    {show ? <BsArrowLeftShort /> : <BsArrowRightShort />}
                </button>
            </div>
            {show && mapType === '2D' ? <div className="buttons">
                <button className="buttons-btn" onClick={() => PanelHandler('PanelSearch')}>
                    <IoSearch />
                    <div className='buttons-btn-desc'>
                        <span>Wyszukaj daną lokalizację</span>
                    </div>
                </button>
                <button className="buttons-btn" onClick={() => PanelHandler('Layers')}>
                    <IoLayers />
                    <div className='buttons-btn-desc'>
                        <span>Warstwy tematyczne</span>
                    </div>
                </button>
                <button className="buttons-btn" onClick={() => PanelHandler('Tools')}>
                    <AiFillTool />
                    <div className='buttons-btn-desc'>
                        <span>Narzędzia</span>
                    </div>
                </button>
                <button className="buttons-btn" onClick={() => PanelHandler('Map')}>
                    <IoMap />
                    <div className='buttons-btn-desc'>
                        <span>Mapy bazowe</span>
                    </div>
                </button>
                <Link to="/model" onClick={() => setMapType('3D')} className="buttons-btn">
                    <SiThreedotjs />
                    <div className='buttons-btn-desc'>
                        <span>Wersja trójwymiarowa</span>
                    </div>
                </Link>
                <button className="buttons-btn">
                    <BsFillInfoCircleFill />
                    <div className='buttons-btn-desc'>
                        <span>Informacje</span>
                    </div>
                </button>
            </div>: ''}
            {show && mapType === '3D' ? <div className="buttons">
                <button className="buttons-btn" onClick={() => PanelHandler('Models')}>
                    <IoLayers />
                    <div className='buttons-btn-desc'>
                        <span>Modele</span>
                    </div>
                </button>
                <button className="buttons-btn" onClick={() => PanelHandler('Photos')}>
                    <IoImages />
                    <div className='buttons-btn-desc'>
                        <span>Zdjęcia w tle</span>
                    </div>
                </button>
                <button className="buttons-btn" onClick={() => PanelHandler('3DTools')}>
                    <AiFillTool />
                    <div className='buttons-btn-desc'>
                        <span>Narzędzia</span>
                    </div>
                </button>
                <Link to="/" onClick={() => setMapType('2D')} className="buttons-btn">
                    <IoMap />
                    <div className='buttons-btn-desc'>
                        <span>Wersja dwuwymiarowa</span>
                    </div>
                </Link>
                <button className="buttons-btn">
                    <BsFillInfoCircleFill />
                    <div className='buttons-btn-desc'>
                        <span>Informacje</span>
                    </div>
                </button>
            </div>: ''}
            <div className="PanelData Panel Models">
                Here is models panel
            </div>
            <div className="PanelData Panel Photos">
                <button className="Map-tile" onClick={() => setSkyHDR('Terrain')}>
                    <MdPhoto className="Map-tile-ico" />
                    <span>Domyślny</span>
                </button>
                <button className="Map-tile" onClick={() => setSkyHDR('Sunflowers')}>
                    <MdPhoto className="Map-tile-ico" />
                    <span>Zachmurzony</span>
                </button>
                <button className="Map-tile" onClick={() => setSkyHDR('Clear')}>
                    <MdPhoto className="Map-tile-ico" />
                    <span>Czysty</span>
                </button>
            </div>
            <div className="PanelData Panel 3DTools">
                Here is 3D Tools panel
            </div>
            <div className="PanelData PanelSearch">
                <h2>Wpisz szukany adres:</h2>
                <form>
                    <input type="text" />
                    <button><IoSearch /></button>
                </form>
            </div>
            <div className="PanelData Panel Layers">
                <button className="Map-tile" onClick={() => setSolarTile('Roofs')}>
                    <RiMapFill className="Map-tile-ico" />
                    <span>Dachy</span>
                </button>
                <button className="Map-tile" onClick={() => setSolarTile('All')}>
                    <RiMapFill className="Map-tile-ico" />
                    <span>Całościowe</span>
                </button>
                <button className="Map-tile" onClick={() => setSolarTile('GradientAll')}>
                    <RiMapFill className="Map-tile-ico" />
                    <span>Gradient</span>
                </button>
            </div>
            <div className="PanelData Panel Tools">here is tools</div>
            <div className="PanelData Panel Map">
                <button className="Map-tile" onClick={() => setMapTile('default')}>
                    <div className="Map-tile-desc">
                        <SiOpenstreetmap className="Map-tile-desc-ico" />
                        <span>Open Street Map</span>
                    </div>
                    <MapStyles>
                        <MapContainer class="mapOSM" id="MapOSM"
                        center={mapCenter}
				        zoom={zoomLevel}
                        scrollWheelZoom={false}
                        zoomControl={false}
                        doubleClickZoom={false}
                        dragging={false}
                        >
                            <MapEventsComponent />
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' minZoom={1} maxZoom={28} minNativeZoom={0} maxNativeZoom={19} />
                        </MapContainer>
                    </MapStyles>
                </button>
                <button className="Map-tile" onClick={() => setMapTile('topo')}>
                    <div className="Map-tile-desc">
                        <SiOpenstreetmap className="Map-tile-desc-ico" />
                        <span>Open Topo Map</span>
                    </div>
                    <MapStyles>
                        <MapContainer class="mapOSM" id="MapOSM"
                        center={mapCenter}
				        zoom={zoomLevel}
                        scrollWheelZoom={false}
                        zoomControl={false}
                        doubleClickZoom={false}
                        dragging={false}
                        >
                            <MapEventsComponent />
                            <TileLayer url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png" attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)' minZoom={1} maxZoom={28} minNativeZoom={0} maxNativeZoom={19} />                        </MapContainer>
                    </MapStyles>
                </button>
                <button className="Map-tile" onClick={() => setMapTile('cartodbpositron')}>
                    <div className="Map-tile-desc">
                        <RiMapFill className="Map-tile-desc-ico" />
                        <span>Carto DB Positron</span>
                    </div>
                    <MapStyles>
                        <MapContainer class="mapOSM" id="MapOSM"
                        center={mapCenter}
				        zoom={zoomLevel}
                        scrollWheelZoom={false}
                        zoomControl={false}
                        doubleClickZoom={false}
                        dragging={false}
                        >
                            <MapEventsComponent />
                            <TileLayer url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png' attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>' minZoom={1} maxZoom={28} minNativeZoom={0} maxNativeZoom={19} />
                        </MapContainer>
                    </MapStyles>
                </button>
                <button className="Map-tile" onClick={() => setMapTile('cartodbdark')}>
                    <div className="Map-tile-desc">
                        <RiMapFill className="Map-tile-desc-ico" />
                        <span>Carto DB Dark</span>
                    </div>
                    <MapStyles>
                        <MapContainer class="mapOSM" id="MapOSM"
                        center={mapCenter}
				        zoom={zoomLevel}
                        scrollWheelZoom={false}
                        zoomControl={false}
                        doubleClickZoom={false}
                        dragging={false}
                        >
                            <MapEventsComponent />
                            <TileLayer url='https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png' attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>' minZoom={1} maxZoom={28} minNativeZoom={0} maxNativeZoom={19} />
                        </MapContainer>
                    </MapStyles>
                </button>
                <button className="Map-tile" onClick={() => setMapTile('cartodbvoyager')}>
                    <div className="Map-tile-desc">
                        <RiMapFill className="Map-tile-desc-ico" />
                        <span>Carto DB Voyager</span>
                    </div>
                    <MapStyles>
                        <MapContainer class="mapOSM" id="MapOSM"
                        center={mapCenter}
				        zoom={zoomLevel}
                        scrollWheelZoom={false}
                        zoomControl={false}
                        doubleClickZoom={false}
                        dragging={false}
                        >
                            <MapEventsComponent />
                            <TileLayer url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png' attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>' minZoom={1} maxZoom={28} minNativeZoom={0} maxNativeZoom={19} />
                        </MapContainer>
                    </MapStyles>
                </button>
                <button className="Map-tile" onClick={() => setMapTile('stamentonerlite')}>
                    <div className="Map-tile-desc">
                        <RiMapFill className="Map-tile-desc-ico" />
                        <span>Stamen Toner Lite</span>
                    </div>
                    <MapStyles>
                        <MapContainer class="mapOSM" id="MapOSM"
                        center={mapCenter}
				        zoom={zoomLevel}
                        scrollWheelZoom={false}
                        zoomControl={false}
                        doubleClickZoom={false}
                        dragging={false}
                        >
                            <MapEventsComponent />
                            <TileLayer url='https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png' attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' minZoom={1} maxZoom={28} minNativeZoom={0} maxNativeZoom={19} />
                        </MapContainer>
                    </MapStyles>
                </button>
                <button className="Map-tile" onClick={() => setMapTile('esriworldimagery')}>
                    <div className="Map-tile-desc">
                        <MdInsertPhoto className="Map-tile-desc-ico" />
                        <span>Esri World Imagery</span>
                    </div>
                    <MapStyles>
                        <MapContainer class="mapOSM" id="MapOSM"
                        center={mapCenter}
				        zoom={zoomLevel}
                        scrollWheelZoom={false}
                        zoomControl={false}
                        doubleClickZoom={false}
                        dragging={false}
                        >
                            <MapEventsComponent />
                            <TileLayer url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}' attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community' minZoom={1} maxZoom={28} minNativeZoom={0} maxNativeZoom={19} />
                        </MapContainer>
                    </MapStyles>
                </button>
                <button className="Map-tile" onClick={() => setMapTile('geoportaltopo')}>
                    <div className="Map-tile-desc">
                        <MdInsertPhoto className="Map-tile-desc-ico" />
                        <span>Topo Geoportal</span>
                    </div>
                    <MapStyles>
                        <MapContainer class="mapOSM" id="MapOSM"
                        center={mapCenter}
				        zoom={zoomLevel}
                        scrollWheelZoom={false}
                        zoomControl={false}
                        doubleClickZoom={false}
                        dragging={false}
                        >
                            <MapEventsComponent />
                            <WMSTileLayer url='https://mapy.geoportal.gov.pl/wss/service/pub/guest/kompozycja_BDOT10k_WMS/MapServer/WMSServer' {...props} attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community' minZoom={1} maxZoom={28} minNativeZoom={0} maxNativeZoom={19} />
                        </MapContainer>
                    </MapStyles>
                </button>
            </div>
        </MenuBar>
    )
}

export default Menu

const MenuBar = styled.div`
display: flex;
flex-direction: row-reverse;
position: relative;
z-index: 100000;
box-shadow: 2px 0px 5px rgba(0,0,0,.25);

.Map {
    &-tile {
        width: 100%;
        font-size: 1.2rem;
        margin: 0.5rem 0rem;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: left;
        border: none;
        background:none;
        transition: all .5s ease-in-out;

        &-desc {
            width: 100%;
            font-size: 1.2rem;
            margin: 0.5rem 0rem;
            display: flex;
            align-items: center;
            justify-content: left;
            
            &-ico {
                font-size: 1.5rem;
                margin: 0.25rem;
            }
        }

        &:hover {
            cursor: pointer;
            background-color: #A5DFFF;
        }
    }
}

.PanelSearch {
    position: absolute;
    left: 100%;
    width: 600%;
    height: 17.5%;
    background-color: white;
    transition: all .5s ease-in-out;
    clip-path: circle(0% at 0 0);
    min-width: 22rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    & > h2 {
        margin: 1rem 0rem;
        width: 85%;
        font-family: 'Work Sans';
        /* background-color: red; */
    }
    & > form {
        width: 85%;
        position: relative;
        /* background-color: red; */
        & > h2 {

        }
        & > input {
            width: 100%;
            padding: .35rem;
            border-radius: 25px;
            border: 1px solid black
        }

        & > button {
            position: absolute;
            background: #001F45;
            border: none;
            color: white;
            padding: .25rem;
            border-radius: 50%;
            width: 1.85rem;
            height: 1.85rem;
            display: flex;
            align-items: center;
            justify-content: center;
            top: .05rem;
            right: -.8rem;
            font-size: 1.2rem;

            &:hover {
                cursor: pointer;
            }
        }
    }
}
.Panel {
    position: absolute;
    left: 100%;
    width: 500%;
    height: 100%;
    background-color: white;
    transition: all .5s ease-in-out;
    clip-path: circle(0% at 0 0);
    min-width: 17.5rem;
    overflow-y: scroll;
    ::-webkit-scrollbar {
        width: 10px;
    }
    ::-webkit-scrollbar-track {
      background: white;
    }
    ::-webkit-scrollbar-thumb {
      background: skyblue;
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: blue;
      cursor: pointer;
    }
}
.hideShow {
    & > button {
        height: 100%;
        background: none;
        border: none;
        font-size: .75rem;
        border-left: 1px solid #CFCFCF;
        border-right: 1px solid #CFCFCF;
        transition: all .5s ease-in-out;

        &:hover {
            cursor: pointer;
            background: #CFCFCF;
        }
    }
}
.buttons {
    display: flex;
    flex-direction: column;
    transition: all .5s ease-in-out;

    &-btn {
        background: none;
        border: none;
        font-size: 1.75rem;
        margin: .5rem;
        position: relative;
        color: black;

        &-desc {
            position: absolute;
            width: max-content;
            top: 0;
            left: 4rem;
            font-size: 1rem;
            background-color: white;
            padding: .5rem;
            border-radius: 15px 15px 15px 0px;
            clip-path: polygon(0 0, 0 0, 0 100%, 0% 100%);
            font-family: 'Work Sans';
        }

        &:hover {
            cursor: pointer;
            .buttons-btn-desc {
                clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
            }
        }
    }
}

`;
const MapStyles = styled.div`
height: 5rem;
width: 100%;
/* background-color: red; */
#MapOSM {
  height: 100%;
}

.TorBufor {
	color: white;
	fill: white;
	fill-opacity: .55;
	stroke: none;
}

.TorGranice {
	color: black;
	fill: none;
	stroke: black;
	stroke-width: 2.5px;
}

/* required styles */

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
/* Safari renders non-retina tile on retina better with this, but Chrome is worse */
.leaflet-safari .leaflet-tile {
	image-rendering: -webkit-optimize-contrast;
	}
/* hack that prevents hw layers "stretching" when loading new tiles */
.leaflet-safari .leaflet-tile-container {
	width: 1600px;
	height: 1600px;
	-webkit-transform-origin: 0 0;
	}
.leaflet-marker-icon,
.leaflet-marker-shadow {
	display: block;
	}
/* .leaflet-container svg: reset svg max-width decleration shipped in Joomla! (joomla.org) 3.x */
/* .leaflet-container img: map is broken in FF if you have max-width: 100% on tiles */
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
/* workaround for https://bugzilla.mozilla.org/show_bug.cgi?id=888319 */
.leaflet-overlay-pane svg {
	-moz-user-select: none;
	}

.leaflet-pane         { z-index: 400; }

.leaflet-tile-pane    { z-index: 200; }
.leaflet-overlay-pane { z-index: 400; }
.leaflet-shadow-pane  { z-index: 500; }
.leaflet-marker-pane  { z-index: 600; }
.leaflet-tooltip-pane   { z-index: 650; }
.leaflet-popup-pane   { z-index: 700; }

.leaflet-map-pane canvas { z-index: 100; }
.leaflet-map-pane svg    { z-index: 200; }

.leaflet-vml-shape {
	width: 1px;
	height: 1px;
	}
.lvml {
	behavior: url(#default#VML);
	display: inline-block;
	position: absolute;
	}


/* control positioning */

.leaflet-control {
	position: relative;
	z-index: 800;
	pointer-events: visiblePainted; /* IE 9-10 doesn't have auto */
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


/* zoom and fade animations */

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
	-webkit-transition: -webkit-transform 0.25s cubic-bezier(0,0,0.25,1);
	   -moz-transition:    -moz-transform 0.25s cubic-bezier(0,0,0.25,1);
	     -o-transition:      -o-transform 0.25s cubic-bezier(0,0,0.25,1);
	        transition:         transform 0.25s cubic-bezier(0,0,0.25,1);
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


/* cursors */

.leaflet-interactive {
	cursor: pointer;
	}
.leaflet-grab {
	cursor: -webkit-grab;
	cursor:    -moz-grab;
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
	cursor:    -moz-grabbing;
	}

/* marker & overlays interactivity */
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
	pointer-events: visiblePainted; /* IE 9-10 doesn't have auto */
	pointer-events: auto;
	}

/* visual tweaks */

.leaflet-container {
	background: #ddd;
	outline: 0;
	}
.leaflet-container a {
	color: #0078A8;
	}
.leaflet-container a.leaflet-active {
	outline: 2px solid orange;
	}
.leaflet-zoom-box {
	border: 2px dotted #38f;
	background: rgba(255,255,255,0.5);
	}


/* general typography */
.leaflet-container {
	font: 12px/1.5 "Helvetica Neue", Arial, Helvetica, sans-serif;
	}


/* general toolbar styles */

.leaflet-bar {
	box-shadow: 0 1px 5px rgba(0,0,0,0.65);
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


/* zoom control */

.leaflet-control-zoom-in,
.leaflet-control-zoom-out {
	font: bold 18px 'Lucida Console', Monaco, monospace;
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


/* layers control */

.leaflet-control-layers {
	box-shadow: 0 1px 5px rgba(0,0,0,0.4);
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

/* Default icon URLs */
.leaflet-default-icon-path {
	background-image: url(images/marker-icon.png);
	}


/* attribution and scale controls */

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
	border: 2px solid rgba(0,0,0,0.2);
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
	box-shadow: 0 3px 14px rgba(0,0,0,0.4);
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


/* div icon */

.leaflet-div-icon {
	background: #fff;
	border: 1px solid #666;
	}


/* Tooltip */
/* Base styles for the element that has a tooltip */
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
	box-shadow: 0 1px 3px rgba(0,0,0,0.4);
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

/* Directions */

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