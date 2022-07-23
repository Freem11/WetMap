import { color, height, sizeHeight, style } from "@mui/system";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  HeatmapLayer,
  useGoogleMap,
} from "@react-google-maps/api";
import "./googleMap.css";
import { diveSites } from "./data/testdata";
import anchorIcon from "../images/anchor11.png";
import { Satellite } from "@mui/icons-material";
import { useMemo, useState, useContext, useCallback, useRef, useEffect } from "react";
import { CoordsContext } from './contexts/mapCoordsContext'
import { ZoomContext } from './contexts/mapZoomContext'


export default function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["visualization"],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map></Map>;
}


function Map() {


  const gHeatVals = [
    { location: new google.maps.LatLng(50.846, -127.643), weight: 10 },
    { location: new google.maps.LatLng(49.217, -123.893), weight: 20 },
    { location: new google.maps.LatLng(49.5615, -123.236944), weight: 30 },
    { location: new google.maps.LatLng(49.3714, -123.2925), weight: 80 },
    { location: new google.maps.LatLng(50.1325, -125.336), weight: 50 },
    { location: new google.maps.LatLng(49.4495, -123.2405), weight: 10 },
    { location: new google.maps.LatLng(49.3134, -124.2424), weight: 20 },
    { location: new google.maps.LatLng(49.5615, -123.236944), weight: 30 },
  ];

  const options = useMemo(() => ({
    mapTypeId: "satellite",
    clickableIcons: false
  }));

  const heatOpts = useMemo(() => ({
    opacity: 1,
    radius: 30,
  }));


  const [mapRef, setMapRef] = useState(null)
 
  const handleOnLoad = map => {
    setMapRef(map)
  }

  let timoutHanlder;

  const handleMapCenterChange = () => {
    if (mapRef) {
      window.clearTimeout(timoutHanlder)
      timoutHanlder = window.setTimeout(function(){
        //set state here
        const newCenter = mapRef.getCenter()
        console.log("yikes", newCenter.lat(), newCenter.lng())

      },50)
    
    }
  }

  const handleMapZoomChange = () => {
    if (mapRef) {
       //set state here
      const newZoom = mapRef.getZoom()
      console.log("yikes", newZoom)
    }
  }

  return (
    <GoogleMap
      zoom={10}
      center={{ lat: 49.246292, lng: -123.116226 }}
      mapContainerClassName="map-container"
      options={options}
      onLoad={handleOnLoad}
      onCenterChanged={handleMapCenterChange}
      onZoomChanged={handleMapZoomChange}
    >
      <HeatmapLayer 
      data={gHeatVals} 
      options={heatOpts}
      opacity={1} 
      radius={9}></HeatmapLayer>

      {diveSites &&
        diveSites.map((dataLoc) => (
          <Marker
            key={dataLoc.name}
            position={{ lat: dataLoc.lat, lng: dataLoc.lng }}
            icon={anchorIcon}
            title={dataLoc.name}
          ></Marker>
        ))}
    </GoogleMap>
  );
}
