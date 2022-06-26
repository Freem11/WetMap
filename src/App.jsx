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
      <Map
        style={{
          position: "absolute",
          zIndex: 1,
        }}
        searchParams={searchParams}
      />
      <MonthSlider />
    </div>
  );
}

export default App;
