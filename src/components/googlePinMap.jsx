import { color, height, sizeHeight, style } from "@mui/system";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  useGoogleMap,
} from "@react-google-maps/api";
import "./googleMap.css";
import { diveSites } from "./data/testdata";
import anchorIcon from "../images/anchor11.png";
import { Satellite } from "@mui/icons-material";
import {
  useMemo,
  useState,
  useContext,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { CoordsContext } from "./contexts/mapCoordsContext";
import { ZoomContext } from "./contexts/mapZoomContext";
import { dataParams, filterSites } from "../helpers/mapHelpers";

export default function PinHome() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <PinMap></PinMap>;
}

function PinMap() {
  const { mapCoords, setMapCoords } = useContext(CoordsContext);
  const { mapZoom, setMapZoom } = useContext(ZoomContext);

  const [newSites, setnewSites] = useState(diveSites);
  const [mapRef, setMapRef] = useState(null);

  const center = useMemo(() => ({ lat: mapCoords[0], lng: mapCoords[1] }), []);
  const zoom = useMemo(() => mapZoom, []);

  let timoutHanlder;
  let newParams;

  const options = useMemo(() => ({
    mapTypeId: "satellite",
    clickableIcons: false,
    maxZoom: 14,
    minZoom: 4,
  }));

  useEffect(() => {
    setMapCoords([center.lat, center.lng]);
    setMapZoom(zoom);

    newParams = dataParams(mapZoom, mapCoords[0], mapCoords[1]);
    setnewSites(filterSites(newParams, diveSites));
  }, []);

  const handleOnLoad = (map) => {
    setMapRef(map);
  };

  const handleMapCenterChange = () => {
    if (mapRef) {
      window.clearTimeout(timoutHanlder);
      timoutHanlder = window.setTimeout(function () {
        const newCenter = mapRef.getCenter();
        setMapCoords([newCenter.lat(), newCenter.lng()]);

        newParams = dataParams(mapZoom, mapCoords[0], mapCoords[1]);
        setnewSites(filterSites(newParams, diveSites));
      }, 50);
    }
  };

  const handleMapZoomChange = () => {
    if (mapRef) {
      const newZoom = mapRef.getZoom();
      setMapZoom(newZoom);

      newParams = dataParams(mapZoom, mapCoords[0], mapCoords[1]);
      setnewSites(filterSites(newParams, diveSites));
    }
  };

  return (
    <GoogleMap
      zoom={zoom}
      center={center}
      mapContainerClassName="map-container"
      options={options}
      onLoad={handleOnLoad}
      onCenterChanged={handleMapCenterChange}
      onZoomChanged={handleMapZoomChange}
    >

      {newSites &&
        newSites.map((dataLoc) => (
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
