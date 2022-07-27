import { useState, useContext, useEffect } from "react";
import { Container, Form, FormGroup, Label, Input } from "reactstrap";
import "./siteSubmitter.css"
import exifr from "exifr";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";


const SiteSubmitter = (props) => {
  const { closeup } = props;

  const [formVals, setFormVals] = useState({
    Site: "",
    Latitude: "",
    Longitude: "",
  });

  const [uploadedFile, setUploadedFile] = useState({
    selectedFile: null,
  });

  const handleChange = (e) => {
      setFormVals({ ...formVals, [e.target.name]: e.target.value });

      if (e.target.name === "PicFile") {
        setUploadedFile({ ...uploadedFile, selectedFile: e.target.files[0] });
      }
  
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    closeup();
    return;
  };

  if (uploadedFile.selectedFile !== null) {
    exifr.parse(uploadedFile.selectedFile).then((output) => {
      if (output.GPSLatitude && output.GPSLongitude) {
        if (output.GPSLatitudeRef === "S") {
          setFormVals({
            ...formVals,
            Latitude:
              0 -
              (output.GPSLatitude[0] +
                output.GPSLatitude[1] / 60 +
                output.GPSLatitude[2] / 3600),
          });
        } else {
          setFormVals({
            ...formVals,
            Latitude:
              output.GPSLatitude[0] +
              output.GPSLatitude[1] / 60 +
              output.GPSLatitude[2] / 3600,
          });
        }

        if (output.GPSLongitudeRef === "W") {
          setFormVals({
            ...formVals,
            Longitude:
              0 -
              output.GPSLongitude[0] +
              output.GPSLongitude[1] / 60 +
              output.GPSLongitude[2] / 3600,
          });
        } else {
          setFormVals({
            ...formVals,
            Longitude:
              output.GPSLongitude[0] +
              output.GPSLongitude[1] / 60 +
              output.GPSLongitude[2] / 3600,
          });
        }
      } else {
        console.log("No GPS on this one!");
      }
    });
  }

  return (
    <Container fluid>
      <Form onSubmit={handleSubmit}>
        <div className="modalTitle">
          <Label>
            <strong>Please Submit Your Dive Site</strong>
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
              label="Site Name"
              variant="standard"
              type="text"
              name="Site"
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
              value={formVals.Latitude}
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
              value={formVals.Longitude}
              onChange={handleChange}
            />
          </FormGroup>
        </div>

        <FormGroup>
          <Button variant="text" id="modalButton">
            Submit Dive Site
          </Button>
        </FormGroup>
      </Form>
    </Container>
  );
};

export default SiteSubmitter;
