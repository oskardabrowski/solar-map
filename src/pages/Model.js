import React, { Suspense, useContext } from 'react';
import styled from 'styled-components';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Canvas, useLoader } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import CityModel from '../components/CityModel';
import { MapContext } from '../components/GlobalContext';

const Model = () => {
    const {skyHDR} = useContext(MapContext);
    return (
        <ThreeModel>
            <Canvas>
                <Suspense fallback={null}>
                    <CityModel />
                    {skyHDR === "Terrain" && <Environment background={true} files={'Terrain-sky.hdr'} path={'/HDR/'} />}
                    {skyHDR === "Sunflowers" && <Environment background={true} files={'Sunflowers.hdr'} path={'/HDR/'} />}
                    {skyHDR === "Clear" && <Environment background={true} files={'clear.hdr'} path={'/HDR/'} />}
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



