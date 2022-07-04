import { useState, useContext, useEffect } from "react";
import { Container, Form, FormGroup, Label, Input } from "reactstrap";
import "./picUploader.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import exifr from 'exifr'

const PicUploader = (props) => {
  const { closeup } = props;

   
  const [formVals, setFormVals] = useState({
    Animal: "",
    Latitude: "",
    Longitude: "",
    PicDate: "",
    PicFile: null,
  });

  useEffect(() => {

  let Rnow = new Date();

  let yr0 = Rnow.getFullYear().toString();
  let mth0 = (Rnow.getMonth() + 1).toString();
  let dy0 = Rnow.getDate().toString();

  if (dy0.length == 1) {
    dy0 = '0' + dy0
  }

  if (mth0.length == 1) {
    mth0 = '0' + mth0
  }

  let rightNow = yr0 + "-" + mth0 + "-" + dy0

  setFormVals({ ...formVals,  PicDate: rightNow })

  }, []);


  const handleChange = (e) => {

    if (e.target.name === "PicFile") {

    let fileName = e.target.files[0].name
    let baseDate = e.target.files[0].lastModifiedDate

    let yr = baseDate.getFullYear().toString();
    let mth = (baseDate.getMonth() + 1).toString();
    let dy = baseDate.getDate().toString();

    if (dy.length == 1) {
      dy = '0' + dy
    }

    if (mth.length == 1) {
      mth = '0' + mth
    }

    // console.log("just work already", e.target.files[0])

    // let {latitude, longitude} = exifr.gps(e.target.files[0].name)
  
    // Promise.all([latitude, longitude])
    // .then((response) => {
    //     console.log("huh?", response);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
 
    let moddedDate = yr + "-" + mth + "-" + dy

    setFormVals({ ...formVals, PicFile: fileName, PicDate: moddedDate })
    } else {
      setFormVals({ ...formVals, [e.target.name]: e.target.value });

    }
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    closeup();
    return;
  };

  return (
    <Container fluid>
      <Form onSubmit={handleSubmit}>
        <div className="modalTitle">
          <Label>
            <strong>Please Upload Your Picture</strong>
          </Label>
          </div>

          <div className="uploadbox">
          <FormGroup>
            <Input
              placeholder="Upload"
              className="modalInputs2"
              style={{ textAlign: "center" }}
              id="file"
              type="file"
              name="PicFile"
              bsSize="lg"
              onChange={handleChange}
            ></Input>
          </FormGroup>
        </div>

        <div className="inputbox">
          <FormGroup>
            <TextField
              id="standard-basic"
              label="Animal"
              variant="standard"
              type="text"
              name="Animal"
              onChange={handleChange}
            />
          </FormGroup>
        </div>

        <div className="inputbox">
          <FormGroup>
            <TextField
              id="standard-basic"
              label="Date Taken"
              variant="standard"
              type="date"
              name="PicDate"
              value={formVals.PicDate}
              onChange={handleChange}
              sx={{width: "167px"}}
            />
          </FormGroup>
        </div>

        <div className="inputbox">
          <FormGroup>
            <TextField
              id="standard-basic"
              label="Latitude"
              variant="standard"
              type="decimal"
              name="Latitude"
              onChange={handleChange}
            />
          </FormGroup>
        </div>
       
        <div className="inputbox">
          <FormGroup>
            <TextField
              id="standard-basic"
              label="Longitude"
              variant="standard"
              type="decimal"
              name="Longitude"
              onChange={handleChange}
            />
          </FormGroup>
        </div>
       
        <FormGroup>
          <Button variant="text" id="modalButton">Submit Photo</Button>
        </FormGroup>
      </Form>
    </Container>
  );
};

export default PicUploader;
