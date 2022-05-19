import React, { useState, useRef, useEffect, useContext } from "react";
import styled from "styled-components";
import DraggableComponent from "react-draggable";
import {
  IoMdArrowDropright,
  IoMdArrowDropdown,
  IoMdClose,
} from "react-icons/io";
import { IoTrash, IoAnalyticsOutline } from "react-icons/io5";
import { AiFillEdit } from "react-icons/ai";
import { BiShapeCircle, BiShapeSquare, BiShapePolygon } from "react-icons/bi";
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
  const [toolActive, setToolActive] = useState("");
  const { removeTool, setMeasurementShape } = useContext(MapContext);

  const ToolsList = [
    {
      name: "Linia",
      ico: <IoAnalyticsOutline className="ico" />,
      code: "poline",
    },
    {
      name: "Poligon",
      ico: <BiShapePolygon className="ico" />,
      code: "polygon",
    },
    {
      name: "Kwadrat",
      ico: <BiShapeSquare className="ico" />,
      code: "rectangle",
    },
    {
      name: "Koło",
      ico: <BiShapeCircle className="ico" />,
      code: "circle",
    },
    {
      name: "Edycja",
      ico: <AiFillEdit className="ico" />,
      code: "edit",
    },
    {
      name: "Usuń",
      ico: <IoTrash className="ico" />,
      code: "remove",
    },
  ];

  const toolHandler = (e, code) => {
    e.preventDefault();

    switch (code) {
      case toolActive:
        setToolActive("");
        setMeasurementShape({ code: "NotActive", coords: [] });
        break;
      case "poline":
        setToolActive("poline");
        setMeasurementShape({ code: "poline", coords: [] });
        break;
      case "polygon":
        setToolActive("polygon");
        setMeasurementShape({ code: "polygon", coords: [] });
        break;
      case "rectangle":
        setToolActive("rectangle");
        setMeasurementShape({ code: "rectangle", coords: [] });
        break;
      case "circle":
        setToolActive("circle");
        setMeasurementShape({ code: "circle", coords: [] });
        break;
      case "edit":
        setToolActive("edit");
        break;
      case "remove":
        setToolActive("remove");
        break;
      default:
        setToolActive("");
        setMeasurementShape({ code: "NotActive", coords: [] });
        break;
    }
  };

  const shapeHandler = () => {};

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
        <div className={`Content ${opened && "ContentOpened"}`}>
          {ToolsList.map((el, index) => {
            return (
              <div key={index} className="DrawElement">
                <button onClick={(e) => toolHandler(e, el.code)}>
                  {el.ico}
                  {el.name}
                </button>
                {toolActive === el.code && (
                  <div className="DrawElement-options">
                    <button>Zakończ</button>
                    <button>Usuń ostatni punkt</button>
                    <button>Anuluj</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
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

  .DrawElement {
    display: flex;
    flex-direction: column;
    & > button {
      padding: 0.5rem;
      font-size: 1.1rem;
      text-align: left;
      border-radius: 0px;
      background: none;
      border: none;
      border-bottom: 1px solid grey;

      &:hover {
        cursor: pointer;
        background-color: #ebebeb;
      }

      & > .ico {
        margin: 0rem 0.5rem;
      }
    }
    &-options {
      border-bottom: 1px solid grey;
      display: inline-grid;
      grid-template-columns: auto auto auto;
      & > button {
        padding: 0.15rem;
        background: none;
        border-radius: 0px;
        border: none;
        &:hover {
          cursor: pointer;
          background-color: #ebebeb;
        }
        &:first-child {
          border-right: 1px solid grey;
        }
        &:last-child {
          border-left: 1px solid grey;
        }
      }
    }
  }

  .Content {
    transition: all 0.5s ease-in-out;
    height: 0rem;
    display: flex;
    flex-direction: column;
  }

  .ContentOpened {
    height: min-content;
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
    border-radius: 10px 10px 0px 0px;

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
