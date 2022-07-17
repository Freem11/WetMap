import { useState, useContext, useEffect } from "react";
import { Container, Form, FormGroup, Label, Input } from "reactstrap";
import "./picUploader.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import exifr from "exifr";
import { useNavigate } from "react-router-dom";

const PicUploader = (props) => {
  const { closeup } = props;
  let navigate = useNavigate();

  const [formVals, setFormVals] = useState({
    Animal: "",
    Latitude: "",
    Longitude: "",
    PicDate: "",
    PicFile: null,
  });

  const [uploadedFile, setUploadedFile] = useState({
    selectedFile: null,
  });

  useEffect(() => {
    let Rnow = new Date();

    let yr0 = Rnow.getFullYear().toString();
    let mth0 = (Rnow.getMonth() + 1).toString();
    let dy0 = Rnow.getDate().toString();

    if (dy0.length == 1) {
      dy0 = "0" + dy0;
    }

    if (mth0.length == 1) {
      mth0 = "0" + mth0;
    }

    let rightNow = yr0 + "-" + mth0 + "-" + dy0;

    setFormVals({
      ...formVals,
      PicDate: rightNow,
      Longitude: null,
      Latitude: null,
    });
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "PicFile") {
      let fileName = e.target.files[0].name;
      let baseDate = e.target.files[0].lastModified;

      setUploadedFile({ ...uploadedFile, selectedFile: e.target.files[0] });

      var convDate = new Date(baseDate);

      let yr = convDate.getFullYear().toString();
      let mth = (convDate.getMonth() + 1).toString();
      let dy = convDate.getDate().toString();

      if (dy.length == 1) {
        dy = "0" + dy;
      }

      if (mth.length == 1) {
        mth = "0" + mth;
      }

      let moddedDate = yr + "-" + mth + "-" + dy;

      setFormVals({ ...formVals, PicFile: fileName, PicDate: moddedDate });
    } else {
      setFormVals({ ...formVals, [e.target.name]: e.target.value });
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

  const navi= () => {
    navigate("/pinDrop")
  }

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
              sx={{ width: "167px" }}
            />
          </FormGroup>
        </div>

        <div>
          <div>
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
          </div>
          <FormGroup>
            <Button variant="text" id="jumpButton" onClick={navi}>
              Drop Pin
            </Button>
          </FormGroup>
        </div>

        <FormGroup>
          <Button variant="text" id="modalButton">
            Submit Photo
          </Button>
        </FormGroup>
      </Form>
    </Container>
  );
};

export default PicUploader;
