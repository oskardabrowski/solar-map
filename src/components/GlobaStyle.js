import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
  margin: 0;
  padding: 0;
}
body {
  overflow: hidden;
}

.leaflet-measure-path-measurement {
    position: absolute;
    font-size: 10px;
    color: black;
    text-shadow: -1px 0 0 white,
        -1px -1px 0 white,
        0 -1px 0 white,
        1px -1px 0 white,
        1px 0 0 white,
        1px 1px 0 white,
        0 1px 0 white,
        -1px 1px 0 white;
    white-space: nowrap;
    transform-origin: 0;
    pointer-events: none;
}

.leaflet-measure-path-measurement>div {
    position: relative;
    margin-top: -25%;
    left: -50%;
}
`;

export default GlobalStyle;
