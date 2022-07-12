import { useState, useContext, useEffect } from "react";
import { Container, Button, Form, FormGroup, Label, Input } from "reactstrap";
import "./picUploader.css"
import { photos } from "../data/testdata";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import filterCreatures from '../../helpers/optionHelpers'
import TextField from '@mui/material/TextField';
import { AnimalContext } from '../contexts/animalContext'

const CreatureSearch = (props) => {

  const { closeup } = props
  const [ formVals, setFormVals ] = useState("");
  const [ filteredData, setFilteredData ] = useState("");
  const {animalVal, setAnimalVal} = useContext(AnimalContext)

  useEffect(() => {
      setFilteredData(photos)
  }, []);

  const handleChange = (e) => {
    setFormVals(e.target.value)
  };

  useEffect(() => {
    setFilteredData(filterCreatures(formVals.toLocaleLowerCase(), photos))
}, [formVals]);

  
  const handleSubmit = (e) => {
      e.preventDefault();
      setAnimalVal(e.target.textContent)
      closeup()
      
    return;
  };

  return (
    <Container fluid>
      <Form onSubmit={handleSubmit}>
      <TextField id="standard-basic" label="Creature Search..." variant="standard" onChange={handleChange} value={formVals} sx={{marginLeft: "20px", width: "80%"}}/>
      </Form>

      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <Divider />
      <nav aria-label="secondary mailbox folders">
        <List sx={{backgroundColor: "rgb(221, 226, 226)"}}>

        {filteredData &&
          filteredData.map((life) => (
            <ListItem disablePadding>
            <ListItemButton onClick={handleSubmit} >
              <ListItemText  primary={life.Animal} label={life.Animal}/>
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
