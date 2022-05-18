import React, { useState, useRef, useEffect, useContext } from "react";
import styled from "styled-components";
import DraggableComponent from "react-draggable";
import {
  IoMdArrowDropright,
  IoMdArrowDropdown,
  IoMdClose,
} from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { MapLayerActions } from "./LayersReducer";
import { MapContext } from "./GlobalContext";

import { FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const DrawMeasurement = () => {
  const window = useRef(null);
  const [opened, setOpened] = useState(true);
  const [size, setSize] = useState(400);
  const sizeRef = useRef(null);
  const DraggableRef = useRef();
  const [activeLayers, setActiveLayers] = useState(["Roofs"]);
  const [activeLegends, setActiveLegends] = useState(["Roofs"]);

  const { generalLegendSeen, removeTool } = useContext(MapContext);

  const dispatch = useDispatch();

  const layers = useSelector((state) => state.layers.array);
  useEffect(() => {
    const layersArray = [];
    layers.forEach((el) => layersArray.push(el.code));
    setActiveLayers(layersArray.reverse());
  }, [layers]);

  async function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    console.log(layers.length);

    const reducerArr = [];

    const newitems = await reorder(
      layers,
      layers.length - 1 - result.source.index,
      layers.length - 1 - result.destination.index
    );

    await newitems.forEach((el) => {
      const code = el.code;
      const obj = { code: code, index: 1000 };
      reducerArr.push(obj);
    });

    dispatch(MapLayerActions.removeLayer(reducerArr));
  }

  useEffect(async () => {
    if (opened != true) {
      document.querySelector(".ContentContainer").style.transition =
        "all .5s ease-in-out";
      setSize(0);
      setTimeout(() => {
        document.querySelector(".ContentContainer").style.transition =
          "all .5s ease-in-out";
      }, 501);
    } else {
      setSize(400);
      setTimeout(() => {
        document.querySelector(".ContentContainer").style.transition =
          "all 0s ease-in-out";
      }, 500);
    }
  }, [opened]);

  const legendRoofStore = [
    { desc: "> 1200 kWh/m", color: "#E81014" },
    { desc: "1101 - 1200 kWh/m", color: "#F25922" },
    { desc: "1001 - 1100 kWh/m", color: "#FA8D34" },
    { desc: "901 - 1000 kWh/m", color: "#FCC44C" },
    { desc: "801 - 900 kWh/m", color: "#FFEF14" },
    { desc: "701 - 800 kWh/m", color: "#CEDE81" },
    { desc: "601 - 700 kWh/m", color: "#A0C29B" },
    { desc: "501 - 600 kWh/m", color: "#6DA9B3" },
    { desc: "< 500 kWh/m", color: "#2892C7" },
  ];

  const openLegend = (e, code) => {
    const btn = e.target.closest("article");
    const legend = btn.parentElement.querySelector(".Content-legend");
    legend.classList.toggle("ContentOpened");

    if (activeLayers.includes(code)) {
      const newArr = activeLegends.filter((el) => el !== code);
      setActiveLegends(newArr);
    } else {
      const newArr = [...activeLegends, code];
      setActiveLegends(newArr);
    }
  };

  return (
    <DraggableComponent nodeRef={window} handle="div.PanelTitle">
      <LMWindow ref={window}>
        <div className="PanelTitle">
          <div>
            <button
              className="PanelTitle-BtnOpen"
              onClick={() => setOpened(!opened)}
            >
              {opened ? <IoMdArrowDropdown /> : <IoMdArrowDropright />}
            </button>
            <span>Pomiary</span>
          </div>
          <button
            class="BtnClose"
            onClick={() => removeTool("LayersManagement")}
          >
            <IoMdClose />
          </button>
        </div>
        <div className="Content">Sth</div>
      </LMWindow>
    </DraggableComponent>
  );
};

export default DrawMeasurement;

const LMWindow = styled.div`
  position: absolute;
  top: 80px;
  right: 400px;
  width: 20rem;
  z-index: 5000;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  border-radius: 10px;
  overflow: hidden;

  .RoofsLegendElement {
    display: flex;
    align-items: center;
    & > div {
      width: 1.5rem;
      height: 1.5rem;
      margin: 0.5rem;
      border-radius: 50%;
    }

    & > span {
      font-family: "Arial";
      font-size: 0.9rem;
    }
  }

  .ContentOpened {
    height: 100% !important;
  }

  .BtnClose {
    color: white;
    background: none;
    border: none;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      cursor: pointer;
    }
  }

  .PanelTitle {
    background-color: #001f45;
    color: white;
    padding: 0.5rem;
    font-family: "Work Sans";
    display: flex;
    justify-content: space-between;
    z-index: 200;

    &:hover {
      cursor: move;
    }

    & > div {
      display: flex;

      & > span {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    &-BtnOpen {
      color: white;
      background: none;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      width: min-content;
      font-size: 1.2rem;
      margin-right: 0.5rem;

      &:hover {
        cursor: pointer;
      }
    }
  }
`;
