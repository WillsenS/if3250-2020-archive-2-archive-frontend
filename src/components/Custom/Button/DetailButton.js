import React from "react";
import { Button } from "@material-ui/core";
import FindInPageIcon from "@material-ui/icons/FindInPage";

export default function DetailButton() {
  return (
    <Button
      size="small"
      startIcon={<FindInPageIcon />}
      variant="contained"
      color="primary"
      disableElevation
      style={{ margin: "0 1rem" }}
    >
      Detail
    </Button>
  );
}
