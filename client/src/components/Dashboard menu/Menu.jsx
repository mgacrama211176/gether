import React, { useState } from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { selection } from "./menu_function";

export const DashboardOption = ({ option, setOption }) => {
  return (
    <ButtonGroup
      disableElevation
      variant="contained"
      aria-label="Disabled elevation buttons"
      sx={{ padding: 2, gap: 2 }}
    >
      <Button
        variant="contained"
        onClick={() => {
          setOption(true);
        }}
      >
        All Gamers
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          setOption(false);
        }}
      >
        Requesting Pairs
      </Button>
    </ButtonGroup>
  );
};
