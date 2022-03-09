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
    <ImageOverlay url="./solar_rasters/old_city/M6.webp" bounds={[[53.00490167, 18.55893234], [53.01454955, 18.58161031]]} zIndex={1000} />
    <ImageOverlay url="./solar_rasters/old_city/M7.webp" bounds={[[53.01253634, 18.57038340], [53.02615385, 18.60239936]]} zIndex={1000} />
    <ImageOverlay url="./solar_rasters/old_city/M8.webp" bounds={[[53.01198882, 18.56768748], [53.01936560, 18.58502946]]} zIndex={1000} />
    <ImageOverlay url="./solar_rasters/old_city/M9.webp" bounds={[[53.01298972, 18.55684623], [53.02036633, 18.57418820]]} zIndex={1000} />
    <ImageOverlay url="./solar_rasters/old_city/M10.webp" bounds={[[53.01683081, 18.56318524], [53.02647603, 18.58586321]]} zIndex={1000} />
    </>
  )
}


