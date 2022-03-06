import React from 'react'
import { MapContainer, Map, TileLayer, Marker, ImageOverlay, GeoJSON, useMapEvents } from "react-leaflet";

export const Old_City = () => {
  return (
    <>
    <ImageOverlay url="./solar_rasters/old_city/M1.webp" bounds={[[53.007494801926626, 18.598481402931817], [53.017142108847224, 18.621159372302547]]} zIndex={1000} />
    <ImageOverlay url="./solar_rasters/old_city/M2.webp" bounds={[[53.014149537386182, 18.594240699481194], [53.023795356780695, 18.616918668851923]]} zIndex={1000} />
    <ImageOverlay url="./solar_rasters/old_city/M3.webp" bounds={[[53.012329285692857, 18.582907357510813], [53.021975511979271, 18.605585326881545]]} zIndex={1000} />
    <ImageOverlay url="./solar_rasters/old_city/M4.webp" bounds={[[53.016679625226708, 18.599360668600223], [53.007032214909358, 18.57668269922949]]} zIndex={1000} />
    <ImageOverlay url="./solar_rasters/old_city/M5.webp" bounds={[[53.002615005337795, 18.578493058012505], [53.012263402951547, 18.601171027383234]]} zIndex={1000} />
    </>
  )
}

// [18.578493058012505,53.002615005337795], [18.601171027383234,53.012263402951547]


