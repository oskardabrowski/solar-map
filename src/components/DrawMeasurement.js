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
  const EditionRef = useRef();
  const [opened, setOpened] = useState(true);
  const [toolActive, setToolActive] = useState("");
  const { removeTool, setMeasurementShape } = useContext(MapContext);
  const [toolsSet, setToolsSet] = useState(false);

  const ShowOptions = (el) => {
    const ElToShow = el.closest(".leaflet-pm-actions-container");
    const AllActions = document.querySelectorAll(
      "leaflet-pm-actions-container"
    );
    AllActions.forEach((el) => {
      el.classList.remove("show-options");
    });
    ElToShow.classList.add("show-options");
  };

  // useEffect(() => {
  //   const DocumentTools = document.querySelector(".leaflet-pm-draw");
  //   EditionRef.current.appendChild(DocumentTools);
  //   // const DocumentToolsEdit = document.querySelector(".leaflet-pm-edit");
  //   // EditionRef.current.appendChild(DocumentToolsEdit);
  // }, []);

  useEffect(() => {
    if (toolsSet) {
      const DocumentTools = document.querySelector(".leaflet-pm-draw");
      const ToolsArr = DocumentTools.querySelectorAll(".button-container");
      const EditTools = document.querySelector(".leaflet-pm-edit");
      const EditAllTools = EditTools.querySelectorAll(".button-container");
      ToolsArr.forEach((el) => {
        const title = el.getAttribute("title");
        const titleParagraph = document.createElement("p");
        titleParagraph.classList.add("ToolTitle");
        titleParagraph.textContent = title;
        const btn = el.querySelector(".leaflet-buttons-control-button");
        console.log(btn.querySelector(".ToolTitle"));
        if (!btn.querySelector(".ToolTitle")) {
          btn.appendChild(titleParagraph);
        }
      });
      EditAllTools.forEach((el) => {
        let title = el.getAttribute("title");
        console.log(!el.getAttribute("title"));
        if (!el.getAttribute("title")) {
          title = "Obróć element";
        }
        const titleParagraph = document.createElement("p");
        titleParagraph.classList.add("ToolTitle");
        titleParagraph.textContent = title;
        const btn = el.querySelector(".leaflet-buttons-control-button");
        console.log(btn.querySelector(".ToolTitle"));
        if (!btn.querySelector(".ToolTitle")) {
          btn.appendChild(titleParagraph);
        }
      });
    }
  }, [toolsSet]);

  useEffect(() => {
    setTimeout(() => {
      const DocumentTools = document.querySelector(".leaflet-pm-draw");
      EditionRef.current.appendChild(DocumentTools);
      const EditTools = document.querySelector(".leaflet-pm-edit");
      EditionRef.current.appendChild(EditTools);
      setTimeout(() => {
        setToolsSet(true);
      }, 10);
    }, 10);
  }, []);

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
        <GeomanStyles>
          <div
            ref={EditionRef}
            className={`Content ${opened && "ContentOpened"}`}
          >
            {/* {ToolsList.map((el, index) => {
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
          })} */}
          </div>
        </GeomanStyles>
      </LMWindow>
    </DraggableComponent>
  );
};

export default DrawMeasurement;

const GeomanStyles = styled.div`
  .button-container {
    width: 100%;
    height: auto;
    background-color: white;
    color: black;
    border-bottom: 1px solid grey;
    padding: 0px !important;
    margin: 0px !important;
  }
  a.leaflet-buttons-control-button {
    width: 100% !important;
    height: 2rem !important;
    padding: 0 !important;
    display: flex;
    align-items: center;
    font-family: "Arial";
    color: black;
    text-decoration: none;
    /* border-bottom: 1px solid grey; */
    & > div {
      width: 1.2rem !important;
      margin: 0rem 1rem;
    }
  }
  .leaflet-pm-actions-container {
    position: relative !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    display: none;
    min-height: 30px;
    justify-content: center;

    & > a {
      border-bottom: 1px solid grey !important;
      &:last-child {
        border-bottom: 1.5px solid black !important;
      }
    }
  }
  .leaflet-pm-action {
    display: flex !important;
    align-items: center;
    justify-content: center;
    border-radius: 0px;
    background-color: white !important;
    color: black !important;
    text-decoration: none;
    font-family: "Arial";
  }
  .leaflet-pm-draw {
    &:last-child {
      border-bottom: 1px solid grey !important;
    }
  }
  .show-options {
    display: flex !important;
  }
`;

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
