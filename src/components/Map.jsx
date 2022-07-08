import React, { useState, useEffect, useCallback, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { data, diveSites, tester } from "./data/testdata";
import anchor from "../images/anchor6.png";
import { HeatmapLayer } from "react-leaflet-heatmap-layer-v3";
import L from "leaflet";

const center = [49.246292, -123.116226]
const zoom = 7
let timoutHanlder;

function DisplayPosition({map}) {

  const [position, setPosition] = useState(() => map.getCenter())
  const [zoomlev, setZoomlev] = useState(() => map.getZoom())

  const onMove = useCallback(() => {
    window.clearTimeout(timoutHanlder)
    timoutHanlder = window.setTimeout(function(){
      setPosition(map.getCenter()) 
      setZoomlev(map.getZoom())
    },50)
    },
    [map],
  )

  useEffect(() => {
      map.on('move', onMove)
    return () => {
      map.off('move', onMove)
    }
  }, [map, onMove])

  return(<div style={{zIndex: 7, position: "relative", top: '300px'}}>{position.lat}, {position.lng}, <br></br> {zoomlev}</div>)
}

 function ExtState({ searchParams }) {
  const [map , setMap] = useState(null);

  const locations = data.filter((loc) => loc.location === "vancouver");

  let anchorIcon = L.icon({
    iconUrl: anchor,
    iconRetinaUrl: anchor,
    iconAnchor: [10, 10],
    popupAnchor: [0, 0],
    iconSize: [25, 25],
  });

  const gradient1 = { 0.2: "blue", 0.4: "green", 0.6: "yellow", 0.8: "orange", 1: "red"};

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(function (location) {
  //     setLatitude(location.coords.latitude);
  //     setLongitude(location.coords.longitude);
  //   });
  // }, [latitude, longitude]);

  // const initialPosition = [latitude, longitude];
  // const [position, setPosition] = useState(initialPosition);
  console.log("yikes", diveSites)

  const displayMap = useMemo(() => (
  
  <MapContainer
    center={center}
    zoom={zoom}
    scrollWheelZoom={true}
    minZoom={4}
    maxZoom={17}
    ref={setMap}
  >
    <HeatmapLayer
      fitBoundsOnLoad
      fitBoundsOnUpdate
      points={tester}
      longitudeExtractor={(m) => m[1]}
      latitudeExtractor={(m) => m[0]}
      intensityExtractor={(m) => parseFloat(m[2])}
      radius={10}
      max={1}
      minOpacity={1}
      gradient={gradient1}
    />
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />

    {diveSites &&
      diveSites.map((dataLoc) => (
        <Marker
          key={dataLoc.name}
          position={[dataLoc.lat, dataLoc.lng]}
          icon={anchorIcon}
        >
          <Popup>
            {dataLoc.name}
          </Popup>
        </Marker>
      ))}
  </MapContainer>), [])
  
  return (
    <div className="map-container">
      {map ? <DisplayPosition map={map} /> : null}
      {displayMap}
    </div>
  );
}

export default function () {
  return (
    <ExtState />
  )
}
