import React, {useContext} from 'react';
import { SolarBiggestQuality } from './SolarComponents';
import { MapContext } from './GlobalContext';


const SolarLayer = () => {
  const {zoomLevel} = useContext(MapContext)
  return (
    <>
    {zoomLevel >= 19 && <SolarBiggestQuality />}
    
    
    </>
  )
}

export default SolarLayer