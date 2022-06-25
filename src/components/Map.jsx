import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import data from "../data/testdata";

export default function Map() {
  const [latitude, setLatitude] = useState(51.0450299);
  const [longitude, setLongitude] = useState(-114.0547861);
  const [locations, setLocations] = useState();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (location) {
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
    });
  }, [latitude, longitude]);
  const initialPosition = [latitude, longitude];
  const [position, setPosition] = useState(initialPosition);

  console.log(position);
  return (
    <div className="map-container">
      <MapContainer
        center={position && position}
        zoom={11}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {data && data.map(searchItem => (
          <Marker position={position} key={searchItem.}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        ))}
        
      </MapContainer>
    </div>
  );
}
