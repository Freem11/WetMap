import { useState, useContext, useEffect } from "react";
import { Container, Button, Form, FormGroup, Label, Input } from "reactstrap";
import "./picUploader.css"
import Searchbar from '../Searchbar'
import { specimins } from "../data/testdata";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

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

      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <Divider />
      <nav aria-label="secondary mailbox folders">
        <List sx={{backgroundColor: "rgb(221, 226, 226)"}}>

        {specimins &&
          specimins.map((life) => (
            <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary={life.Animal} />
            </ListItemButton>
          </ListItem>
          ))}

        </List>
      </nav>
    </Box>

    </Container>
  );
};

export default CreatureSearch;
