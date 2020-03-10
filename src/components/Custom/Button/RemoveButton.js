import React from "react";
import { Button, withStyles } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { red } from "@material-ui/core/colors";

const ColorButton = withStyles(theme => ({
  root: {
    // color: theme.palette.getContrastText(red[500]),
    color: theme.palette.getContrastText("#cb2431"),
    backgroundColor: "#cb2431",
    "&:hover": {
      backgroundColor: red[500]
    }
  }
}))(Button);

export default function RemoveButton(props) {
  return (
    <ColorButton
      size="small"
      startIcon={<DeleteIcon />}
      variant="contained"
      disableElevation
      style={{ margin: "0 1rem" }}
      onClick={props.handleClick}
    >
      Hapus
    </ColorButton>
  );
}
