import React, { useContext } from "react";
import { MapContext } from "./GlobalContext";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";

const InfoWindow = () => {
	const { setInfoOpen } = useContext(MapContext);
	return (
		<Window>
			<div className="Info">
				<div className="Info-header">
					<div>Informacje o aplikacji</div>
					<button onClick={() => setInfoOpen(false)}>
						<IoMdClose />
					</button>
				</div>
				<div className="Info-content">
					<article>
						<h1>Mapa Solarna Torunia</h1>
						<h2>
							Aplikacja powstała jako projekt magisterski w pracy o identycznym
							tytule.
						</h2>
						<h3>Autor: Oskar Dąbrowski</h3>
						<h3>
							Opiekun pracy dyplomowej: dr hab. Mieczysław Kunz, prof. UMK
						</h3>
						<p>
							Ma ona na celu przedstawienie rozkładu promieniowania słonecznego
							w Toruniu oraz udostępnienie narzędzi wspomagających podjęcie
							decyzji o odpowiednim ulokowaniu instalacji fotowoltaicznej aby
							zapewnić opłacalność inwestycji. Projekt ma charakter
							niekomercyjny. (en. Application is created for non-commercial
							purpose.)
						</p>
						<p>
							Powstała ona z wykorzystnaiem{" "}
							<a href="https://pl.reactjs.org/">ReactJS</a> oraz szeregu
							bibliotek i pluginów usprawniających jej działanie. Główną
							biblioteką wykorzystaną w aplikacji jest{" "}
							<a href="https://leafletjs.com/">Leaflet</a>, będąca dedykowaną do
							tworzenia internetowych aplikacji mapowych. W celu usprawnienia
							pracy wykorzystano również{" "}
							<a href="https://react-leaflet.js.org/">React Leaflet</a>, czyli
							komponenty React przystosowujące ją do tego frameworka.
						</p>
						<p>
							Inne biblioteki wykorzystane w aplikacji:
							<ul>
								<li>
									<a href="https://turfjs.org/">TURF</a>
								</li>
								<li>
									<a href="https://threejs.org/">Three.js</a>
								</li>
								<li>
									<a href="https://sweetalert.js.org/guides/">SweetAlert</a>
								</li>
								<li>
									<a href="https://styled-components.com/">Styled Components</a>
								</li>
								<li>
									<a href="https://redux.js.org/">Redux</a>
								</li>
								<li>
									<a href="https://reactrouter.com/">React Router</a>
								</li>
								<li>
									<a href="https://github.com/react-grid-layout/react-resizable">
										React Resizable
									</a>
								</li>
								<li>
									<a href="https://mhnpd.github.io/react-loader-spinner/">
										React Spinners
									</a>
								</li>
								<li>
									<a href="https://react-icons.github.io/react-icons/">
										React Icons
									</a>
								</li>
								<li>
									<a href="https://github.com/nfl/react-helmet#readme">
										React Helmet
									</a>
								</li>
								<li>
									<a href="https://github.com/react-grid-layout/react-draggable">
										React Draggable
									</a>
								</li>
								<li>
									<a href="https://github.com/atlassian/react-beautiful-dnd#readme">
										React Beautiful dnd
									</a>
								</li>
								<li>
									<a href="https://geoman.io/">Geoman</a>
								</li>
								<li>
									<a href="https://github.com/grinat/leaflet-simple-map-screenshoter">
										Leaflet Simple Map Screenshoter
									</a>
								</li>
								<li>
									<a href="https://www.telerik.com/kendo-react-ui/">
										Kendo React
									</a>
								</li>
								<li>
									<a href="https://github.com/ProminentEdge/leaflet-measure-path">
										Leaflet Measure Path
									</a>
								</li>
							</ul>
							<span>
								Pozostałe biblioteki są częścią składową innych lub mają
								charakter pomocniczy.
							</span>
						</p>
						<p>
							W aplikacji zaimplementowno mapy bazowe udostępnione na licencjach
							pozwalających na ich komercyjne bądź niekomercyjne wykorzystanie:
							<ul>
								<li>
									<a href="http://osm.org/copyright">OpenStreetMap</a>
								</li>
								<li>
									<a href="https://www.hotosm.org/">
										Humanitarian OpenStreetMap Team
									</a>
								</li>
								<li>
									<a href="https://opentopomap.org">OpenTopoMap</a>
								</li>
								<li>
									<a href="https://carto.com/attributions">Carto DB Dark</a>
								</li>
								<li>
									<a href="https://carto.com/attributions">Carto DB Voyager</a>
								</li>
								<li>
									<a href="https://carto.com/attributions">Carto DB Positron</a>
								</li>
								<li>
									<a href="http://stamen.com">Stamen Toner Lite</a>
								</li>
								<li>
									<a href="https://www.arcgis.com/home/item.html?id=10df2279f9684e4a9f6a7f08febac2a9 ">
										Esri World Imagery
									</a>
								</li>
								<li>
									<a href="https://www.geoportal.gov.pl/">
										Ortofotomapa 2021 (zmodyfikowano)
									</a>
								</li>
							</ul>
						</p>
						<p>
							Aplikacja zawiera warstwy będące wynikiem analizy na wygenerownym
							z chmury punktów numerycznym modelu pokryca terenu. Przetworzonym
							do paczki kafelków za pomocą wtyczki QTiles w programie QGIS.
							Zawiera również trójwymiarowe modele budynków wygenerowane z
							plików *.gml pobranych z{" "}
							<a href="https://www.geoportal.gov.pl/">www.geoportal.gov.pl</a>{" "}
							poddanych automatycznej wektoryzacji do formatu *.gltf. Testy
							aplikacji przeprowadzono dwojako, automatycznie oraz manualnie.
							Pierwsze napisano za pomocą środowiska do testów end to end —{" "}
							<a href="https://www.cypress.io/">Cypress</a>, drugie
							przeprowadzono anonimowo przy udziale innych studentów.
						</p>
					</article>
				</div>
			</div>
		</Window>
	);
};

export default InfoWindow;

const Window = styled.div`
	width: 100%;
	height: 100vh;
	position: absolute;
	top: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.35);
	z-index: 1000000000000;

	display: flex;
	align-items: center;
	justify-content: center;

	.Info {
		background-color: white;
		width: 80%;
		height: 80%;
		display: flex;
		flex-direction: column;
		border-radius: 15px;
		overflow: hidden;

		&-header {
			width: 100%;
			background-color: white;
			height: 7.5%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			& > div {
				margin: 0rem 1rem;
				font-family: "Work Sans";
				font-size: 1.1rem;
			}
			& > button {
				margin: 0rem 1rem;
				font-size: 1.35rem;
				border: none;
				background: none;
				display: flex;
				justify-content: center;
				align-items: center;

				&:hover {
					cursor: pointer;
				}
			}
		}
		&-content {
			width: 100%;
			background-color: white;
			height: 92.5%;
			font-family: "Roboto";
			overflow-y: scroll;
			display: flex;
			justify-content: center;

			& > article {
				width: 95%;
				margin-bottom: 2rem;
				height: max-content;
				& > h1,
				h2,
				h3 {
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-top: 0.5rem;
				}
				h2 {
					font-size: 1.2rem;
				}

				& > p {
					width: 100%;
					text-align: justify;
					margin-top: 1rem;
					line-height: 1.75rem;

					& > ul {
						margin-left: 1rem;
					}

					& > span {
						font-size: 0.8rem;
						color: grey;
					}
				}
			}

			::-webkit-scrollbar {
				width: 10px;
			}
			::-webkit-scrollbar-track {
				background: #f1f1f1;
			}
			::-webkit-scrollbar-thumb {
				background: #888;
			}
			::-webkit-scrollbar-thumb:hover {
				background: #555;
			}
		}
	}
`;
