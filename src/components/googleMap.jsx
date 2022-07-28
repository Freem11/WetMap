import {
  GoogleMap,
  useLoadScript,
  Marker,
  HeatmapLayer,
} from "@react-google-maps/api";
import "./googleMap.css";
import useSupercluster from "use-supercluster";
import { diveSites, heatVals } from "./data/testdata";
import anchorIcon from "../images/anchor11.png";
import anchorClust from "../images/anchor3.png";
import { useMemo, useState, useContext, useEffect } from "react";
import { CoordsContext } from "./contexts/mapCoordsContext";
import { ZoomContext } from "./contexts/mapZoomContext";
import { JumpContext } from "./contexts/jumpContext";
import { DiveSitesContext } from "./contexts/diveSitesContext";
import { SliderContext } from "./contexts/sliderContext";
import { AnimalContext } from "./contexts/animalContext";
import { setupMapValues } from "../helpers/mapHelpers";
import { setupClusters } from "../helpers/clusterHelpers"

const LIB = ["visualization"]

export default function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: LIB,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map></Map>;
}

function Map() {
  const { mapCoords, setMapCoords } = useContext(CoordsContext);
  const { mapZoom, setMapZoom } = useContext(ZoomContext);
  const { jump, setJump } = useContext(JumpContext);
  const { divesTog } = useContext(DiveSitesContext);
  const [boundaries, setBoundaries] = useState(null);
  const { animalVal } = useContext(AnimalContext);
  const { sliderVal } = useContext(SliderContext);

  const [newSites, setnewSites] = useState(diveSites);
  const [heatpts, setHeatPts] = useState(formatHeatVals(heatVals));
  const [mapRef, setMapRef] = useState(null);

  const center = useMemo(() => ({ lat: mapCoords[0], lng: mapCoords[1] }), []);
  const zoom = useMemo(() => mapZoom, []);

  let timoutHanlder;
  let timoutHandler;
  let DiveSiteAndHeatSpotValue;
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

    !divesTog ? (SwtchDives = []) : (SwtchDives = diveSites);

    DiveSiteAndHeatSpotValue = setupMapValues(
      mapZoom,
      mapCoords[0],
      mapCoords[1],
      SwtchDives,
      heatVals,
      sliderVal,
      animalVal
    );

    setnewSites(DiveSiteAndHeatSpotValue[0]);
    setHeatPts(formatHeatVals(DiveSiteAndHeatSpotValue[1]));
  }, []);

  const handleOnLoad = (map) => {
    setMapRef(map);
  };

  const handleMapCenterChange = () => {
    if (mapRef) {
      window.clearTimeout(timoutHanlder);
      timoutHanlder = window.setTimeout(function () {
        setMapCoords([mapRef.getCenter().lat(), mapRef.getCenter().lng()]);
        !divesTog ? (SwtchDives = []) : (SwtchDives = diveSites);

        DiveSiteAndHeatSpotValue = setupMapValues(
          mapZoom,
          mapCoords[0],
          mapCoords[1],
          SwtchDives,
          heatVals,
          sliderVal,
          animalVal
        );

        setnewSites(DiveSiteAndHeatSpotValue[0]);
        setHeatPts(formatHeatVals(DiveSiteAndHeatSpotValue[1]));
      }, 50);
    }
  };

  const handleMapZoomChange = () => {
    if (mapRef) {
      setMapZoom(mapRef.getZoom());
      !divesTog ? (SwtchDives = []) : (SwtchDives = diveSites);

      DiveSiteAndHeatSpotValue = setupMapValues(
        mapZoom,
        mapCoords[0],
        mapCoords[1],
        SwtchDives,
        heatVals,
        sliderVal,
        animalVal
      );

      setnewSites(DiveSiteAndHeatSpotValue[0]);
      setHeatPts(formatHeatVals(DiveSiteAndHeatSpotValue[1]));
    }
  };

  const handleBoundsChange = () => {
    if (mapRef) {
      window.clearTimeout(timoutHandler);
      timoutHandler = window.setTimeout(function () {
        setBoundaries([
          mapRef.getBounds().Sa.lo,
          mapRef.getBounds().vb.lo,
          mapRef.getBounds().Sa.hi,
          mapRef.getBounds().vb.hi,
        ]);

        !divesTog ? (SwtchDives = []) : (SwtchDives = diveSites);

        DiveSiteAndHeatSpotValue = setupMapValues(
          mapZoom,
          mapCoords[0],
          mapCoords[1],
          SwtchDives,
          heatVals,
          sliderVal,
          animalVal
        );

        setnewSites(DiveSiteAndHeatSpotValue[0]);
        setHeatPts(formatHeatVals(DiveSiteAndHeatSpotValue[1]));
      });
    }
  };

  useEffect(() => {
    if (jump) {
      mapRef.panTo(mapCoords);
      setJump(!jump);
    }
  }, [jump]);

  useEffect(() => {
    !divesTog ? (SwtchDives = []) : (SwtchDives = diveSites);

    DiveSiteAndHeatSpotValue = setupMapValues(
      mapZoom,
      mapCoords[0],
      mapCoords[1],
      SwtchDives,
      heatVals,
      sliderVal,
      animalVal
    );

    setnewSites(DiveSiteAndHeatSpotValue[0]);
    setHeatPts(formatHeatVals(DiveSiteAndHeatSpotValue[1]));
  }, [mapCoords, divesTog, sliderVal, animalVal]);

  const points = setupClusters(newSites);

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
        const {
          cluster: isCluster,
          point_count: pointCount,
        } = cluster.properties;

        if (isCluster) {
          return (
            <Marker
              key={cluster.id}
              position={{ lat: latitude, lng: longitude }}
              title={pointCount.toString() + " sites"}
              icon={anchorClust}
            >
              <div
                style={{
                  width: `${10 + (pointCount / points.length) * 30}px`,
                  height: `${10 + (pointCount / points.length) * 30}px`,
                  backgroundColor: "lightblue",
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
