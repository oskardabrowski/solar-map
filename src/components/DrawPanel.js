import React, { useState, useRef, useEffect, useContext } from "react";
import styled from "styled-components";
import DraggableComponent from "react-draggable";
import {
  IoMdArrowDropright,
  IoMdArrowDropdown,
  IoMdClose,
} from "react-icons/io";
import { MapContext } from "./GlobalContext";

const DrawPanel = () => {
  const window = useRef(null);
  const EditionRef = useRef();
  const [opened, setOpened] = useState(true);
  const { removeTool, solarPanelDrawing, setSolarPanelDrawing, panelArea } =
    useContext(MapContext);
  const [toolsSet, setToolsSet] = useState(false);

  const DrawSpecialPolygon = () => {
    setSolarPanelDrawing(true);
    const DocumentTools = document.querySelector(".leaflet-pm-draw");
    const PolygonButton = DocumentTools.querySelector(
      "div[title='Narysuj wielokąt']"
    );
    const btn = PolygonButton.querySelector("a");
    btn.click();
  };
  const EditSpecialPolygon = () => {
    const DocumentTools = document.querySelector(".leaflet-pm-edit");
    const PolygonButton = DocumentTools.querySelector("div[title='Edytuj']");
    const btn = PolygonButton.querySelector("a");
    btn.click();
  };
  const DeleteSpecialPolygon = () => {
    const DocumentTools = document.querySelector(".leaflet-pm-edit");
    const PolygonButton = DocumentTools.querySelector("div[title='Usuń']");
    const btn = PolygonButton.querySelector("a");
    btn.click();
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
            <span>Rysuj panel</span>
          </div>
          <button class="BtnClose" onClick={() => removeTool("DrawPanel")}>
            <IoMdClose />
          </button>
        </div>
        <div>
          <div
            ref={EditionRef}
            className={`Content ${opened && "ContentOpened"}`}
          >
            <div>
              <button onClick={() => DrawSpecialPolygon()}>Rysuj</button>
              <button onClick={() => EditSpecialPolygon()}>Edytuj</button>
              <button onClick={() => DeleteSpecialPolygon()}>Usuń</button>
            </div>
            <div>
              <span>
                Area: {panelArea.toFixed(2)} m<sup>2</sup>
              </span>
            </div>
          </div>
        </div>
      </LMWindow>
    </DraggableComponent>
  );
};

export default DrawPanel;

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
  right: 350px;
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
    /* height: 25rem; */
    display: flex;
    flex-direction: column;

    & > div {
      display: flex;
      flex-direction: column;
    }
  }

  .ContentOpened {
    /* height: min-content; */
    height: 25rem;
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
