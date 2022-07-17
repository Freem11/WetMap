import React, { useState, useEffect, useCallback, useMemo, useContext, useRef, Fragment } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { diveSites, heatVals } from "./data/testdata";
import whale from "../images/icons8-spouting-whale-96.png"
import L from "leaflet";
import { CoordsContext } from './contexts/mapCoordsContext'
import { ZoomContext } from './contexts/mapZoomContext'

function DraggableMarker() {

  const { mapCoords } = useContext(CoordsContext)
  const { mapZoom } = useContext(ZoomContext)

  const [draggable, setDraggable] = useState(true)
  const [position, setPosition] = useState(mapCoords)

  console.log("pin is at:" , position)

 
  let whaleIcon = L.icon({
    iconUrl: whale,
    iconRetinaUrl: whale,
    iconAnchor: [10, 10],
    popupAnchor: [0, 0],
    iconSize: [25, 25],
  });

  const markerRef = useRef(null)
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          setPosition(marker.getLatLng())
        }
      },
    }),
    [],
  )

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
      icon={whaleIcon}>
      <Popup minWidth={90}>
        <p>
        Pin is at: {position.lat}, {position.lng}
        </p>
      </Popup>
    </Marker>
  )
}

export default function PinMap() {

  const { mapCoords } = useContext(CoordsContext)
  const { mapZoom } = useContext(ZoomContext)

  return(
  <MapContainer center={mapCoords} zoom={mapZoom} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
     <DraggableMarker />
  </MapContainer>
  )
}
