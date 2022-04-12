import React from 'react'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from '@react-three/fiber';

export const N37 = () => {
  const gltf = useLoader(GLTFLoader, "./Models/SurfaceFragments/n37.gltf");
  return (
    <>
      <primitive object={gltf.scene} scale={1} position={[240, 0, 0]} />
    </>
  )
}
export const N36 = () => {
  const gltf = useLoader(GLTFLoader, "./Models/SurfaceFragments/n36.gltf");
  return (
    <>
      <primitive object={gltf.scene} scale={1} position={[200, 0.025, -3]} />
    </>
  )
}
export const N35_1 = () => {
  const gltf = useLoader(GLTFLoader, "./Models/SurfaceFragments/n35_1.gltf");
  return (
    <>
      <primitive object={gltf.scene} scale={1} position={[160, 0.015, 5]} />
    </>
  )
}
export const N35_2 = () => {
  const gltf = useLoader(GLTFLoader, "./Models/SurfaceFragments/n35_2.gltf");
  return (
    <>
      <primitive object={gltf.scene} scale={1} position={[146, 0.025, 0.5]} />
    </>
  )
}
export const N34 = () => {
  const gltf = useLoader(GLTFLoader, "./Models/SurfaceFragments/n34.gltf");
  return (
    <>
      <primitive object={gltf.scene} scale={1} position={[102, -0.075, -2]} />
    </>
  )
}
export const N33 = () => {
  const gltf = useLoader(GLTFLoader, "./Models/SurfaceFragments/n33.gltf");
  return (
    <>
      <primitive object={gltf.scene} scale={1} position={[52, 0, 3]} />
    </>
  )
}
export const N32 = () => {
  const gltf = useLoader(GLTFLoader, "./Models/SurfaceFragments/n32.gltf");
  return (
    <>
      <primitive object={gltf.scene} scale={1} position={[0, 0, 0]} />
    </>
  )
}
export const N31 = () => {
  const gltf = useLoader(GLTFLoader, "./Models/SurfaceFragments/n31.gltf");
  return (
    <>
      <primitive object={gltf.scene} scale={1} position={[-50, 0, -2.15]} />
    </>
  )
}
export const N30 = () => {
  const gltf = useLoader(GLTFLoader, "./Models/SurfaceFragments/n30.gltf");
  return (
    <>
      <primitive object={gltf.scene} scale={1} position={[-100, 0, -11]} />
    </>
  )
}
export const N29 = () => {
  const gltf = useLoader(GLTFLoader, "./Models/SurfaceFragments/n29.gltf");
  return (
    <>
      <primitive object={gltf.scene} scale={1} position={[-149, 0, -7]} />
    </>
  )
}
export const N28 = () => {
  const gltf = useLoader(GLTFLoader, "./Models/SurfaceFragments/n28.gltf");
  return (
    <>
      <primitive object={gltf.scene} scale={1} position={[-195, 0, -13]} />
    </>
  )
}

