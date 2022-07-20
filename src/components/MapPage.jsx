import Home from "./Home"
import Map from "./Map";
import BasicMenu from "./Popup";
import MonthSlider from "./Slider";
import { useState, useContext } from "react";
import { AnimalContext } from './contexts/animalContext'

const MapPage = () => {

  const { animalVal } = useContext(AnimalContext)

    return(
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
        <Home/>
      </div>

      <div
        style={{
          width: "100%",
          position: "absolute",
          zIndex: "2",
          top: "96.8%",
          left: "4%",
          marginRight: "20px",
          maxWidth: "500px"
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
        <Map
          style={{
            position: "absolute",
            zIndex: "1",
            height: "100%"
          }}
        ></Map>
      </div>
      </div>
    )


}

export default MapPage;