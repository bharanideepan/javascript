import React from "react";
import { makeStyles } from "@mui/styles";
import { Box, Dialog, IconButton } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.default,
    color: theme.palette.text.primary,
    padding: "2vmin",
    display: "flex",
    height: "100%",
    overflow: "hidden",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    border: `0.1vmin solid ${theme.palette.text.primary}`,
    fontWeight: 700,
  },
}));

const Modal = ({ open, onClose, header, children, hideClose }) => {
  const classes = useStyles();
  return (
    <Dialog onClose={onClose} open={open} fullWidth={true}>
      <Box className={classes.root}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-around"
          height="100%"
        >
          <Box
            py={1.5}
            textAlign="center"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box ml={!hideClose ? "auto" : 0}>
              <h2>{header}</h2>
            </Box>
            {!hideClose && (
              <Box ml="auto" mr={{ xs: 1.5, md: 2.25 }}>
                <IconButton className="close" onClick={onClose}>
                  <CancelIcon />
                </IconButton>
              </Box>
            )}
          </Box>
          <Box>{children}</Box>
        </Box>
      </Box>
    </Dialog>
  );
};

Modal.defaultProps = {
  hideClose: false,
};

export default Modal;
