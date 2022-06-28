import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { data } from "./data/testdata";

export default function Map({ searchParams }) {
  const [latitude, setLatitude] = useState(49.246292);
  const [longitude, setLongitude] = useState(-123.116226);

  const locations = data.filter((loc) => loc.location === "vancouver");

  console.log("Locations:", locations);

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
        zoom={10}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {locations &&
          locations[0].sites.map((dataLoc) => (
            <Marker position={[dataLoc.lat, dataLoc.long]} key={dataLoc.lat}>
              <Popup>
                Enjoy Scuba Diving at <br /> {dataLoc}
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}
