import React, { useState, useContext } from "react";
import { Container, Button, Form, FormGroup, Label, Input } from "reactstrap";
import TextField from '@mui/material/TextField';
import axios from 'axios'
import { CoordsContext } from "./contexts/mapCoordsContext";
import { JumpContext } from "./contexts/jumpContext"

export default function GeoCoder() {

    const { setMapCoords } = useContext(CoordsContext);
    const { jump, setJump } = useContext(JumpContext);
    const [ formVal, setFormVal ] = useState("");
 
    const handleChange = (e) => {
        setFormVal(e.target.value)
      };

      const handleSubmit = (e) => {
        e.preventDefault();

        const params = {
            key: import.meta.env.VITE_MapQuest_API_KEY,
            location: formVal
        }

        axios.get(`http://www.mapquestapi.com/geocoding/v1/address?`,{params})
        .then(response => {
            setMapCoords({lat: response.data.results[0].locations[0].latLng.lat, lng: response.data.results[0].locations[0].latLng.lng})
            setJump(!jump)

        }).catch(error => {
            console.log(error)
        })
 
      return;
    };

  return (
    <Form onSubmit={handleSubmit}>
    <TextField id="standard-basic" label="Go to..." variant="standard" onChange={handleChange} value={formVal} sx={{ height: 'auto', width: "100%", backgroundColor: "white", opacity: "80%", borderRadius: "5px"}}/>
    </Form>
  );
}