import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import { data, backups } from "./data/testdata";
import anchor from '../images/anchor6.png'
import {HeatmapLayer} from 'react-leaflet-heatmap-layer-v3'
import L from 'leaflet';


export default function Map({ searchParams }) {

  const [latitude, setLatitude] = useState(49.246292);
  const [longitude, setLongitude] = useState(-123.116226);


  const locations = data.filter((loc) => loc.location === "vancouver");

  let anchorIcon = L.icon({
    iconUrl: anchor,
    iconRetinaUrl: anchor,
    iconAnchor: [10, 10],
    popupAnchor: [0, 0],
    iconSize: [25, 25],
  });
  
  const gradient = { 0.4: "blue", 0.8: "blue", 1.0: "blue" };
  const gradient2 = { 0.4: "red", 0.8: "red", 1.0: "red" };
  const gradient3 = { 0.4: "green", 0.8: "green", 1.0: "green" };
  const gradient4 = { 0.4: "orange", 0.8: "orange", 1.0: "orange" };
  
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
      <HeatmapLayer
            fitBoundsOnLoad
            fitBoundsOnUpdate
            points={backups}
            longitudeExtractor={m => m[1]}
            latitudeExtractor={m => m[0]}
            intensityExtractor={m => parseFloat(m[2])}
            radius={10}
            max={100}
            minOpacity={1}
            useLocalExtrema={true}
            />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
 
        {locations &&
          locations[0].sites.map((dataLoc) => (
            <Marker position={[dataLoc.lat, dataLoc.long]} key={dataLoc.lat} icon={anchorIcon}>
              <Popup>
                Enjoy Scuba Diving at <br /> {dataLoc.lat + "," + dataLoc.long}
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}
