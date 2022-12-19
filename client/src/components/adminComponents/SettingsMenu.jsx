import React from "react";
import { Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

const BoxStyle = {
  width: "100px",
};

const SettingsMenu = () => {
  return (
    <div>
      <Box sx={BoxStyle}>
        <Typography>Profile</Typography>
        <Typography>Account</Typography>
        <Link to="/dashboard">
          <Typography>Dashboard</Typography>
        </Link>
        <Typography>Logout</Typography>
      </Box>
    </div>
  );
};

export default SettingsMenu;
