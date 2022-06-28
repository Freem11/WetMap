import { useState } from "react";
import Home from "./components/Home";
import Map from "./components/Map";
import "./App.css";
import Searchbar from "./components/Searchbar";
import MonthSlider from "./components/Slider";
import { PositionOptions } from "mapbox-gl";

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
          position: "absolute",
          width: "80%",
          marginLeft: "10%",
          top: "110px",
          zIndex: "2"
        }}
      >
        <MonthSlider />
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
