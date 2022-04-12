import React, { Suspense } from 'react';
import styled from 'styled-components';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Canvas, useLoader } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import CityModel from '../components/CityModel';

const ModelMiasto = () => {
  const gltf = useLoader(GLTFLoader, "./Models/test.gltf");
  return (
    <>
      <primitive object={gltf.scene} scale={1} />
    </>
  )
}

const Model = () => {
    return (
        <ThreeModel>
            <Canvas>
                <Suspense fallback={null}>
                    <CityModel />
                    {/* <ModelMiasto /> */}
                    <Environment background={true} files={'Terrain-sky.hdr'} path={'/'} />
                    <OrbitControls />
                </Suspense>
            </Canvas>
        </ThreeModel>
    )
}

export default Model

//background={true} files={'Terrain.png'} path={'/'}

const ThreeModel = styled.div`
width: 100%;
height: 100%;

`;



