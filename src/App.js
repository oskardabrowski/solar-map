import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Map from "./pages/Map";
import Model from "./pages/Model";
import Header from "./components/Header";
import styled from "styled-components";
import Menu from "./components/Menu";

import ReduxProvider from "./components/ReduxProvider";
import { MapProvider } from "./components/GlobalContext";
import Tools from "./components/Tools";

function App() {
	return (
		<ReduxProvider>
			<MapProvider>
				<Router>
					<Container>
						<Tools />
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
		</ReduxProvider>
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
		position: relative;
	}
`;
