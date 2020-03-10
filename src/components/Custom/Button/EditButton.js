import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import { Button } from "@material-ui/core";

export default function EditButton(props) {
  return (
    <Button
      size="small"
      startIcon={<EditIcon />}
      variant="contained"
      color="default"
      disableElevation
      style={{ margin: "0 1rem" }}
      onClick={props.handleClick}
    >
      Ubah
    </Button>
  );
}
