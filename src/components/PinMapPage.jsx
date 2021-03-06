import PinHome from "./googlePinMap"
import { useState, useContext } from "react";
import { PinContext } from './contexts/pinContext'
import { PicModalContext } from './contexts/picModalContext'
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";


const PinMapPage = () => {

  let navigate = useNavigate();
  const { pin, setPin } = useContext(PinContext)
  const { modal, setModal } = useContext(PicModalContext)

  const navi= () => {
    setModal(true)
    navigate("/")
  }
 
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
          <Button onClick={navi} sx={{backgroundColor: "rgb(208, 231, 208)"}}>Set Pin</Button>
        </div>

        
      </div>
  
      <div
        style={{
          position: "absolute",
          width: "100%",
          zIndex: "1",
        }}
      >
        <PinHome
          style={{
            position: "absolute",
            zIndex: "1",
            height: "100%"
          }}
        ></PinHome>
      </div>
      </div>
    )


}

export default PinMapPage;