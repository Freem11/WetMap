import { useState, useContext, useEffect } from "react";
import { Container, Button, Form, FormGroup, Label, Input } from "reactstrap";
import "./picUploader.css"

const PicUploader = (props) => {

  const { closeup } = props

  const [ formVals, setFormVals ] = useState({
    Animal: "",
    Latitude: "",
    Longitude: "",
    PicFile: null,
  });

  const handleChange = (e) => {
    let opts = [],
      opt;

    if (e.target.type === "select" || e.target.type === "select-multiple") {
      for (let i = 0; i < e.target.options.length; i++) {
        opt = e.target.options[i];

        if (opt.selected) {
          opts.push(opt.value);
        }
      }
      setFormVals({ ...formVals, [e.target.name]: opts });
    } else {
      opt = e.target.value;
      setFormVals({ ...formVals, [e.target.name]: opt });
    }
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      console.log(e)
      closeup()
      
    return;
  };

  return (
    <Container fluid>
      <Form onSubmit={handleSubmit}>
        <div className="inputbox">
        <Label><strong>Please Upload Your Picture</strong></Label>
        <FormGroup>
          <Input
            placeholder="Upload"
            className="modalInputs2"
            style={{textAlign: 'center'}}
            id='file'
            type="file"
            name="PicFile"
            bsSize="lg"
            onChange={handleChange}
          ></Input>
        </FormGroup>
        </div>
        
        <div className="inputbox">
        <Label><strong>Animal Name</strong></Label>
        <FormGroup>
          <Input
            placeholder="Animal"
            className="modalInputs"
            style={{textAlign: 'center'}}
            id='AnimalID'
            type="text"
            name="Animal"
            bsSize="lg"
            onChange={handleChange}
          ></Input>
        </FormGroup>
        </div>

        <div className="inputbox">
        <Label><strong>Date Taken</strong></Label>
        <FormGroup>
          <Input
            placeholder="yy-mm-dd"
            className="modalInputs"
            style={{textAlign: 'center'}}
            id='DateID'
            type="date"
            name="date"
            bsSize="lg"
            onChange={handleChange}
          ></Input>
        </FormGroup>
        </div>
      
        <div className="inputbox">
        <Label><strong>Latitude</strong></Label>
        <FormGroup>
          <Input
            placeholder="Latitude"
            className="modalInputs"
            style={{textAlign: 'center'}}
            id='LatID'
            type="number"
            name="Latitude"
            bsSize="lg"
            onChange={handleChange}
          ></Input>
        </FormGroup>
        </div>

        <div className="inputbox">
        <Label><strong>Longitude</strong></Label>
        <FormGroup>
          <Input
            placeholder="Longitude"
            className="modalInputs"
            style={{textAlign: 'center'}}
            id='LongID'
            type="number"
            name="Longitude"
            bsSize="lg"
            onChange={handleChange}
          ></Input>
        </FormGroup>
        </div>
        
        <FormGroup>
          <Button id="modalButto">Submit Photo</Button>
        </FormGroup>
      </Form>
    </Container>
  );
};

export default PicUploader;
