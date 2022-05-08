import React, { useState, useEffect, useContext, useRef } from "react";
import styled from "styled-components";
import { IoLayers, IoSearch, IoMap, IoImages } from "react-icons/io5";
import {
  BsArrowLeftShort,
  BsArrowRightShort,
  BsFillInfoCircleFill,
} from "react-icons/bs";
import { AiFillTool } from "react-icons/ai";
import { MdPhoto } from "react-icons/md";
import { SiThreedotjs } from "react-icons/si";
import { BrowserRouter as Route, Link } from "react-router-dom";
import { MapContext } from "./GlobalContext";
import { useMapEvents } from "react-leaflet";
import PanelBtn from "./PanelBtn";
import MapTileBtn from "./MapTileBtn";
import AllMaps from "./Maps";
import { addressDatabase } from "./database_js";
import swal from "sweetalert";
import { useSelector, useDispatch } from "react-redux";
import { MapLayerActions } from "./LayersReducer";

function MapEventsComponent() {
  const { zoomLevel, mapCenter } = useContext(MapContext); // initial zoom level provided for MapContainer

  const map = useMapEvents({});

  useEffect(() => {
    map.setView(mapCenter, zoomLevel - 1);
  }, [mapCenter, zoomLevel]);

  return null;
}

const Menu = () => {
  const {
    setSkyHDR,
    setMapTile,
    setSolarTile,
    mapType,
    setMapType,
    zoomLevel,
    mapCenter,
    setSearchedLocation,
  } = useContext(MapContext);
  const [show, setShow] = useState(false);
  const [activePanel, setActivePanel] = useState("");
  const AllPanels = document.querySelectorAll(".PanelData");
  const [suggestions, setSuggestions] = useState([]);
  const InputSearchRef = useRef();

  const dispatch = useDispatch();
  const layers = useSelector((state) => state.layers.array);
  const arrExists = layers.map((el) => el.code);
  console.log(JSON.stringify(layers));
  console.log(JSON.stringify(arrExists));

  const addLayerHandler = (el) => {
    if (!arrExists.includes(el.code)) {
      dispatch(MapLayerActions.addLayer(el));
    } else {
      const newArr = layers.filter((element) => element.code != el.code);
      console.log(newArr);
      dispatch(MapLayerActions.removeLayer(newArr));
    }
  };

  useEffect(() => {
    setShow(!show);
  }, []);

  const SearchLocation = async (e) => {
    const regexp = new RegExp(`${e.target.value}`);
    const names = [];
    const arr = await addressDatabase.filter((el) => {
      if (el.adrHouse.match(regexp) || el.streetName.match(regexp)) {
        if (!names.includes(el.adrHouse)) {
          names.push(el.adrHouse);
          return el;
        }
      }
    });
    function compareNumbers(a, b) {
      const arra = a.adrHouse.split(" ");
      const arrb = b.adrHouse.split(" ");
      let numa = parseInt(arra[arra.length - 1]);
      let numb = parseInt(arrb[arrb.length - 1]);
      if (isNaN(numa)) {
        numa = 0;
      }
      if (isNaN(numb)) {
        numb = 0;
      }
      return numa - numb;
    }
    arr.sort(compareNumbers);
    setSuggestions(arr);
  };

  const PanelHandler = async (target) => {
    await AllPanels.forEach((el) => {
      el.style.clipPath = "circle(0% at 0 0)";
    });
    AllPanels.forEach((el) => {
      let classArr = [];
      el.classList.forEach((el) => classArr.push(el));
      if (classArr.includes(target) && target !== activePanel) {
        setActivePanel(target);
        el.style.clipPath = "circle(200% at 0 0)";
      } else if (classArr.includes(target) && target === activePanel) {
        if (target === "PanelSearch") {
          setSearchedLocation(null);
          setSuggestions([]);
          InputSearchRef.current.value = "";
        }
        setActivePanel("");
        el.style.clipPath = "circle(0% at 0 0)";
      }
    });
  };

  const SelectLocation = (e, location) => {
    e.preventDefault();
    if (suggestions.length > 0) {
      setSearchedLocation(location);
      InputSearchRef.current.value = location.adrHouse;
      setSuggestions([]);
    } else {
      swal(
        "Nie znaleziono lokalizacji!",
        "Prawdopodobnie wpisałeś nazwę źle lub nie istnieje ona w bazie danych, skorzystaj z podopowiedzi wyświetlanych pod polem wyszukiwania.",
        "info"
      );
    }
  };

  const SecondDimensionVersionButtons = [
    {
      name: "Wyszukaj daną lokalizację",
      ico: <IoSearch />,
      code: "PanelSearch",
    },
    { name: "Warstwy tematyczne", ico: <IoLayers />, code: "Layers" },
    { name: "Narzędzia", ico: <AiFillTool />, code: "Tools" },
    { name: "Mapy bazowe", ico: <IoMap />, code: "Map" },
  ];
  const ThirdDimensionVersionButtons = [
    { name: "Modele", ico: <IoLayers />, code: "Models" },
    { name: "Zdjęcia w tle", ico: <IoImages />, code: "Photos" },
    { name: "Narzędzia", ico: <AiFillTool />, code: "3DTools" },
  ];

  return (
    <MenuBar>
      <div className="hideShow">
        <button onClick={() => setShow(!show)}>
          {show ? <BsArrowLeftShort /> : <BsArrowRightShort />}
        </button>
      </div>
      <div className="buttons">
        {show && mapType === "2D" ? (
          <>
            {SecondDimensionVersionButtons.map((el, index) => (
              <PanelBtn
                key={index}
                name={el.name}
                ico={el.ico}
                PanelHandler={PanelHandler}
                code={el.code}
              />
            ))}
            <Link
              to="/model"
              onClick={() => setMapType("3D")}
              className="buttons-btn"
            >
              <SiThreedotjs />
              <div className="buttons-btn-desc">
                <span>Wersja trójwymiarowa</span>
              </div>
            </Link>
          </>
        ) : (
          ""
        )}
        {show && mapType === "3D" ? (
          <>
            {ThirdDimensionVersionButtons.map((el, index) => (
              <PanelBtn
                key={index}
                name={el.name}
                ico={el.ico}
                PanelHandler={PanelHandler}
                code={el.code}
              />
            ))}
            <Link
              to="/"
              onClick={() => setMapType("2D")}
              className="buttons-btn"
            >
              <IoMap />
              <div className="buttons-btn-desc">
                <span>Wersja dwuwymiarowa</span>
              </div>
            </Link>
          </>
        ) : (
          ""
        )}
        {show && (
          <button className="buttons-btn">
            <BsFillInfoCircleFill />
            <div className="buttons-btn-desc">
              <span>Informacje</span>
            </div>
          </button>
        )}
      </div>
      <div className="PanelData Panel Models">Here is models panel</div>
      <div className="PanelData Panel Photos">
        <button className="Map-tile" onClick={() => setSkyHDR("Terrain")}>
          <MdPhoto className="Map-tile-ico" />
          <span>Domyślny</span>
        </button>
        <button className="Map-tile" onClick={() => setSkyHDR("Sunflowers")}>
          <MdPhoto className="Map-tile-ico" />
          <span>Zachmurzony</span>
        </button>
        <button className="Map-tile" onClick={() => setSkyHDR("Clear")}>
          <MdPhoto className="Map-tile-ico" />
          <span>Czysty</span>
        </button>
      </div>
      <div className="PanelData Panel 3DTools">Here is 3D Tools panel</div>
      <div className="PanelData PanelSearch">
        <form onSubmit={(e) => SelectLocation(e, suggestions[0])}>
          <input
            type="text"
            placeholder="Wpisz szukany adres..."
            autoComplete="none"
            onKeyUp={(e) => SearchLocation(e)}
            ref={InputSearchRef}
          />
          <button type="submit">
            <IoSearch />
          </button>
          <div className="PanelSearch-suggestions">
            {suggestions.slice(0, 5).map((el) => (
              <div
                onClick={(e) => SelectLocation(e, el)}
                className="PanelSearch-suggestions-suggestion"
              >
                {el.streetName != "" ? el.streetName : ""}
                {el.streetName != "" && el.adrHouse != "" ? "," : ""}{" "}
                {el.adrHouse}
              </div>
            ))}
          </div>
        </form>
      </div>
      <div className="PanelData Panel Layers">
        {AllMaps.layers.map((mapel, index) => (
          <MapTileBtn
            code={mapel.code}
            key={index}
            Icon={mapel.ico}
            name={mapel.name}
            Events={<MapEventsComponent />}
            url={mapel.url}
            attribution={""}
            action={setSolarTile}
            mapCenter={mapCenter}
            zoomLevel={zoomLevel}
            addLayerHandler={addLayerHandler}
          />
        ))}
      </div>
      <div className="PanelData Panel Tools">here is tools</div>
      <div className="PanelData Panel Map">
        {AllMaps.baseMaps.map((mapel, index) => (
          <MapTileBtn
            code={mapel.code}
            key={index}
            Icon={mapel.ico}
            name={mapel.name}
            Events={<MapEventsComponent />}
            url={mapel.url}
            attribution={mapel.attribution}
            action={setMapTile}
            mapCenter={mapCenter}
            zoomLevel={zoomLevel}
          />
        ))}
      </div>
    </MenuBar>
  );
};

export default Menu;

const MenuBar = styled.div`
  display: flex;
  flex-direction: row-reverse;
  position: relative;
  z-index: 100000;
  box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.25);
  background-color: white;

  .PanelSearch {
    position: absolute;
    left: 100%;
    width: 600%;
    height: max-content;
    background-color: white;
    transition: all 0.5s ease-in-out;
    clip-path: circle(0% at 0 0);
    min-width: 22rem;
    display: flex;
    align-items: center;
    justify-content: center;

    &-suggestions {
      position: absolute;
      width: 100%;
      height: min-content;
      border-radius: 10px;
      overflow: hidden;
      font-family: "Arial";
      &-suggestion {
        width: 100%;
        height: min-content;
        padding: 0.5rem 0.25rem;
        background-color: white;
        overflow-wrap: break-word;

        &:hover {
          cursor: pointer;
          background-color: lightgrey;
        }
      }
    }

    & > form {
      width: 90%;
      position: relative;
      margin: 0.5rem 0.25rem;
      & > input {
        width: 100%;
        padding: 0.35rem;
        border-radius: 5px;
        border: 1px solid grey;
      }

      & > button {
        position: absolute;
        border: none;
        background: none;
        color: black;
        padding: 0.25rem;
        width: 1.85rem;
        height: 1.85rem;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 0.05rem;
        right: -0.8rem;
        font-size: 1.5rem;

        &:hover {
          cursor: pointer;
        }
      }
    }
  }
  .Panel {
    position: absolute;
    left: 100%;
    min-width: 500%;
    max-width: auto;
    height: 100%;
    background-color: white;
    transition: all 0.5s ease-in-out;
    clip-path: circle(0% at 0 0);
    min-width: 17.5rem;
    overflow-y: scroll;
    ::-webkit-scrollbar {
      width: 5px;
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

  .Layers {
    background: none;
    padding: 0rem 0.5rem;
    ::-webkit-scrollbar {
      width: 0px;
    }
  }

  .Map {
    background: none;
    padding: 0rem 0.5rem;
    ::-webkit-scrollbar {
      width: 0px;
    }
    &-tile {
      width: 100%;
      height: 10rem;

      font-size: 1.2rem;
      margin: 0.5rem 0rem 0.5rem 0rem;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: left;
      border: none;
      background: none;
      transition: all 0.5s ease-in-out;
      position: relative;
      border-radius: 10px;
      overflow: hidden;
      border: 2px solid white;
      background-color: white;

      &-desc {
        width: max-content;
        display: flex;
        font-size: 0.75rem;
        padding: 0.25rem;
        align-items: center;
        justify-content: left;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1000;
        background-color: white;
        border-radius: 0px 0px 10px 0px;

        &-ico {
          font-size: 1rem;
          margin: 0.25rem;
        }
      }

      &:hover {
        cursor: pointer;
        background-color: #a5dfff;
      }
    }
  }
  .hideShow {
    & > button {
      height: 100%;
      background: none;
      border: none;
      font-size: 0.75rem;
      border-left: 1px solid #cfcfcf;
      border-right: 1px solid #cfcfcf;
      transition: all 0.5s ease-in-out;

      &:hover {
        cursor: pointer;
        background: #cfcfcf;
      }
    }
  }
  .buttons {
    display: flex;
    flex-direction: column;
    transition: all 0.5s ease-in-out;

    &-btn {
      background: none;
      border: none;
      font-size: 1.75rem;
      margin: 0.5rem;
      position: relative;
      color: black;

      &-desc {
        position: absolute;
        width: max-content;
        top: 0;
        left: 4rem;
        font-size: 1rem;
        background-color: white;
        padding: 0.5rem;
        border-radius: 15px 15px 15px 0px;
        clip-path: polygon(0 0, 0 0, 0 100%, 0% 100%);
        font-family: "Work Sans";
        z-index: 10000;
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
  height: 105%;
  width: 105%;
  /* background-color: red; */
  #MapOSM {
    height: 100%;
  }

  .TorBufor {
    color: white;
    fill: white;
    fill-opacity: 0.55;
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

  /* cursors */

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
    color: #0078a8;
  }
  .leaflet-container a.leaflet-active {
    outline: 2px solid orange;
  }
  .leaflet-zoom-box {
    border: 2px dotted #38f;
    background: rgba(255, 255, 255, 0.5);
  }

  /* general typography */
  .leaflet-container {
    font: 12px/1.5 "Helvetica Neue", Arial, Helvetica, sans-serif;
  }

  /* general toolbar styles */

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

  /* zoom control */

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

  /* layers control */

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
