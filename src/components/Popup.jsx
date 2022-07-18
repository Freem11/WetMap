import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import AnchorIcon from "@mui/icons-material/Anchor";
import FormModal from "./modals/formModal";
import PicUploader from "./modals/picUploader";
import CreatureSearch from "./modals/creatureSearch";
import SiteSubmitter from "./modals/siteSubmitter";
import { PicModalContext } from "./contexts/picModalContext";
import { PinContext } from "../components/contexts/pinContext";

export default function BasicMenu() {
  const { pin, setPin } = useContext(PinContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setPin({
      PicFile: "",
      Animal: "",
      PicDate: "",
      Latitude: "",
      Longitude: "",
    });
  };

  const [modal2, setModal2] = useState(false);

  const { modal, setModal } = useContext(PicModalContext);

  const [modal3, setModal3] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const toggleModal2 = () => {
    setModal2(!modal2);
  };

  const toggleModal3 = () => {
    setModal3(!modal3);
  };

  const doBoth = () => {
    toggleModal();
    handleClose();
  };

  const doTwo = () => {
    toggleModal2();
    handleClose();
  };

  const doDeuce = () => {
    toggleModal3();
    handleClose();
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MenuIcon
          sx={{
            marginTop: "3px",
            color: "black",
            height: "40px",
            width: "30px",
            maxWidth: "30px",
            backgroundColor: "white",
            borderRadius: "5px",
            border: "2px solid gray",
          }}
        />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={doTwo} sx={{ height: "40px" }}>
          <SearchIcon />
        </MenuItem>
        <MenuItem onClick={doBoth} sx={{ height: "40px" }}>
          <PhotoCameraIcon />
        </MenuItem>
        <MenuItem onClick={doDeuce} sx={{ height: "40px" }}>
          <AnchorIcon />
        </MenuItem>
      </Menu>

      <FormModal openup={modal} closeup={toggleModal}>
        <PicUploader closeup={toggleModal} />
      </FormModal>

      <FormModal openup={modal2} closeup={toggleModal2}>
        <CreatureSearch closeup={toggleModal2} />
      </FormModal>

      <FormModal openup={modal3} closeup={toggleModal3}>
        <SiteSubmitter closeup={toggleModal3} />
      </FormModal>
    </div>
  );
}
