import React, { Suspense, useContext, useEffect } from "react";
import styled from "styled-components";
import { Canvas, useLoader } from "@react-three/fiber";
import { Environment, OrbitControls, FlyControls } from "@react-three/drei";
import CityModel from "../components/CityModel";
import { MapContext } from "../components/GlobalContext";
import EndFetchingData from "../components/EndFetchingData";
import { Grid } from "react-loader-spinner";

const DataLoader = () => {
	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Grid color="#001f45" width={100} height={100} />
		</div>
	);
};

const Model = () => {
	const { skyHDR, flight } = useContext(MapContext);

	return (
		<ThreeModel>
			<Suspense className="Center" fallback={<DataLoader />}>
				<Canvas camera={{ fov: 50, position: [-10, 45, 20] }}>
					<CityModel />
					{skyHDR === "Terrain" && (
						<Environment
							background={true}
							files={"Terrain-sky.hdr"}
							path={"/HDR/"}
						/>
					)}
					{skyHDR === "Sunflowers" && (
						<Environment
							background={true}
							files={"Sunflowers.hdr"}
							path={"/HDR/"}
						/>
					)}
					{skyHDR === "Clear" && (
						<Environment background={true} files={"clear.hdr"} path={"/HDR/"} />
					)}

					{flight ? (
						<FlyControls
							enableDamping={false}
							movementSpeed={5}
							rollSpeed={0.5}
							dragToLook={true}
							makeDefault={0}
						/>
					) : (
						<OrbitControls />
					)}
				</Canvas>
				<EndFetchingData />
			</Suspense>
		</ThreeModel>
	);
};

export default Model;

//background={true} files={'Terrain.png'} path={'/'}

const ThreeModel = styled.div`
	width: 100%;
	height: 100%;
	.Center {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		background-color: red;
	}
`;
