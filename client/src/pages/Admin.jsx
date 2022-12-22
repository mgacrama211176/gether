import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import BGImage from "../images/ps-bg.png";

//MUI
import { Box } from "@mui/material";

//Components
import Navbar from "../components/adminComponents/NavBar";
import ManualAddUser from "../components/adminComponents/ManualAddUser";
import ViewUser from "../components/adminComponents/ViewUser";

const Admin = () => {
  const [type, setType] = useState("Add User");

  return (
    <Container
      maxWidth="xxl"
      sx={{
        backgroundImage: `url(${BGImage})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <Navbar type={type} setType={setType} />

      <Box sx={{ margin: "0 auto", padding: "50px" }}>
        {type === "Add User" ? (
          <>
            <ManualAddUser />
          </>
        ) : (
          <>
            <ViewUser />
          </>
        )}
      </Box>
    </Container>
  );
};

export default Admin;
