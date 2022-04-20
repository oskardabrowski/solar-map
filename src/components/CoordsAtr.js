import React, {useContext, useEffect, useState} from 'react';
import styled from 'styled-components';
import { MapContext } from './GlobalContext';

const CoordsAtr = () => {
    const {coords, mapTile} = useContext(MapContext);
    const [wgs84coords, setWgs84coords] = useState({easting: 338948.0620048294, northing: 5874965.058542489});
    const [proj, setProj] = useState('84');
    const utm = require('utm');
    const setProjFc = (e) => {
        const newproj = e.target.value;
        setProj(newproj);
    }
    useEffect(() => {
        const utmcoords = utm.fromLatLon(coords.lat, coords.lng, 34);
        setWgs84coords(utmcoords)
    }, [coords]);
  return (
    <Wrapper>
        <div>
            <form>
                <select onChange={(e) => setProjFc(e)}>
                    <option value="84">WGS 84</option>
                    <option value="92">PUWG 1992</option>
                    <option value="latlon">Lat Lng</option>
                </select>
            </form>
        </div>
        <div>
            {proj === 'latlon' && `Latitude: ${coords.lat.toFixed(6)}`}
            {proj === '84' && `Wschodnie: ${wgs84coords.easting.toFixed(6)}`}
        </div>
        <div>
            {proj === 'latlon' && `Longitude: ${coords.lng.toFixed(6)}`}
            {proj === '84' && `Północne: ${wgs84coords.northing.toFixed(6)}`}
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