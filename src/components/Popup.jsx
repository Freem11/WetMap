import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import AnchorIcon from "@mui/icons-material/Anchor";
import FormModal from "./modals/formModal";

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

  

  return (
    <div>
     
    </div>
  );
}
