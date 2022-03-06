import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Map from './pages/Map';
import Model from './pages/Model';
import Header from './components/Header';
import styled from 'styled-components';
import Menu from './components/Menu';

import { MapProvider } from "./components/GlobalContext";

function App() {
  return (
    <MapProvider>
      <Router>
        <Container>
          <Header />
          <div className="appBody">
            <Menu />
            <Routes>
              <Route exact path="/" element={<Map />} />
              <Route path="/model" element={<Model />} />
            </Routes>
          </div>
        </Container>
      </Router>
    </MapProvider>
  );
}

export default App;

const Container = styled.div`
display: flex;
width: 100%;
height: 100vh;
flex-direction: column;

& > .appBody {
  height: 100%;
  width: 100%;
  display: flex;
}
`;

// @import url("https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Work+Sans:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap");
