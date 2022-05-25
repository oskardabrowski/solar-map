import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import AppLogo from "../images/SolarMapLogo.svg";
import UnivesityLogo from "../images/UMKAkronimLogo.svg";

const Head = styled.header`
  width: 100%;
  background-color: #001f45;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10000;
  overflow: hidden;
  position: relative;
  & > img {
    height: 2.5rem;
    margin: 1rem;
    width: auto;
  }

  .ToolsContainer {
    position: absolute;
    bottom: 100%;
    left: 0%;
  }
`;

const Header = () => {
  const ToolsContainerRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      const DocumentTools = document.querySelector(".leaflet-pm-draw");
      ToolsContainerRef.current.appendChild(DocumentTools);
      const EditTools = document.querySelector(".leaflet-pm-edit");
      ToolsContainerRef.current.appendChild(EditTools);
    }, 10);
  }, []);
  return (
    <Head className="header">
      <img className="AppLogo" src={AppLogo} alt={AppLogo} />
      <img className="UniversityLogo" src={UnivesityLogo} alt={UnivesityLogo} />
      <div className="ToolsContainer" ref={ToolsContainerRef}></div>
    </Head>
  );
};

export default Header;
