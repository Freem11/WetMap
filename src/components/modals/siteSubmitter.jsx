import { useState } from "react";
import { Container, Form, FormGroup, Label, Input } from "reactstrap";
import "./siteSubmitter.css";
import exifr from "exifr";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { exifGPSHelper } from "../../helpers/exifGPSHelpers";

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

      exifr.parse(e.target.files[0]).then((output) => {
        let EXIFData = exifGPSHelper(
          output.GPSLatitude,
          output.GPSLongitude,
          output.GPSLatitudeRef,
          output.GPSLongitudeRef
        );

        if (EXIFData) {
          setFormVals({
            ...formVals,
            Latitude: EXIFData[0],
            Longitude: EXIFData[1],
          });
        } else {
          setFormVals({ ...formVals, Latitude: "", Longitude: "" });
        }
      });
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
