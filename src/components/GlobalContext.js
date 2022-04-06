import React, {createContext, useContext, useState} from 'react';

const MapContext = createContext()


const MapProvider = ({children}) => {
  const [zoomLevel, setZoomLevel] = useState(12);
  const [mapTile, setMapTile] = useState('default');
  return (
    <MapContext.Provider
    value={{
        zoomLevel,
        setZoomLevel,
        mapTile,
        setMapTile
    }}
    >{children}</MapContext.Provider>
  )
}


export {MapProvider, MapContext}