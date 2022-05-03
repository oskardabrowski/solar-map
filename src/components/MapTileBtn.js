import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';


const MapTileBtn = () => {
  return (
    <button className="Map-tile" onClick={() => setMapTile('default')}>
        <div className="Map-tile-desc">
            <SiOpenstreetmap className="Map-tile-desc-ico" />
            <span>Open Street Map</span>
        </div>
        <MapStyles>
            <MapContainer class="mapOSM" id="MapOSM"
            center={mapCenter}
	        zoom={zoomLevel}
            scrollWheelZoom={false}
            zoomControl={false}
            doubleClickZoom={false}
            dragging={false}
            >
                <MapEventsComponent />
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' minZoom={1} maxZoom={28} minNativeZoom={0} maxNativeZoom={19} />
            </MapContainer>
        </MapStyles>
    </button>
  )
}

export default MapTileBtn