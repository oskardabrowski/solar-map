import React, { useState, useRef, useEffect, useContext } from "react";
import styled from "styled-components";
import DraggableComponent from "react-draggable";
import {
  IoMdArrowDropright,
  IoMdArrowDropdown,
  IoMdClose,
} from "react-icons/io";
import { MdDraw, MdEditLocationAlt } from "react-icons/md";
import { BsEraserFill } from "react-icons/bs";
import { MapContext } from "./GlobalContext";

const DrawPanel = () => {
  const window = useRef(null);
  const EditionRef = useRef();
  const ActionsDrawRef = useRef();
  const ActionsEditRef = useRef();
  const ActionsRemoveRef = useRef();
  const [opened, setOpened] = useState(true);
  const { removeTool, solarPanelDrawing, setSolarPanelDrawing, panelArea, buildingMean} =
    useContext(MapContext);
  const [toolsSet, setToolsSet] = useState(false);

  useEffect(() => {
    const arr = [ActionsDrawRef, ActionsEditRef, ActionsRemoveRef];
    if (!solarPanelDrawing) {
      arr.forEach((el) => {
        el.current.style.display = "none";
      });
    }
  }, [solarPanelDrawing]);

  const DrawSpecialPolygon = (e, action) => {
    setSolarPanelDrawing(true);
    const DocumentTools = document.querySelector(".leaflet-pm-draw");
    const PolygonButton = DocumentTools.querySelector(
      "div[title='Narysuj wielokąt']"
    );
    const actionsBtns = PolygonButton.querySelector(
      "div.leaflet-pm-actions-container"
    );
    if (action === "start") {
      const btn = PolygonButton.querySelector("a");
      const actions = e.target.closest("span").querySelector(".actions");
      actions.style.display = "flex";
      btn.click();
    } else if (action === "finish") {
      const btn = actionsBtns.querySelector("a.action-finish");
      btn.click();
    } else if (action === "removeVertex") {
      const btn = actionsBtns.querySelector("a.action-removeLastVertex");
      btn.click();
    } else if (action === "cancel") {
      const btn = actionsBtns.querySelector("a.action-cancel");
      btn.click();
    }
  };
  const EditSpecialPolygon = (e, action) => {
    const DocumentTools = document.querySelector(".leaflet-pm-edit");
    const EditButton = DocumentTools.querySelector("div[title='Edytuj']");
    const actionsBtns = EditButton.querySelector(
      "div.leaflet-pm-actions-container"
    );
    if (action === "Edit") {
      const btn = EditButton.querySelector("a");
      const actions = e.target.closest("span").querySelector(".actions");
      actions.style.display = "flex";
      if (solarPanelDrawing) {
        setSolarPanelDrawing(false);
      } else {
        setSolarPanelDrawing(true);
      }
      btn.click();
    } else if (action === "finish") {
      const btn = actionsBtns.querySelector("a.action-finishMode");
      setSolarPanelDrawing(false);
      btn.click();
    }
  };
  const DeleteSpecialPolygon = (e, action) => {
    setSolarPanelDrawing(true);
    const DocumentTools = document.querySelector(".leaflet-pm-edit");
    const DelButton = DocumentTools.querySelector("div[title='Usuń']");
    const actionsBtns = DelButton.querySelector(
      "div.leaflet-pm-actions-container"
    );
    if (action === "Delete") {
      const btn = DelButton.querySelector("a");
      ActionsRemoveRef.current.style.display = "flex";
      if (solarPanelDrawing) {
        setSolarPanelDrawing(false);
      } else {
        setSolarPanelDrawing(true);
      }
      btn.click();
    } else if (action === "cancel") {
      const btn = actionsBtns.querySelector("a.action-finishMode");
      setSolarPanelDrawing(false);
      btn.click();
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
            <div className="Controls">
              <span>
                <button onClick={(e) => DrawSpecialPolygon(e, "start")}>
                  <MdDraw className="ico" />
                  Rysuj
                </button>
                <span className="actions" ref={ActionsDrawRef}>
                  <button onClick={(e) => DrawSpecialPolygon(e, "finish")}>
                    Zakończ
                  </button>
                  <button
                    onClick={(e) => DrawSpecialPolygon(e, "removeVertex")}
                  >
                    Usuń ostatni punkt
                  </button>
                  <button onClick={(e) => DrawSpecialPolygon(e, "cancel")}>
                    Anuluj
                  </button>
                </span>
              </span>
              <span>
                <button onClick={(e) => EditSpecialPolygon(e, "Edit")}>
                  <MdEditLocationAlt className="ico" />
                  Edytuj
                </button>
                <span className="actions" ref={ActionsEditRef}>
                  <button onClick={(e) => EditSpecialPolygon(e, "finish")}>
                    Zakończ
                  </button>
                </span>
              </span>
              <span>
                <button
                  className="actions"
                  onClick={(e) => DeleteSpecialPolygon(e, "Delete")}
                >
                  <BsEraserFill className="ico" />
                  Usuń
                </button>
                <span ref={ActionsRemoveRef}>
                  <button onClick={(e) => DeleteSpecialPolygon(e, "cancel")}>
                    Zakończ
                  </button>
                </span>
              </span>
            </div>
            <div>
              <span>
                Dopływ energii: {panelArea * buildingMean} kWh/m<sup>2</sup>
              </span>
            </div>
          </div>
        </div>
      </LMWindow>
    </DraggableComponent>
  );
};

export default DrawPanel;

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

  .Content {
    transition: all 0.5s ease-in-out;
    height: 0rem;
    /* height: 25rem; */
    display: flex;
    flex-direction: column;

    & > div.Controls {
      display: flex;
      flex-direction: column;
      & > span {
        width: 100%;
        border-top: 1.5px solid grey;
        border-bottom: 1.5px solid grey;
        & > button {
          width: 100%;
          padding: 0.25rem;
          font-size: 1rem;
          display: flex;
          justify-content: left;
          align-items: center;
          border-radius: 0px;
          border: none;
          background: none;
          & > .ico {
            margin: 0rem 0.25rem 0rem 0rem;
          }
        }

        & > span {
          display: flex;
          flex-direction: column;
          display: none;

          & > button {
            padding: 0.25rem 0.5rem;
            border-radius: 0px;
            border: none;
            background: none;
            border-top: 1px solid grey;
            /* border-bottom: 1px solid grey; */
          }
        }
      }
    }
  }

  .ContentOpened {
    /* height: min-content; */
    height: 25rem;
  }

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
