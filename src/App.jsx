import { useState } from "react";
import Home from "./components/Home";
import Map from "./components/Map";
import "./App.css";
import Searchbar from "./components/Searchbar";
import MonthSlider from "./components/Slider";
import { PositionOptions } from "mapbox-gl";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Home />
      <Map style={{
          position: "absolute",
          zIndex: 1
        }}/>
      <MonthSlider />
      <Searchbar style={{
          position: "absolute",
          zIndex: 2
        }}/>
    </div>
  );
}

export default App;
