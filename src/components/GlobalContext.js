import React, {createContext, useState} from 'react';

const MapContext = createContext()

const MapProvider = ({children}) => {
  const [zoomLevel, setZoomLevel] = useState(12);
  const [mapTile, setMapTile] = useState('default');
  const [mapType, setMapType] = useState('2D');
  return (
    <MapContext.Provider
    value={{
        zoomLevel,
        setZoomLevel,
        mapTile,
        setMapTile,
        mapType,
        setMapType
    }}
    >{children}</MapContext.Provider>
  )
}


export {MapProvider, MapContext}