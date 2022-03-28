import React, {useContext} from 'react';
import { SolarBiggestQuality, SolarStandardQuality } from './SolarComponents';
import { MapContext } from './GlobalContext';

// TODO Zoom level dla standard min 16 ---> && zoomLevel >= 17

const SolarLayer = () => {
  const {zoomLevel} = useContext(MapContext)
  return (
    <>
    {zoomLevel >= 19 && <SolarBiggestQuality />}
    {zoomLevel <=18 && zoomLevel >= 17 ? <SolarStandardQuality /> : ''}
    
    </>
  )
}

export default SolarLayer