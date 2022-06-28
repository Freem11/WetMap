import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from '@mui/icons-material/Search';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MenuIcon sx={{
              marginTop: "3px",
              color: "black",
              height: "40px",
              width: "30px",
              backgroundColor: "white",
              borderRadius: "5px",
              border: "2px solid gray"}}
              />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
      >
        <MenuItem onClick={handleClose}sx={{height: '40px'}}><SearchIcon/></MenuItem>
        <MenuItem onClick={handleClose}sx={{height: '40px'}}><PhotoCameraIcon/></MenuItem>
      </Menu>
    </div>
  );
}