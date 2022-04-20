import React, {createContext, useContext, useState} from 'react';

const MapContext = createContext()


const MapProvider = ({children}) => {
  const [zoomLevel, setZoomLevel] = useState(12);
  const [mapTile, setMapTile] = useState('default');
  const [mapType, setMapType] = useState('2D');
  const [solarTile, setSolarTile] = useState('Roofs');
  const [skyHDR, setSkyHDR] = useState('Terrain');
  const [coords, setCoords] = useState({lat: 53.01, lng: 18.63})
  return (
    <MapContext.Provider
    value={{
        zoomLevel,
        setZoomLevel,
        mapTile,
        setMapTile,
        solarTile,
        setSolarTile,
        mapType,
        setMapType,
        skyHDR,
        setSkyHDR,
        coords,
        setCoords
    }}
    >{children}</MapContext.Provider>
  )
}


export {MapProvider, MapContext}