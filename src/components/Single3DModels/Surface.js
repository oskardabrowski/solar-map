import React from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";
import AllMaps from "../Maps";
import { devMode } from "../Maps";

export const CityTile1 = () => {
	const gltf = useLoader(
		GLTFLoader,
		devMode ? AllMaps.models[0].devUrl : AllMaps.models[0].url
	);
	return (
		<>
			<primitive
				object={gltf.scene}
				scale={AllMaps.models[0].scale}
				position={AllMaps.models[0].position}
			/>
		</>
	);
};
export const CityTile2 = () => {
	const gltf = useLoader(
		GLTFLoader,
		devMode ? AllMaps.models[1].devUrl : AllMaps.models[1].url
	);
	return (
		<>
			<primitive
				object={gltf.scene}
				scale={AllMaps.models[1].scale}
				position={AllMaps.models[1].position}
			/>
		</>
	);
};
export const CityTile3 = () => {
	const gltf = useLoader(
		GLTFLoader,
		devMode ? AllMaps.models[2].devUrl : AllMaps.models[2].url
	);
	return (
		<>
			<primitive
				object={gltf.scene}
				scale={AllMaps.models[2].scale}
				position={AllMaps.models[2].position}
			/>
		</>
	);
};
export const CityTile4 = () => {
	const gltf = useLoader(
		GLTFLoader,
		devMode ? AllMaps.models[3].devUrl : AllMaps.models[3].url
	);
	return (
		<>
			<primitive
				object={gltf.scene}
				scale={AllMaps.models[3].scale}
				position={AllMaps.models[3].position}
			/>
		</>
	);
};
export const CityTile5 = () => {
	const gltf = useLoader(
		GLTFLoader,
		devMode ? AllMaps.models[4].devUrl : AllMaps.models[4].url
	);
	return (
		<>
			<primitive
				object={gltf.scene}
				scale={AllMaps.models[4].scale}
				position={AllMaps.models[4].position}
			/>
		</>
	);
};
export const CityTile6 = () => {
	const gltf = useLoader(
		GLTFLoader,
		devMode ? AllMaps.models[5].devUrl : AllMaps.models[5].url
	);
	return (
		<>
			<primitive
				object={gltf.scene}
				scale={AllMaps.models[5].scale}
				position={AllMaps.models[5].position}
			/>
		</>
	);
};
export const CityTile7 = () => {
	const gltf = useLoader(
		GLTFLoader,
		devMode ? AllMaps.models[6].devUrl : AllMaps.models[6].url
	);
	return (
		<>
			<primitive
				object={gltf.scene}
				scale={AllMaps.models[6].scale}
				position={AllMaps.models[6].position}
			/>
		</>
	);
};
export const CityTile8 = () => {
	const gltf = useLoader(
		GLTFLoader,
		devMode ? AllMaps.models[7].devUrl : AllMaps.models[7].url
	);
	return (
		<>
			<primitive
				object={gltf.scene}
				scale={AllMaps.models[7].scale}
				position={AllMaps.models[7].position}
			/>
		</>
	);
};
export const CityTile9 = () => {
	const gltf = useLoader(
		GLTFLoader,
		devMode ? AllMaps.models[8].devUrl : AllMaps.models[8].url
	);
	return (
		<>
			<primitive
				object={gltf.scene}
				scale={AllMaps.models[8].scale}
				position={AllMaps.models[8].position}
			/>
		</>
	);
};
export const CityTile10 = () => {
	const gltf = useLoader(
		GLTFLoader,
		devMode ? AllMaps.models[9].devUrl : AllMaps.models[9].url
	);
	return (
		<>
			<primitive
				object={gltf.scene}
				scale={AllMaps.models[9].scale}
				position={AllMaps.models[9].position}
			/>
		</>
	);
};
export const CityTile11 = () => {
	const gltf = useLoader(
		GLTFLoader,
		devMode ? AllMaps.models[10].devUrl : AllMaps.models[10].url
	);
	return (
		<>
			<primitive
				object={gltf.scene}
				scale={AllMaps.models[10].scale}
				position={AllMaps.models[10].position}
			/>
		</>
	);
};
export const CityTile12 = () => {
	const gltf = useLoader(
		GLTFLoader,
		devMode ? AllMaps.models[11].devUrl : AllMaps.models[11].url
	);
	return (
		<>
			<primitive
				object={gltf.scene}
				scale={AllMaps.models[11].scale}
				position={AllMaps.models[11].position}
			/>
		</>
	);
};
export const CityTile13 = () => {
	const gltf = useLoader(
		GLTFLoader,
		devMode ? AllMaps.models[12].devUrl : AllMaps.models[12].url
	);
	return (
		<>
			<primitive
				object={gltf.scene}
				scale={AllMaps.models[12].scale}
				position={AllMaps.models[12].position}
			/>
		</>
	);
};
export const CityTile14 = () => {
	const gltf = useLoader(
		GLTFLoader,
		devMode ? AllMaps.models[13].devUrl : AllMaps.models[13].url
	);
	return (
		<>
			<primitive
				object={gltf.scene}
				scale={AllMaps.models[13].scale}
				position={AllMaps.models[13].position}
			/>
		</>
	);
};
export const CityTile15 = () => {
	const gltf = useLoader(
		GLTFLoader,
		devMode ? AllMaps.models[14].devUrl : AllMaps.models[14].url
	);
	return (
		<>
			<primitive
				object={gltf.scene}
				scale={AllMaps.models[14].scale}
				position={AllMaps.models[14].position}
			/>
		</>
	);
};
export const CityTile16 = () => {
	const gltf = useLoader(
		GLTFLoader,
		devMode ? AllMaps.models[15].devUrl : AllMaps.models[15].url
	);
	return (
		<>
			<primitive
				object={gltf.scene}
				scale={AllMaps.models[15].scale}
				position={AllMaps.models[15].position}
			/>
		</>
	);
};
export const CityTile17 = () => {
	const gltf = useLoader(
		GLTFLoader,
		devMode ? AllMaps.models[16].devUrl : AllMaps.models[16].url
	);
	return (
		<>
			<primitive
				object={gltf.scene}
				scale={AllMaps.models[16].scale}
				position={AllMaps.models[16].position}
			/>
		</>
	);
};
export const CityTile18 = () => {
	const gltf = useLoader(
		GLTFLoader,
		devMode ? AllMaps.models[17].devUrl : AllMaps.models[17].url
	);
	return (
		<>
			<primitive
				object={gltf.scene}
				scale={AllMaps.models[17].scale}
				position={AllMaps.models[17].position}
			/>
		</>
	);
};
export const CityTile19 = () => {
	const gltf = useLoader(
		GLTFLoader,
		devMode ? AllMaps.models[18].devUrl : AllMaps.models[18].url
	);
	return (
		<>
			<primitive
				object={gltf.scene}
				scale={AllMaps.models[18].scale}
				position={AllMaps.models[18].position}
			/>
		</>
	);
};
export const CityTile20 = () => {
	const gltf = useLoader(
		GLTFLoader,
		devMode ? AllMaps.models[19].devUrl : AllMaps.models[19].url
	);
	return (
		<>
			<primitive
				object={gltf.scene}
				scale={AllMaps.models[19].scale}
				position={AllMaps.models[19].position}
			/>
		</>
	);
};
export const CityTile21 = () => {
	const gltf = useLoader(
		GLTFLoader,
		devMode ? AllMaps.models[20].devUrl : AllMaps.models[20].url
	);
	return (
		<>
			<primitive
				object={gltf.scene}
				scale={AllMaps.models[20].scale}
				position={AllMaps.models[20].position}
			/>
		</>
	);
};
export const CityTile22 = () => {
	const gltf = useLoader(
		GLTFLoader,
		devMode ? AllMaps.models[21].devUrl : AllMaps.models[21].url
	);
	return (
		<>
			<primitive
				object={gltf.scene}
				scale={AllMaps.models[21].scale}
				position={AllMaps.models[21].position}
			/>
		</>
	);
};
export const CityTile23 = () => {
	const gltf = useLoader(
		GLTFLoader,
		devMode ? AllMaps.models[22].devUrl : AllMaps.models[22].url
	);
	return (
		<>
			<primitive
				object={gltf.scene}
				scale={AllMaps.models[22].scale}
				position={AllMaps.models[22].position}
			/>
		</>
	);
};
export const CityTile24 = () => {
	const gltf = useLoader(
		GLTFLoader,
		devMode ? AllMaps.models[23].devUrl : AllMaps.models[23].url
	);
	return (
		<>
			<primitive
				object={gltf.scene}
				scale={AllMaps.models[23].scale}
				position={AllMaps.models[23].position}
			/>
		</>
	);
};
export const CityTile25 = () => {
	const gltf = useLoader(
		GLTFLoader,
		devMode ? AllMaps.models[24].devUrl : AllMaps.models[24].url
	);
	return (
		<>
			<primitive
				object={gltf.scene}
				scale={AllMaps.models[24].scale}
				position={AllMaps.models[24].position}
			/>
		</>
	);
};
export const CityTile26 = () => {
	const gltf = useLoader(
		GLTFLoader,
		devMode ? AllMaps.models[25].devUrl : AllMaps.models[25].url
	);
	return (
		<>
			<primitive
				object={gltf.scene}
				scale={AllMaps.models[25].scale}
				position={AllMaps.models[25].position}
			/>
		</>
	);
};
export const CityTile27 = () => {
	const gltf = useLoader(
		GLTFLoader,
		devMode ? AllMaps.models[26].devUrl : AllMaps.models[26].url
	);
	return (
		<>
			<primitive
				object={gltf.scene}
				scale={AllMaps.models[26].scale}
				position={AllMaps.models[26].position}
			/>
		</>
	);
};
export const CityTile28 = () => {
	const gltf = useLoader(
		GLTFLoader,
		devMode ? AllMaps.models[27].devUrl : AllMaps.models[27].url
	);
	return (
		<>
			<primitive
				object={gltf.scene}
				scale={AllMaps.models[27].scale}
				position={AllMaps.models[27].position}
			/>
		</>
	);
};
export const CityTile29 = () => {
	const gltf = useLoader(
		GLTFLoader,
		devMode ? AllMaps.models[28].devUrl : AllMaps.models[28].url
	);
	return (
		<>
			<primitive
				object={gltf.scene}
				scale={AllMaps.models[28].scale}
				position={AllMaps.models[28].position}
			/>
		</>
	);
};
export const CityTile30 = () => {
	const gltf = useLoader(
		GLTFLoader,
		devMode ? AllMaps.models[29].devUrl : AllMaps.models[29].url
	);
	return (
		<>
			<primitive
				object={gltf.scene}
				scale={AllMaps.models[29].scale}
				position={AllMaps.models[29].position}
			/>
		</>
	);
};
export const CityTile31 = () => {
	const gltf = useLoader(
		GLTFLoader,
		devMode ? AllMaps.models[30].devUrl : AllMaps.models[30].url
	);
	return (
		<>
			<primitive
				object={gltf.scene}
				scale={AllMaps.models[30].scale}
				position={AllMaps.models[30].position}
			/>
		</>
	);
};
export const CityTile32 = () => {
	const gltf = useLoader(
		GLTFLoader,
		devMode ? AllMaps.models[31].devUrl : AllMaps.models[31].url
	);
	return (
		<>
			<primitive
				object={gltf.scene}
				scale={AllMaps.models[31].scale}
				position={AllMaps.models[31].position}
			/>
		</>
	);
};
export const CityTile33 = () => {
	const gltf = useLoader(
		GLTFLoader,
		devMode ? AllMaps.models[32].devUrl : AllMaps.models[32].url
	);
	return (
		<>
			<primitive
				object={gltf.scene}
				scale={0.845}
				position={[144.5, -0.1, -94.85]}
			/>
		</>
	);
};
