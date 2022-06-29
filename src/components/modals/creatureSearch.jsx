import { useState, useContext, useEffect } from "react";
import { Container, Button, Form, FormGroup, Label, Input } from "reactstrap";
import "./picUploader.css"
import Searchbar from '../Searchbar'

const CreatureSearch = (props) => {

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
       <Searchbar/>
      </Form>
    </Container>
  );
};

export default CreatureSearch;
