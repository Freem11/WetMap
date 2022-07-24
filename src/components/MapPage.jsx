import React from "react";
import Homeo from "./Home";
import Home from "./googleMap";
import Map from "./Map";
import BasicMenu from "./Popup";
import MonthSlider from "./Slider";
import GeoCoder from "./geoCoder";
import { useState, useContext } from "react";
import { AnimalContext } from "./contexts/animalContext";
import ToggleButton from "@mui/material/ToggleButton";
import AnchorIcon from "@mui/icons-material/Anchor";
import { DiveSitesContext } from "./contexts/diveSitesContext";

const MapPage = () => {
  const { animalVal } = useContext(AnimalContext);

  const { divesTog, setDivesTog } = useContext(DiveSitesContext);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          position: "absolute",
          width: "90%",
          marginLeft: "10%",
          top: "5px",
          zIndex: "2",
        }}
      >
        <div
          style={{
            width: "90%",
            position: "relative",
            zIndex: "2",
          }}
        >
          <MonthSlider />
        </div>

        <div
          style={{
            width: "90%",
            position: "relative",
            zIndex: "2",
          }}
        >
          <GeoCoder />
        </div>

        <ToggleButton
          sx={{
            "&.Mui-selected": { backgroundColor: "palegreen" },
            "&.Mui-selected:hover": { backgroundColor: "palegreen" },
            "&:hover": { backgroundColor: "lightgrey" },
            backgroundColor: "lightgrey",height:"40px", width:'40px', border: "2px solid black"
          }}
          value="check"
          selected={divesTog}
          onChange={() => {
            setDivesTog(!divesTog);
          }}
        >
          <AnchorIcon />
        </ToggleButton>

        <div
          style={{
            width: "auto",
            position: "relative",
            zIndex: "2",
            marginRight: "10px",
            maxWidth: "10px",
          }}
        >
          <BasicMenu />
        </div>
      </div>

      <div
        style={{
          width: "20%",
          position: "absolute",
          zIndex: "2",
          top: "94%",
          marginLeft: "20px",
          maxWidth: "80px",
        }}
      >
        <Homeo />
      </div>

      <div
        style={{
          width: "100%",
          position: "absolute",
          zIndex: "2",
          top: "96.8%",
          left: "4%",
          marginRight: "20px",
          maxWidth: "500px",
          backgroundColor: "white",
        }}
      >
        Target: {animalVal}
      </div>

      <div
        style={{
          position: "absolute",
          width: "100%",
          zIndex: "1",
        }}
      >
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
