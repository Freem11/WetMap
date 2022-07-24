import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import MapPage from "./components/MapPage";
import PinMapPage from "./components/PinMapPage";
import "./App.css";
import { SliderContext } from "./components/contexts/sliderContext";
import { AnimalContext } from "./components/contexts/animalContext";
import { ZoomContext } from "./components/contexts/mapZoomContext";
import { CoordsContext } from "./components/contexts/mapCoordsContext";
import { PinContext } from "./components/contexts/pinContext";
import { PicModalContext } from "./components/contexts/picModalContext";
import { JumpContext } from "./components/contexts/jumpContext";
import { useContext } from "react";

function App() {
  
  const d = new Date();
  const [sliderVal, setSliderVal] = useState(d.getMonth());
  const [animalVal, setAnimalVal] = useState("None");

  const [mapCoords, setMapCoords] = useState([49.246292, -123.116226]);
  const [mapZoom, setMapZoom] = useState(10);

  const [modal, setModal] = useState(false);
  const [jump, setJump] = useState(false);

  const [pin, setPin] = useState({
    PicFile: "",
    Animal: "",
    PicDate: "",
    Latitude: "",
    Longitude: "",
  });

  console.log("??", sliderVal);
  console.log("!!", animalVal);

  console.log("AAA", mapCoords);
  console.log("ZZZ", mapZoom);

  console.log("###", pin);

  return (
    <div className="App">
      <SliderContext.Provider value={{ sliderVal, setSliderVal }}>
        <AnimalContext.Provider value={{ animalVal, setAnimalVal }}>
          <ZoomContext.Provider value={{ mapZoom, setMapZoom }}>
            <CoordsContext.Provider value={{ mapCoords, setMapCoords }}>
              <PinContext.Provider value={{ pin, setPin }}>
                <PicModalContext.Provider value={{ modal, setModal }}>
                  <JumpContext.Provider value={{jump, setJump}}>
                  <BrowserRouter>
                    <Routes>
                      <Route path="/" element={<MapPage />} />
                      <Route path="/pinDrop" element={<PinMapPage />} />
                    </Routes>
                  </BrowserRouter>
                  </JumpContext.Provider>
                </PicModalContext.Provider>
              </PinContext.Provider>
            </CoordsContext.Provider>
          </ZoomContext.Provider>
        </AnimalContext.Provider>
      </SliderContext.Provider>
    </div>
  );
}

export default App;
