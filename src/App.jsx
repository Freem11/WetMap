import { useState } from "react";
import Home from "./components/Home";
import Map from "./components/Map";
import "./App.css";
import Searchbar from "./components/Searchbar";
import MonthSlider from "./components/Slider";
import { PositionOptions } from "mapbox-gl";
import { styled, useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";

function App() {
  const [count, setCount] = useState(0);
  const [searchParams, setSearchParams] = useState("");

  return (
    <div className="App">
      <Home>
        <Searchbar
          style={{
            position: "absolute",
            zIndex: 2,
          }}
          setParams={setSearchParams}
        />
      </Home>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          position: "absolute",
          width: "90%",
          marginLeft: "10%",
          top: "110px",
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
            width: "auto",
            position: "relative",
            zIndex: "2",
            marginRight: "10px"
          }}
        >
          <MenuIcon sx={{marginTop: "3px", color: "black", height: "40px", width: "30px", backgroundColor: "white", borderRadius: "5px", border: "2px solid gray"}} />
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          width: "100%",
          zIndex: "1",
        }}
      >
        <Map
          style={{
            position: "absolute",
            zIndex: "1",
          }}
          searchParams={searchParams}
        ></Map>
      </div>
    </div>
  );
}

export default App;
