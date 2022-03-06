import React from 'react'
import { MapContainer, Map, TileLayer, Marker, ImageOverlay, GeoJSON, useMapEvents } from "react-leaflet";

export const Old_City = () => {
  return (
    <>
    <ImageOverlay url="./solar_rasters/old_city/M1.webp" bounds={[[53.007494801926626, 18.598481402931817], [53.017142108847224, 18.621159372302547]]} zIndex={1000} />
    </>
  )
}



