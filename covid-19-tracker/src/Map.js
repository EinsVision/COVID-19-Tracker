import React from 'react';
import { MapContainer as LeafletMap, TileLayer } from 'react-leaflet';
import './Map.css';
import { showDataOnMap } from './util';

function Map({countries, casesType, center, zoom}) {
  return (
    <div className='map'>
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* Loop througth and draw circles */}
        {showDataOnMap(countries, casesType)}
      </LeafletMap>
    </div>
  )
}

export default Map;



//https://github.com/PaulLeCam/react-leaflet/issues/491