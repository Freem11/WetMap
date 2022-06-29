import React, { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from '@mui/icons-material/Search';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import FormModal from './modals/formModal';
import PicUploader from './modals/picUploader';
import CreatureSearch from './modals/creatureSearch'

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [modal, setModal] = useState(false)
  const [modal2, setModal2] = useState(false)

  const toggleModal = () => {
      setModal(!modal);
  }

  const toggleModal2 = () => {
    setModal2(!modal2);
}

  const doBoth = () => {
        toggleModal()
        handleClose()
  }

  const doTwo = () => {
    toggleModal2()
    handleClose()
}

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
        <MenuItem onClick={doTwo}sx={{height: '40px'}}><SearchIcon/></MenuItem>
        <MenuItem onClick={doBoth}sx={{height: '40px'}}><PhotoCameraIcon/></MenuItem>
      </Menu>

      <FormModal 
        openup={modal} 
        closeup={toggleModal}>
        <PicUploader
        closeup={toggleModal}/>
        </FormModal>

        <FormModal 
        openup={modal2} 
        closeup={toggleModal2}>
        <CreatureSearch
        closeup={toggleModal2}/>
        </FormModal>

    </div>
  );
}