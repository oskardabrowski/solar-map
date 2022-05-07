import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Draggable from "react-draggable";
import {
  IoMdArrowDropright,
  IoMdArrowDropdown,
  IoMdClose,
} from "react-icons/io";
import { Resizable, ResizableBox } from "react-resizable";

const LayersManagment = () => {
  const window = useRef(null);
  const [opened, setOpened] = useState(true);
  const [size, setSize] = useState(400);
  const sizeRef = useRef(null);
  const [activeLayers, setActiveLayers] = useState([
    { code: "solarRoofs", isOpened: true },
  ]);

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

  return (
    <Draggable nodeRef={window} handle="div.PanelTitle">
      <LMWindow ref={window}>
        <div className="PanelTitle">
          <div>
            <button
              className="PanelTitle-BtnOpen"
              onClick={() => setOpened(!opened)}
            >
              {opened ? <IoMdArrowDropdown /> : <IoMdArrowDropright />}
            </button>
            <span>Zarządzanie warstwami</span>
          </div>
          <button class="BtnClose">
            <IoMdClose />
          </button>
        </div>
        <ResizableBox
          className="ContentContainer"
          width={"100%"}
          height={size}
          ref={sizeRef}
          axis="y"
        >
          <div className="Content">
            <div>
              <button className="Content-btn">
                <span className="Content-btn-ico">
                  {opened ? <IoMdArrowDropdown /> : <IoMdArrowDropright />}
                </span>
                Klasyfikacja dachów
              </button>
              <div className="Content-legend">
                {legendRoofStore.map((el, index) => (
                  <div className="RoofsLegendElement">
                    <div style={{ backgroundColor: `${el.color}` }}></div>
                    <span>
                      {el.desc}
                      <sup>2</sup>
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <button className="Content-btn">
                <span className="Content-btn-ico">
                  {opened ? <IoMdArrowDropdown /> : <IoMdArrowDropright />}
                </span>
                Klasyfikacja powierzchni
              </button>
              <div className="Content-legend">
                {legendRoofStore.map((el, index) => (
                  <div className="RoofsLegendElement">
                    <div style={{ backgroundColor: `${el.color}` }}></div>
                    <span>
                      {el.desc}
                      <sup>2</sup>
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <button className="Content-btn">
                <span className="Content-btn-ico">
                  {opened ? <IoMdArrowDropdown /> : <IoMdArrowDropright />}
                </span>
                Gradient Powierzchni
              </button>
              <div className="Content-legend">
                <div className="Content-legend-gradient">
                  <div className="Content-legend-gradient-box"></div>
                  <div className="Content-legend-gradient-desc">
                    <span>
                      1220 kWh/m<sup>2</sup>
                    </span>
                    <span>
                      610 kWh/m<sup>2</sup>
                    </span>
                    <span>
                      0 kWh/m<sup>2</sup>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <button className="Content-btn">
                <span className="Content-btn-ico">
                  {opened ? <IoMdArrowDropdown /> : <IoMdArrowDropright />}
                </span>
                Widoczność nieba
              </button>
              <div className="Content-legend">
                <div className="Content-legend-gradient">
                  <div className="Content-legend-gradient-view"></div>
                  <div className="Content-legend-gradient-desc">
                    <span>100%</span>
                    <span>50%</span>
                    <span>0%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ResizableBox>
      </LMWindow>
    </Draggable>
  );
};

export default LayersManagment;

const LMWindow = styled.div`
  position: absolute;
  top: 80px;
  right: 10px;
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

  .Content {
    height: 100%;
    margin-bottom: 5rem;
    &-btn {
      width: 100%;
      display: flex;
      align-items: left;
      font-size: 0.9rem;
      margin-top: 0.25rem;
      background: none;
      border: none;
      &-ico {
        margin: 0rem 0.5rem;
        font-size: 1rem;
      }
    }

    &-legend {
      padding-bottom: 1rem;
      &-gradient {
        display: flex;
        justify-content: left;
        &-box {
          height: 15rem;
          width: 4rem;
          background: linear-gradient(to top, #2892c7, #ffef14, #e81014);
          margin-left: 0.5rem;
          margin-bottom: 0.5rem;
          border: 1.5px solid black;
        }
        &-view {
          height: 15rem;
          width: 4rem;
          background: linear-gradient(to top, black, white);
          margin-left: 0.5rem;
          margin-bottom: 0.5rem;
          border: 1.5px solid black;
        }
        &-desc {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-bottom: 0.5rem;
          margin-left: 0.5rem;
          font-family: "Arial";
        }
      }
    }
  }

  .react-resizable {
    position: relative;
    overflow-y: scroll;
    ::-webkit-scrollbar {
      width: 10px;
    }
    ::-webkit-scrollbar-track {
      background: white;
    }
    ::-webkit-scrollbar-thumb {
      background: #001f45;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #004aa5;
      cursor: pointer;
    }
  }
  .react-resizable-handle {
    position: fixed;
    width: 100%;
    height: 1rem;
    bottom: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    &::before {
      content: "...";
      margin-bottom: 1rem;
      font-size: 2rem;
      color: grey;
    }
    background-color: darkgray;
    cursor: n-resize;
  }

  .Content {
    resize: vertical;
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
