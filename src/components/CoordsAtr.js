import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { MapContext } from "./GlobalContext";
import AllMaps from "./Maps";

const CoordsAtr = () => {
	const { coords, mapTile } = useContext(MapContext);
	const [proj, setProj] = useState("84");
	const [puwg92, setpuwg92] = useState([0, 0]);
	const [pl2000, setpl2000] = useState([0, 0]);
	const setProjFc = (e) => {
		const newproj = e.target.value;
		setProj(newproj);
	};

	function WGS86toPUWG92(lng, lat) {
		const lngp = Array.from(String(lng.toFixed(4)));
		const latp = Array.from(String(lat.toFixed(4)));

		const p1x = lngp.splice(0, 2);
		const p1y = latp.splice(0, 2);
		const p2x = lngp.splice(1, 2);
		const p2y = latp.splice(1, 2);
		const p3x = lngp.splice(1, 2);
		const p3y = latp.splice(1, 2);

		const p1xflat = p1x[0] + p1x[1];
		const p1yflat = p1y[0] + p1y[1];
		const p2xflat = p2x[0] + p2x[1];
		const p2yflat = p2y[0] + p2y[1];
		const p3xflat = p3x[0] + p3x[1];
		const p3yflat = p3y[0] + p3y[1];

		const calculateLat =
			parseInt(p1xflat) + parseInt(p2xflat) / 60 + parseInt(p3xflat) / 3600;
		const calculateLng =
			parseInt(p1yflat) + parseInt(p2yflat) / 60 + parseInt(p3yflat) / 3600;

		const x = calculateLng;
		const y = calculateLat;

		const zone = 19;
		const pi = Math.PI;
		const ParamE = 0.0818191910428;

		const RadiansLat = y * (pi / 180);
		const RadiansLng = x * (pi / 180);
		const RadiansZone = zone * (pi / 180);

		const Param1 =
			2 *
			(Math.atan(
				Math.pow(
					(1 - ParamE * Math.sin(RadiansLat)) /
						(1 + ParamE * Math.sin(RadiansLat)),
					ParamE / 2
				) * Math.tan(RadiansLat / 2 + pi / 4)
			) -
				pi / 4);

		const a = 0.0008377318247344;
		const b = 0.0000007608527788826;
		const c = 0.000000001197638;
		const d = 0.000000000002443;

		const Param2 =
			-0.5 *
			Math.log(
				(1 - Math.cos(Param1) * Math.sin(RadiansLng - RadiansZone)) /
					(1 + Math.cos(Param1) * Math.sin(RadiansLng - RadiansZone))
			);

		const Param3 = Math.atan(
			Math.sin(Param1) / (Math.cos(Param1) * Math.cos(RadiansLng - RadiansZone))
		);

		const Param4 = 6367449.14577;

		const fcLat =
			Param4 *
			(Param3 +
				a * Math.sin(2 * Param3) * Math.cosh(2 * Param2) +
				b * Math.sin(4 * Param3) * Math.cosh(4 * Param2) +
				c * Math.sin(6 * Param3) * Math.cosh(6 * Param2) +
				d * Math.sin(8 * Param3) * Math.cosh(8 * Param2));
		const fcLng =
			Param4 *
			(Param2 +
				a * Math.cos(2 * Param3) * Math.sinh(2 * Param2) +
				b * Math.cos(4 * Param3) * Math.sinh(4 * Param2) +
				c * Math.cos(6 * Param3) * Math.sinh(6 * Param2) +
				d * Math.cos(8 * Param3) * Math.sinh(8 * Param2));

		const Param5 = 0.9993;

		const X = Param5 * fcLat - 5300000;
		const Y = Param5 * fcLng + 500000;

		return [X, Y];
	}

	function WGS84toPL2000(lng, lat) {
		const lngp = Array.from(String(lng.toFixed(4)));
		const latp = Array.from(String(lat.toFixed(4)));

		const p1x = lngp.splice(0, 2);
		const p1y = latp.splice(0, 2);
		const p2x = lngp.splice(1, 2);
		const p2y = latp.splice(1, 2);
		const p3x = lngp.splice(1, 2);
		const p3y = latp.splice(1, 2);

		const p1xflat = p1x[0] + p1x[1];
		const p1yflat = p1y[0] + p1y[1];
		const p2xflat = p2x[0] + p2x[1];
		const p2yflat = p2y[0] + p2y[1];
		const p3xflat = p3x[0] + p3x[1];
		const p3yflat = p3y[0] + p3y[1];

		const calculateLat =
			parseInt(p1xflat) + parseInt(p2xflat) / 60 + parseInt(p3xflat) / 3600;
		const calculateLng =
			parseInt(p1yflat) + parseInt(p2yflat) / 60 + parseInt(p3yflat) / 3600;

		const x = calculateLng;
		const y = calculateLat;

		const zone = 15;
		const pi = Math.PI;
		const ParamE = 0.0818191910428;

		const RadiansLat = y * (pi / 180);
		const RadiansLng = x * (pi / 180);
		const RadiansZone = zone * (pi / 180);

		const Param1 =
			2 *
			(Math.atan(
				Math.pow(
					(1 - ParamE * Math.sin(RadiansLat)) /
						(1 + ParamE * Math.sin(RadiansLat)),
					ParamE / 2
				) * Math.tan(RadiansLat / 2 + pi / 4)
			) -
				pi / 4);

		const Param2 =
			-0.5 *
			Math.log(
				(1 - Math.cos(Param1) * Math.sin(RadiansLng - RadiansZone)) /
					(1 + Math.cos(Param1) * Math.sin(RadiansLng - RadiansZone))
			);

		const Param3 = Math.atan(
			Math.sin(Param1) / (Math.cos(Param1) * Math.cos(RadiansLng - RadiansZone))
		);

		const Param4 = 6367449.14577;

		const a = 0.0008377318247344;
		const b = 0.0000007608527788826;
		const c = 0.000000001197638;
		const d = 0.000000000002443;

		const fcLat =
			Param4 *
			(Param3 +
				a * Math.sin(2 * Param3) * Math.cosh(2 * Param2) +
				b * Math.sin(4 * Param3) * Math.cosh(4 * Param2) +
				c * Math.sin(6 * Param3) * Math.cosh(6 * Param2) +
				d * Math.sin(8 * Param3) * Math.cosh(8 * Param2));
		const fcLng =
			Param4 *
			(Param2 +
				a * Math.cos(2 * Param3) * Math.sinh(2 * Param2) +
				b * Math.cos(4 * Param3) * Math.sinh(4 * Param2) +
				c * Math.cos(6 * Param3) * Math.sinh(6 * Param2) +
				d * Math.cos(8 * Param3) * Math.sinh(8 * Param2));

		const Param5 = 0.999923;

		const X = Param5 * fcLat - 0;
		const Y = Param5 * fcLng + 5500000;

		return [X, Y];
	}

	useEffect(() => {
		setpuwg92(WGS86toPUWG92(coords.lat, coords.lng));
		setpl2000(WGS84toPL2000(coords.lat, coords.lng));
	}, [coords]);

	return (
		<Wrapper>
			<div>
				<form>
					<select onChange={(e) => setProjFc(e)}>
						<option value="84">WGS 84</option>
						<option value="92">PUWG 1992</option>
						<option value="2000">PL 2000</option>
					</select>
				</form>
			</div>
			<div>
				{proj === "84" && `${coords.lng.toFixed(4)}, `}
				{proj === "84" && `${coords.lat.toFixed(4)}`}
			</div>
			<div>
				{proj === "92" && `${puwg92[0].toFixed(4)}, `}
				{proj === "92" && `${puwg92[1].toFixed(4)}`}
			</div>
			<div>
				{proj === "2000" && `${pl2000[0].toFixed(4)}, `}
				{proj === "2000" && `${pl2000[1].toFixed(4)}`}
			</div>
			<div>
				{AllMaps.baseMaps.map((mapel, index) => {
					if (mapTile === mapel.code) {
						return (
							<span key={index}>
								<a href="https://leafletjs.com/">Leaflet</a>{" "}
								{mapel.attributionCode}
							</span>
						);
					}
				})}
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	position: absolute;
	right: 0;
	bottom: 0;
	background-color: white;
	z-index: 11000;
	padding: 0.25rem;
	font-size: 0.75rem;
	display: flex;
	width: max-content;
	font-family: "Work Sans";
	border-radius: 15px 0px 0px 0px;

	& > div {
		margin: 0rem 0.25rem;
		& > form {
			& > select {
				outline: none;
				border: none;
			}
		}

		& > a {
			text-decoration: none;
			color: blue;
		}
	}
`;

export default CoordsAtr;
