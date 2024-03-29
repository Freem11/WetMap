import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button } from "reactstrap";
import "./formModal.css";
import { PinContext } from "../contexts/pinContext";

const style = {
  position: "absolute",
  width: 300,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "rgb(221, 226, 226)",
  border: "4px solid #102E4A",
  boxShadow: 24,
  p: 1.5,
  borderRadius: "10px",
};

const FormModal = React.memo((props) => {
  const { openup, closeup, children } = props;
  const { setPin } = useContext(PinContext);

  const handleClose = () => {
    setPin({
      PicFile: "",
      Animal: "",
      PicDate: "",
      Latitude: "",
      Longitude: "",
    });
    closeup();
  };

  return (
    <div>
      <Modal open={openup} onClose={closeup}>
        <Box sx={style}>
          <div className="modalBox">
            <Button
              style={{
                color: "#D8DBE2",
                backgroundColor: "maroon",
                boxShadow: "2px 2px 3px 1px rgb(131, 127, 127)",
              }}
              className="modalButton2"
              onClick={handleClose}
            >
              X
            </Button>
          </div>
          {children}
        </Box>
      </Modal>
    </div>
  );
});

export default FormModal;
