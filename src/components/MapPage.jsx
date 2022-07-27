import React from "react";
import Homeo from "./Home";
import Home from "./googleMap";
import Map from "./Map";
import BasicMenu from "./Popup";
import MonthSlider from "./Slider";
import GeoCoder from "./geoCoder";
import AnimalSearcher from "./AnimalSearch"
import { useState, useContext } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import Collapse from "@mui/material/Collapse";
import ExploreIcon from '@mui/icons-material/Explore';
import SearchIcon from "@mui/icons-material/Search";
import AnchorIcon from "@mui/icons-material/Anchor";
import { DiveSitesContext } from "./contexts/diveSitesContext";
import { AnimalContext } from "./contexts/animalContext";
import "./mapPage.css";

const geoCoderZone = (<div style={{marginLeft:"10px"}}><GeoCoder></GeoCoder></div>);
const animalSearchZone = (<div style={{marginLeft:"10px"}}><AnimalSearcher></AnimalSearcher></div>);

const MapPage = () => {
  
  const { divesTog, setDivesTog } = useContext(DiveSitesContext);
  const [showGeoCoder, setShowGeoCoder] = useState(false);
  const [showAnimalSearch, setShowAnimalSearch] = useState(false);
  const { animalVal, setAnimalVal } = useContext(AnimalContext);
  
  const handleGeoCoderShow = () => {
    setShowGeoCoder((prev) => !prev);
  };

  const handleAnimalSearchShow = () => {
    setShowAnimalSearch((prev) => !prev);
  };

  return (
    <div>
      <div className="col2rowT">
        <MonthSlider />
      </div>
      <div className="col3rowT">
        <BasicMenu />
      </div>

      <div className="col1row2" style={{display:"flex", flexDirection:"row"}}>
        <ToggleButton
          sx={{
            "&.Mui-selected": { backgroundColor: "gold" },
            "&.Mui-selected:hover": { backgroundColor: "gold" },
            "&:hover": { backgroundColor: "lightgrey" },
            backgroundColor: "lightgrey",
            height: "40px",
            width: "40px",
            border: "2px solid black",
            marginTop:"5px"
          }}
          value="check"
          selected={showGeoCoder}
          onChange={() => {
            setShowGeoCoder(!showGeoCoder);
          }}
        >
          <ExploreIcon />
        </ToggleButton>
        <Collapse in={showGeoCoder} orientation="horizontal" collapsedSize="0px">{geoCoderZone}</Collapse>
      </div>

      <div className="col1row3" style={{display:"flex", flexDirection:"row"}}>
        <ToggleButton
          sx={{
            "&.Mui-selected": { backgroundColor: "lightseagreen" },
            "&.Mui-selected:hover": { backgroundColor: "lightseagreen" },
            "&:hover": { backgroundColor: "lightgrey" },
            backgroundColor: "lightgrey",
            height: "40px",
            width: "40px",
            border: "2px solid black",
            marginTop: "4px"
          }}
          value="check"
          selected={showAnimalSearch}
          onChange={() => {
            setShowAnimalSearch(!showAnimalSearch);
          }}
        >
          <SearchIcon />
        </ToggleButton>
        <Collapse in={showAnimalSearch} orientation="horizontal" collapsedSize="0px">{animalSearchZone}</Collapse>
      </div>

      <div className="col1row4"> <ToggleButton
          sx={{
            "&.Mui-selected": { backgroundColor: "palegreen" },
            "&.Mui-selected:hover": { backgroundColor: "palegreen" },
            "&:hover": { backgroundColor: "lightgrey" },
            backgroundColor: "lightgrey",
            height: "40px",
            width: "40px",
            border: "2px solid black",
          }}
          value="check"
          selected={divesTog}
          onChange={() => {
            setDivesTog(!divesTog);
          }}
        >
          <AnchorIcon />
        </ToggleButton>
        </div>



      <div className="col3row3"></div>

      <div className="col1rowB">
        <Homeo />
      </div>
      <div className="col2rowB">Want to see: {animalVal}</div>

      <div>
        <Home
          style={{
            position: "absolute",
            zIndex: "1",
            height: "100%",
          }}
        ></Home>
      </div>
    </div>
  );
};

export default MapPage;
