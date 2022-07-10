import { useState } from "react";
import Home from "./components/Home";
import Map from "./components/Map";
import BasicMenu from "./components/Popup";
import "./App.css";
import MonthSlider from "./components/Slider";
import { styled, useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";

function App() {
  const [count, setCount] = useState(0);
  const [searchParams, setSearchParams] = useState("");

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          position: "absolute",
          width: "90%",
          marginLeft: "10%",
          top: "5px",
          zIndex: "2",
        }}>

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
            marginRight: "10px",
            maxWidth: "10px"
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
          maxWidth: "80px"
        }}
      >
        <Home />
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
            height: "100%"
          }}
          searchParams={searchParams}
        ></Map>
      </div>
    </div>
  );
}

export default App;
