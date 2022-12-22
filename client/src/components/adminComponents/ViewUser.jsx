import React, { useState, useEffect } from "react";
import UsersCard from "./UsersCard";
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

const ViewUser = () => {
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
        {users.map((user) => (
          <UsersCard user={user} key={user._id} />
        ))}
      </Container>
    </>
  );
};

export default ViewUser;
