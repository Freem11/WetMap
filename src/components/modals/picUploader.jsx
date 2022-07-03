import { useState, useContext, useEffect } from "react";
import { Container, Form, FormGroup, Label, Input } from "reactstrap";
import "./picUploader.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';

const PicUploader = (props) => {
  const { closeup } = props;

  const [formVals, setFormVals] = useState({
    Animal: "",
    Latitude: "",
    Longitude: "",
    PicDate: '',
    PicFile: null,
  });

  const handleChange = (e) => {

    if (e.target.name === "PicFile") {

      console.log("meee",e.target.files[0])

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

    let moddedDate = yr + "-" + mth + "-" + dy
    console.log("!!!", moddedDate)
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

  console.log("what am i?", formVals)


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
