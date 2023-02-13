import React, { useState, useEffect } from "react";
import UsersCard from "./UsersCard";
import ViewUserTable from "./ViewUserTable";
import axios from "axios";
import { Container } from "@mui/material";

//MUI
const ContainerStyle = {
  display: "flex",
  flexFlow: "wrap row",
  gap: 1,

  justifyContent: "center",
  alignItems: "center",
  width: "100%",
};

const ViewUser = ({ admin }) => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const fetchingUsers = await axios.get(
      "http://localhost:8000/admin/getUsers"
    );
    setUsers(fetchingUsers.data);
  };

  useEffect(() => {
    fetchUsers();
  }, [users]);

  return (
    <>
      <Container sx={ContainerStyle}>
        <ViewUserTable users={users} admin={admin} />
      </Container>
    </>
  );
};

export default ViewUser;
