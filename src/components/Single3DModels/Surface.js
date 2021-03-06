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
				scale={0.895}
				position={[-102.15, -0.78, 47]}
			/>
		</>
	);
};
