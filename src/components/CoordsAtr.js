import React, {useContext, useEffect, useState} from 'react';
import styled from 'styled-components';
import { MapContext } from './GlobalContext';

const CoordsAtr = () => {
    const {coords, mapTile} = useContext(MapContext);
    const [proj, setProj] = useState('84');
    const setProjFc = (e) => {
        const newproj = e.target.value;
        setProj(newproj);
    }

    function calculatePUWG92(lat, lng) {

        // ? elipsoida GRS-80 - parametry
        const e = 0.0818191910428;
        const R0 = 6367449.14577;
        const Snorm = 2.0 * Math.E-6;
        const xo = 5760000.0;

        // ? Współczynniki wielomianu
        const a0 = 5765181.11148097;
        const a1 = 499800.81713800;
        const a2 = -63.81145283;
        const a3 = 0.83537915;
        const a4 = 0.13046891;
        const a5 = -0.00111138;
        const a6 = -0.00010504;

        // ? Parametry odwzorowania Gaussa-Kruegera dla PUWG92
        const L0_stopnie = 19.0;
        const m0 = 0.9993;
        const x0 = -5300000.0;
        const y0 = 500000.0;

        // ? Zakres stosowalności bo potrzebny
        const Bmin = 48.0 * Math.PI/180.0;
        const Bmax = 56.0 * Math.PI/180.0;
        const dLmin = -6.0 * Math.PI/180.0;
        const dLmax = 6.0 * Math.PI/180.0;

        // ? Weryfikacja danych wejściowych
        const B = lat*Math.PI/180;
        const dL_stopnie = lng - L0_stopnie;
        const dL = dL_stopnie*Math.PI/180;

        // ? Elipsoida na kulę
        const U = 1.0-e*Math.sin(B);
        const V = 1.0+e*Math.sin(B);
        const K = Math.pow((U/V), (e/2.0));
        const C = K*Math.tan(B/2.0+Math.PI/4.0);
        const fi = 2.0*Math.atan(C)-Math.PI/2.0;
        const d_lambda = dL;

        // ? kula na walec
        const p = Math.sin(fi);
        const q = Math.cos(fi)*Math.cos(d_lambda);
        const r = 1.0+Math.cos(fi)*Math.sin(d_lambda);
        const s = 1.0-Math.cos(fi)*Math.sin(d_lambda);
        const XMERC = R0 * Math.atan(p/q);
        const YMERC = 0.5*R0*Math.log(r/s);

        // ? walec na płaszczyznę
        const Z1 = ((XMERC - xo) * Snorm);
        const Z2 = (YMERC * Snorm);

        const complex = (Z1, Z2);

        const Xgk = a0+complex*(a1+complex*(a2+complex*(a3+complex*(a4+complex*(a5+complex*a6)))));

        // const Xgk = a0+Z1*(a1+Z1*(a2+Z1*(a3+Z1*(a4+Z1*(a5+Z1*a6)))));
        // const Ygk = a0+Z2*(a1+Z2*(a2+Z2*(a3+Z2*(a4+Z2*(a5+Z2*a6)))));

        // const Xpuwg = m0*Xgk+x0;
        // const Ypuwg = m0*Ygk+y0;

        // console.log(`X ${Xpuwg}, Y ${Ypuwg}`);

        console.log(Xgk);
    }

    useEffect(() => {
        calculatePUWG92(18.6044267, 53.0105745);
    },[])

    // calculatePUWG92(18.6044267, 53.0105745);
  return (
    <Wrapper>
        <div>
            <form>
                <select onChange={(e) => setProjFc(e)}>
                    <option value="84">WGS 84</option>
                    <option value="92">PUWG 1992</option>
                </select>
            </form>
        </div>
        <div>
            {proj === '84' && `${coords.lat.toFixed(6)}`}{proj === '84' && `, ${coords.lng.toFixed(6)}`}
            {/* {proj === '84' && `Wschodnie: ${wgs84coords.easting.toFixed(6)}`} */}
        </div>
        <div>
            {/* {proj === '84' && `Longitude: ${coords.lng.toFixed(6)}`} */}
            {/* {proj === '84' && `Północne: ${wgs84coords.northing.toFixed(6)}`} */}
        </div>
        <div>
            	{mapTile === 'default' && <>&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors</>}
				{mapTile === 'topo' && <>Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)</>}
				{mapTile === 'stadiasomoth' && <>&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors</>}
				{mapTile === 'cartodbdark' && <>&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a></>}
				{mapTile === 'cartodbvoyager' && <>&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a></>}
				{mapTile === 'cartodbpositron' && <>&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a></>}
				{mapTile === 'stamentonerlite' && <>Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors</>}
				{mapTile === 'esriworldimagery' && <>Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community</>}
        </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
position: absolute;
right: 0;
bottom: 0;
background-color: white;
z-index: 11000;
padding: .25rem;
font-size: 0.75rem;
display: flex;
width: max-content;
font-family: 'Work Sans';
border-radius: 15px 0px 0px 0px;

& > div {
    margin: 0rem .25rem;
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


export default CoordsAtr