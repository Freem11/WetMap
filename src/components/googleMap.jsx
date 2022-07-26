import { color, height, sizeHeight, style } from "@mui/system";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  HeatmapLayer,
  useGoogleMap,
} from "@react-google-maps/api";
import "./googleMap.css";
import useSupercluster from "use-supercluster";
import { diveSites, heatVals } from "./data/testdata";
import anchorIcon from "../images/anchor11.png";
import anchorClust from "../images/anchor3.png";
import { Satellite, LastPage } from "@mui/icons-material";
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
import { JumpContext } from "./contexts/jumpContext";
import { DiveSitesContext } from "./contexts/diveSitesContext";
import { dataParams, filterSites } from "../helpers/mapHelpers";

export default function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["visualization"],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map></Map>;
}

function Map() {
  const { mapCoords, setMapCoords } = useContext(CoordsContext);
  const { mapZoom, setMapZoom } = useContext(ZoomContext);
  const { jump, setJump } = useContext(JumpContext);
  const { divesTog, setDivesTog } = useContext(DiveSitesContext);
  const [boundaries, setBoundaries] = useState(null);

  const [newSites, setnewSites] = useState(diveSites);
  const [heatpts, setHeatPts] = useState(formatHeatVals(heatVals));
  const [mapRef, setMapRef] = useState(null);

  const center = useMemo(() => ({ lat: mapCoords[0], lng: mapCoords[1] }), []);
  const zoom = useMemo(() => mapZoom, []);

  let timoutHanlder;
  let timoutHandler;
  let newParams;
  let heatSlice;
  let SwtchDives;

  function formatHeatVals(heatValues) {
    let newArr = [];
    heatValues.forEach((heatPoint) => {
      let newpt = {
        location: new google.maps.LatLng(heatPoint.lat, heatPoint.lng),
        weight: heatPoint.weight,
      };
      newArr.push(newpt);
    });
    return newArr;
  }

  const options = useMemo(() => ({
    mapTypeId: "satellite",
    clickableIcons: false,
    maxZoom: 14,
    minZoom: 4,
  }));

  const heatOpts = useMemo(() => ({
    opacity: 1,
    radius: 30,
  }));

  useEffect(() => {
    setMapCoords([center.lat, center.lng]);
    setMapZoom(zoom);

    if (!divesTog) {
      SwtchDives = [];
    } else {
      SwtchDives = diveSites;
    }

    newParams = dataParams(mapZoom, mapCoords[0], mapCoords[1]);
    setnewSites(filterSites(newParams, SwtchDives));

    heatSlice = filterSites(newParams, heatVals);
    setHeatPts(formatHeatVals(heatSlice));
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

        if (!divesTog) {
          SwtchDives = [];
        } else {
          SwtchDives = diveSites;
        }

        newParams = dataParams(mapZoom, mapCoords[0], mapCoords[1]);
        setnewSites(filterSites(newParams, SwtchDives));

        heatSlice = filterSites(newParams, heatVals);
        setHeatPts(formatHeatVals(heatSlice));
      }, 50);
    }
  };

  const handleMapZoomChange = () => {
    if (mapRef) {
      const newZoom = mapRef.getZoom();
      setMapZoom(newZoom);

      if (!divesTog) {
        SwtchDives = [];
      } else {
        SwtchDives = diveSites;
      }

      newParams = dataParams(mapZoom, mapCoords[0], mapCoords[1]);
      setnewSites(filterSites(newParams, SwtchDives));

      heatSlice = filterSites(newParams, heatVals);
      setHeatPts(formatHeatVals(heatSlice));
    }
  };

  const handleBoundsChange = () => {
    if (mapRef) {
      window.clearTimeout(timoutHandler);
      timoutHandler = window.setTimeout(function () {
        const newBounds = mapRef.getBounds();
        let NW = { lat: newBounds.vb.hi, lng: newBounds.Ra.lo };
        let SE = { lat: newBounds.vb.lo, lng: newBounds.Ra.hi };
        console.log("boundaries are:", NW, SE);
        setBoundaries([
          newBounds.Ra.lo,
          newBounds.vb.lo,
          newBounds.Ra.hi,
          newBounds.vb.hi,
        ]);

        if (!divesTog) {
          SwtchDives = [];
        } else {
          SwtchDives = diveSites;
        }

        newParams = dataParams(mapZoom, mapCoords[0], mapCoords[1]);
        setnewSites(filterSites(newParams, SwtchDives));

        heatSlice = filterSites(newParams, heatVals);
        setHeatPts(formatHeatVals(heatSlice));
      });
    }
  };

  useEffect(() => {
    if (jump) {
      mapRef.panTo(mapCoords);
      console.log(mapCoords, mapZoom);
      setJump(!jump);
    }
  }, [jump]);

  useEffect(() => {
    if (!divesTog) {
      SwtchDives = [];
    } else {
      SwtchDives = diveSites;
    }

    newParams = dataParams(mapZoom, mapCoords[0], mapCoords[1]);
    setnewSites(filterSites(newParams, SwtchDives));

    heatSlice = filterSites(newParams, heatVals);
    setHeatPts(formatHeatVals(heatSlice));
  }, [mapCoords]);

  useEffect(() => {
    if (!divesTog) {
      SwtchDives = [];
    } else {
      SwtchDives = diveSites;
    }

    newParams = dataParams(mapZoom, mapCoords[0], mapCoords[1]);
    setnewSites(filterSites(newParams, SwtchDives));

    heatSlice = filterSites(newParams, heatVals);
    setHeatPts(formatHeatVals(heatSlice));
  }, [divesTog]);

  const points = newSites.map((site) => ({
    type: "Feature",
    properties: {
      cluster: false,
      siteID: site.name,
      category: "Dive Site",
    },
    geometry: { type: "Point", coordinates: [site.lng, site.lat] },
  }));

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds: boundaries,
    zoom: mapZoom,
    options: { radius: 75, maxZoom: 12 },
  });

  return (
    <GoogleMap
      zoom={zoom}
      center={center}
      mapContainerClassName="map-container"
      options={options}
      onLoad={handleOnLoad}
      onCenterChanged={handleMapCenterChange}
      onZoomChanged={handleMapZoomChange}
      onBoundsChanged={handleBoundsChange}
    >
      <HeatmapLayer
        data={heatpts}
        options={heatOpts}
        opacity={1}
        radius={9}
      ></HeatmapLayer>

      {clusters.map((cluster) => {
        const [longitude, latitude] = cluster.geometry.coordinates;
        const { cluster: isCluster, point_count: pointCount } =
          cluster.properties;

        if (isCluster) {
          return (
            <Marker 
              key={cluster.properties.siteID} 
              position={{ lat: latitude, lng: longitude }}
              title={pointCount.toString() + " sites"}
              icon={anchorClust}
              >
              <div
                style={{
                  width: `${10 + (pointCount / points.length) * 30}px`,
                  height: `${10 + (pointCount / points.length) * 30}px`,
                  backgroundColor: "lightblue"
                }}
              >
                {pointCount}
              </div>
            </Marker>
          );
        }
        return (
          <Marker
            key={cluster.properties.siteID}
            position={{ lat: latitude, lng: longitude }}
            icon={anchorIcon}
            title={cluster.properties.siteID}
          ></Marker>
        );
      })}
    </GoogleMap>
  );
}
