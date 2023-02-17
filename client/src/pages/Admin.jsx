import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import BGImage from "../images/ps-bg.png";
import { ToastContainer } from "react-toastify";
import { useCookies } from "react-cookie";
import axios from "axios";

//MUI
import { Box } from "@mui/material";

//Components
import Navbar from "../components/adminComponents/NavBar";
import ManualAddUser from "../components/adminComponents/ManualAddUser";
import ViewUser from "../components/adminComponents/ViewUser";
import ViewAdmin from "../components/adminComponents/ViewAdmin";

const Admin = () => {
  const [type, setType] = useState("Add User");
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [admin, setAdmin] = useState(null);
  const userId = cookies.UserId;

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:8000/user", {
        params: { userId },
      });

      setAdmin(response.data.access);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {/* Same as */}
      <ToastContainer />
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
              <ManualAddUser setType={setType} admin={admin} />
            </>
          ) : type === "View Users" ? (
            <>
              <ViewUser admin={admin} />
            </>
          ) : (
            <ViewAdmin admin={admin} />
          )}
        </Box>
      </Container>
    </>
  );
};

export default Admin;
