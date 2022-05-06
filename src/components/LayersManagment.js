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
          <span className="text">
            Only resizable by "y" axisssssssssssssssssssssssssssssssssssssss.
          </span>
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

  .react-resizable {
    position: relative;
  }
  .react-resizable-handle {
    position: absolute;
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
