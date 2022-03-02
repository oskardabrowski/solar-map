import React, {createContext, useContext, useState} from 'react';

const MapContext = createContext()

const MapProvider = ({children}) => {
  const [zoomLevel, setZoomLevel] = useState(12);
  return (
    <MapContext.Provider
    value={{
        zoomLevel,
        setZoomLevel
    }}
    >{children}</MapContext.Provider>
  )
}


export {MapProvider, MapContext}