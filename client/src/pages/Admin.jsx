import React from "react";
import Container from "@mui/material/Container";
import BGImage from "../images/ps-bg.png";

//MUI
import { Box } from "@mui/material";

//Components
import Navbar from "../components/adminComponents/NavBar";
import ManualAddUser from "../components/adminComponents/ManualAddUser";
import ViewUser from "../components/adminComponents/ViewUser";

const Admin = () => {
  return (
    <Container
      maxWidth="xxl"
      sx={{
        backgroundImage: `url(${BGImage})`,
        height: "100vh",
      }}
    >
      <Navbar />
      <Box sx={{ width: "800px", margin: "auto" }}>
        {/* <ManualAddUser /> */}
        <ViewUser />
      </Box>
    </Container>
  );
};

export default Admin;
