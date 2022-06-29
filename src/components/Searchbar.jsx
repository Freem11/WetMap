import React, { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const Searchbar = ({ setSearchItem }) => {
  const [params, setParams] = useState("");
  const search = (e) => {
    e.preventDefault();
    console.log(params);
    setSearchItem(params);
  };
  return (
    <Box
    component="form"
    sx={{
      '& > :not(style)': { m: 1, width: '25ch' },
    }}
    noValidate
    autoComplete="off"
  >
    <TextField id="standard-basic" label="Creature Search..." variant="standard" />
  </Box>
  );
};

export default Searchbar;
