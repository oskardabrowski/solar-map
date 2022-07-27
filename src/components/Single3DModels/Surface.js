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
				scale={0.98}
				position={[3.25, -0.08, 46.8]}
			/>
		</>
	);
};
// export const N50 = () => {
// 	const gltf = useLoader(GLTFLoader, "./Models/SurfaceFragments/n50.gltf");
// 	return (
// 		<>
// 			<primitive object={gltf.scene} scale={1} position={[-67, -0.65, 131]} />
// 		</>
// 	);
// };
// export const N49 = () => {
// 	const gltf = useLoader(GLTFLoader, "./Models/SurfaceFragments/n49.gltf");
// 	return (
// 		<>
// 			<primitive object={gltf.scene} scale={1} position={[187.5, 0, 103]} />
// 		</>
// 	);
// };
// export const N48 = () => {
// 	const gltf = useLoader(GLTFLoader, "./Models/SurfaceFragments/n48.gltf");
// 	return (
// 		<>
// 			<primitive object={gltf.scene} scale={1} position={[154, -0.75, 103]} />
// 		</>
// 	);
// };
// export const N47 = () => {
// 	{
// 		/*Popraw model*/
// 	}
// 	const gltf = useLoader(GLTFLoader, "./Models/SurfaceFragments/n47.gltf");
// 	return (
// 		<>
// 			<primitive object={gltf.scene} scale={1} position={[45, -0.3, 100]} />
// 		</>
// 	);
// };
// export const N46 = () => {
// 	const gltf = useLoader(GLTFLoader, "./Models/SurfaceFragments/n46.gltf");
// 	return (
// 		<>
// 			<primitive object={gltf.scene} scale={1.05} position={[-5, -0.1, 91.5]} />
// 		</>
// 	);
// };
// export const N45 = () => {
// 	const gltf = useLoader(GLTFLoader, "./Models/SurfaceFragments/n45.gltf");
// 	return (
// 		<>
// 			<primitive
// 				object={gltf.scene}
// 				scale={1.05}
// 				position={[-56.5, 0, 104.5]}
// 			/>
// 		</>
// 	);
// };
// export const N44 = () => {
// 	const gltf = useLoader(GLTFLoader, "./Models/SurfaceFragments/n44.gltf");
// 	return (
// 		<>
// 			<primitive object={gltf.scene} scale={1.05} position={[250, -0.25, 46]} />
// 		</>
// 	);
// };
// export const N43 = () => {
// 	const gltf = useLoader(GLTFLoader, "./Models/SurfaceFragments/n43.gltf");
// 	return (
// 		<>
// 			<primitive object={gltf.scene} scale={1} position={[186, 0, 51]} />
// 		</>
// 	);
// };
// export const N42 = () => {
// 	const gltf = useLoader(GLTFLoader, "./Models/SurfaceFragments/n42.gltf");
// 	return (
// 		<>
// 			<primitive object={gltf.scene} scale={1} position={[130, 0, 44.15]} />
// 		</>
// 	);
// };
// export const N41 = () => {
// 	const gltf = useLoader(GLTFLoader, "./Models/SurfaceFragments/n41.gltf");
// 	return (
// 		<>
// 			<primitive object={gltf.scene} scale={1} position={[85.5, -0.75, 48]} />
// 		</>
// 	);
// };
// export const N40 = () => {
// 	const gltf = useLoader(GLTFLoader, "./Models/SurfaceFragments/n40.gltf");
// 	return (
// 		<>
// 			<primitive object={gltf.scene} scale={1} position={[42.5, 0, 53.5]} />
// 		</>
// 	);
// };
// export const N39 = () => {
// 	const gltf = useLoader(GLTFLoader, "./Models/SurfaceFragments/n39.gltf");
// 	return (
// 		<>
// 			<primitive object={gltf.scene} scale={1} position={[-7, 0, 49]} />
// 		</>
// 	);
// };
// export const N38 = () => {
// 	const gltf = useLoader(GLTFLoader, "./Models/SurfaceFragments/n38.gltf");
// 	return (
// 		<>
// 			<primitive object={gltf.scene} scale={1} position={[-46, 0, 51.5]} />
// 		</>
// 	);
// };
// export const N37 = () => {
// 	const gltf = useLoader(GLTFLoader, "./Models/SurfaceFragments/n37.gltf");
// 	return (
// 		<>
// 			<primitive object={gltf.scene} scale={1} position={[240, 0, 0]} />
// 		</>
// 	);
// };
// export const N36 = () => {
// 	const gltf = useLoader(GLTFLoader, "./Models/SurfaceFragments/n36.gltf");
// 	return (
// 		<>
// 			<primitive object={gltf.scene} scale={1} position={[200, 0.025, -3]} />
// 		</>
// 	);
// };
// export const N35_1 = () => {
// 	const gltf = useLoader(GLTFLoader, "./Models/SurfaceFragments/n35_1.gltf");
// 	return (
// 		<>
// 			<primitive object={gltf.scene} scale={1} position={[160, 0.015, 5]} />
// 		</>
// 	);
// };
// export const N35_2 = () => {
// 	const gltf = useLoader(GLTFLoader, "./Models/SurfaceFragments/n35_2.gltf");
// 	return (
// 		<>
// 			<primitive object={gltf.scene} scale={1} position={[146, 0.025, 0.5]} />
// 		</>
// 	);
// };
// export const N34 = () => {
// 	const gltf = useLoader(GLTFLoader, "./Models/SurfaceFragments/n34.gltf");
// 	return (
// 		<>
// 			<primitive object={gltf.scene} scale={1} position={[102, -0.075, -2]} />
// 		</>
// 	);
// };
// export const N33 = () => {
// 	const gltf = useLoader(GLTFLoader, "./Models/SurfaceFragments/n33.gltf");
// 	return (
// 		<>
// 			<primitive object={gltf.scene} scale={1} position={[52, 0, 3]} />
// 		</>
// 	);
// };
// export const N32 = () => {
// 	const gltf = useLoader(GLTFLoader, "./Models/SurfaceFragments/n32.gltf");
// 	return (
// 		<>
// 			<primitive object={gltf.scene} scale={1} position={[0, 0, 0]} />
// 		</>
// 	);
// };
// export const N31 = () => {
// 	const gltf = useLoader(GLTFLoader, "./Models/SurfaceFragments/n31.gltf");
// 	return (
// 		<>
// 			<primitive object={gltf.scene} scale={1} position={[-50, 0, -2.15]} />
// 		</>
// 	);
// };
// export const N30 = () => {
// 	const gltf = useLoader(GLTFLoader, "./Models/SurfaceFragments/n30.gltf");
// 	return (
// 		<>
// 			<primitive object={gltf.scene} scale={1} position={[-100, 0, -11]} />
// 		</>
// 	);
// };
// export const N29 = () => {
// 	const gltf = useLoader(GLTFLoader, "./Models/SurfaceFragments/n29.gltf");
// 	return (
// 		<>
// 			<primitive object={gltf.scene} scale={1} position={[-149, 0, -7]} />
// 		</>
// 	);
// };
// export const N28 = () => {
// 	const gltf = useLoader(GLTFLoader, "./Models/SurfaceFragments/n28.gltf");
// 	return (
// 		<>
// 			<primitive object={gltf.scene} scale={1} position={[-195, 0, -13]} />
// 		</>
// 	);
// };
// export const N27 = () => {
// 	const gltf = useLoader(GLTFLoader, "./Models/SurfaceFragments/n27.gltf");
// 	return (
// 		<>
// 			<primitive object={gltf.scene} scale={1} position={[240, 0.03, -62]} />
// 		</>
// 	);
// };
// export const N26_1 = () => {
// 	const gltf = useLoader(GLTFLoader, "./Models/SurfaceFragments/n26_1.gltf");
// 	return (
// 		<>
// 			<primitive object={gltf.scene} scale={1} position={[208, 0.03, -43.75]} />
// 		</>
// 	);
// };
// export const N26_2 = () => {
// 	const gltf = useLoader(GLTFLoader, "./Models/SurfaceFragments/n26_2.gltf");
// 	return (
// 		<>
// 			<primitive
// 				object={gltf.scene}
// 				scale={1}
// 				position={[182.5, 0.03, -48.5]}
// 			/>
// 		</>
// 	);
// };
// export const N25 = () => {
// 	const gltf = useLoader(GLTFLoader, "./Models/SurfaceFragments/n25.gltf");
// 	return (
// 		<>
// 			<primitive object={gltf.scene} scale={1} position={[140, 0.05, -49.5]} />
// 		</>
// 	);
// };
// export const N24 = () => {
// 	const gltf = useLoader(GLTFLoader, "./Models/SurfaceFragments/n24.gltf");
// 	return (
// 		<>
// 			<primitive object={gltf.scene} scale={1} position={[88, -0.7, -51.5]} />
// 		</>
// 	);
// };
// export const N23 = () => {
// 	const gltf = useLoader(GLTFLoader, "./Models/SurfaceFragments/n23.gltf");
// 	return (
// 		<>
// 			<primitive object={gltf.scene} scale={1} position={[41, 0.04, -53]} />
// 		</>
// 	);
// };
// export const N22 = () => {
// 	const gltf = useLoader(GLTFLoader, "./Models/SurfaceFragments/n22.gltf");
// 	return (
// 		<>
// 			<primitive object={gltf.scene} scale={1} position={[-5, 0.03, -51]} />
// 		</>
// 	);
// };
// export const N21 = () => {
// 	const gltf = useLoader(GLTFLoader, "./Models/SurfaceFragments/n21.gltf");
// 	return (
// 		<>
// 			<primitive object={gltf.scene} scale={1} position={[-63, 0.025, -54]} />
// 		</>
// 	);
// };
// export const N20 = () => {
// 	const gltf = useLoader(GLTFLoader, "./Models/SurfaceFragments/n20.gltf");
// 	return (
// 		<>
// 			<primitive object={gltf.scene} scale={1} position={[-108, 0, -59]} />
// 		</>
// 	);
// };
// export const N19 = () => {
// 	const gltf = useLoader(GLTFLoader, "./Models/SurfaceFragments/n19.gltf");
// 	return (
// 		<>
// 			<primitive object={gltf.scene} scale={1} position={[-167, 0, -45.5]} />
// 		</>
// 	);
// };
// export const N18 = () => {
// 	const gltf = useLoader(GLTFLoader, "./Models/SurfaceFragments/n18.gltf");
// 	return (
// 		<>
// 			<primitive object={gltf.scene} scale={1} position={[-210, 0, -41.5]} />
// 		</>
// 	);
// };
// export const N17 = () => {
// 	const gltf = useLoader(GLTFLoader, "./Models/SurfaceFragments/n17.gltf");
// 	return (
// 		<>
// 			<primitive object={gltf.scene} scale={1} position={[270, 0, -103]} />
// 		</>
// 	);
// };
// export const N16 = () => {
// 	const gltf = useLoader(GLTFLoader, "./Models/SurfaceFragments/n16.gltf");
// 	return (
// 		<>
// 			<primitive
// 				object={gltf.scene}
// 				scale={1}
// 				position={[223.5, -2.535, -100.5]}
// 			/>
// 		</>
// 	);
// };
// export const N15 = () => {
// 	const gltf = useLoader(GLTFLoader, "./Models/SurfaceFragments/n15.gltf");
// 	return (
// 		<>
// 			<primitive object={gltf.scene} scale={1} position={[172, 0.027, -103]} />
// 		</>
// 	);
// };
// export const N14 = () => {
// 	const gltf = useLoader(GLTFLoader, "./Models/SurfaceFragments/n14.gltf");
// 	return (
// 		<>
// 			<primitive object={gltf.scene} scale={1} position={[120, -0.34, -98.5]} />
// 		</>
// 	);
// };
// export const N13 = () => {
// 	const gltf = useLoader(GLTFLoader, "./Models/SurfaceFragments/n13.gltf");
// 	return (
// 		<>
// 			<primitive
// 				object={gltf.scene}
// 				scale={1.085}
// 				position={[62, -0.08, -105]}
// 			/>
// 		</>
// 	);
// };
// export const N12 = () => {
// 	const gltf = useLoader(GLTFLoader, "./Models/SurfaceFragments/n12.gltf");
// 	return (
// 		<>
// 			<primitive
// 				object={gltf.scene}
// 				scale={1.085}
// 				position={[11, -0.13, -105]}
// 			/>
// 		</>
// 	);
// };
// export const N11 = () => {
// 	const gltf = useLoader(GLTFLoader, "./Models/SurfaceFragments/n11.gltf");
// 	return (
// 		<>
// 			<primitive object={gltf.scene} scale={1} position={[-31.5, 0.05, -103]} />
// 		</>
// 	);
// };
// export const N10 = () => {
// 	const gltf = useLoader(GLTFLoader, "./Models/SurfaceFragments/n10.gltf");
// 	return (
// 		<>
// 			<primitive object={gltf.scene} scale={1} position={[-77, -0.7, -102]} />
// 		</>
// 	);
// };
// export const N9 = () => {
// 	const gltf = useLoader(GLTFLoader, "./Models/SurfaceFragments/n9.gltf");
// 	return (
// 		<>
// 			<primitive object={gltf.scene} scale={1} position={[-119, 0, -96]} />
// 		</>
// 	);
// };
// export const N8 = () => {
// 	const gltf = useLoader(GLTFLoader, "./Models/SurfaceFragments/n8.gltf");
// 	return (
// 		<>
// 			<primitive object={gltf.scene} scale={1} position={[220, 0, -137.5]} />
// 		</>
// 	);
// };
// export const N7 = () => {
// 	const gltf = useLoader(GLTFLoader, "./Models/SurfaceFragments/n7.gltf");
// 	return (
// 		<>
// 			<primitive object={gltf.scene} scale={1} position={[185, 0, -140]} />
// 		</>
// 	);
// };
// export const N6 = () => {
// 	const gltf = useLoader(GLTFLoader, "./Models/SurfaceFragments/n6.gltf");
// 	return (
// 		<>
// 			<primitive object={gltf.scene} scale={1.1} position={[131, 0, -152]} />
// 		</>
// 	);
// };
// export const N5 = () => {
// 	const gltf = useLoader(GLTFLoader, "./Models/SurfaceFragments/n5.gltf");
// 	return (
// 		<>
// 			<primitive object={gltf.scene} scale={1.06} position={[80, 0.1, -150]} />
// 		</>
// 	);
// };
// export const N4 = () => {
// 	const gltf = useLoader(GLTFLoader, "./Models/SurfaceFragments/n4.gltf");
// 	return (
// 		<>
// 			<primitive object={gltf.scene} scale={1} position={[25, 0.1, -147]} />
// 		</>
// 	);
// };
// export const N3 = () => {
// 	const gltf = useLoader(GLTFLoader, "./Models/SurfaceFragments/n3.gltf");
// 	return (
// 		<>
// 			<primitive object={gltf.scene} scale={1} position={[-25, 0, -149]} />
// 		</>
// 	);
// };
// export const N2 = () => {
// 	const gltf = useLoader(GLTFLoader, "./Models/SurfaceFragments/n2.gltf");
// 	return (
// 		<>
// 			<primitive object={gltf.scene} scale={1} position={[-72, 0, -159]} />
// 		</>
// 	);
// };
// export const N1 = () => {
// 	const gltf = useLoader(GLTFLoader, "./Models/SurfaceFragments/n1.gltf");
// 	return (
// 		<>
// 			<primitive object={gltf.scene} scale={1} position={[-111, 0, -152]} />
// 		</>
// 	);
// };
