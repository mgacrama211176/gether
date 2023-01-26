import React, { useState } from "react";
import { Container, Box } from "@mui/system";
import { Button, TextField } from "@mui/material";

const boxContainer = {
  backgroundColor: "white",
  border: "5px solid white",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
};

const image = { width: "150px", margin: "0 auto" };

const UpdateUser = ({ user }) => {
  //   console.log(user);

  //   setting new state for onClick Update option
  const [updating, setUpdating] = useState(false);
  //   console.log(updating);

  // new state for the new user Information
  const [newInfo, setNewInfo] = useState({
    first_name: `${user.first_name}`,
    email: `${user.email}`,
    gender_identity: `${user.gender_identity}`,
    birthDate: `${user.birthDate}`,
    gender_interest: `${user.gender_interest}`,
    about: `${user.about}`,
    url: `${user.url}`,
    password: `${user.password}`,
    cpassword: `${user.cpassword}`,
  });

  const onChangeHandle = (e) => {
    const newData = { ...newInfo };
    newData[e.target.id] = e.target.value;
    setNewInfo(newData);
    console.log(newData);
  };

  //When Submitted
  const OnClick = () => {};

  return (
    <Container sx={boxContainer}>
      <h1>User Profile</h1>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box>
          {updating === false ? (
            <>
              <Box sx={image}>
                <img src={user.url} alt="userImage" width="100%" />
              </Box>
              <Box>
                <p>First Name: {user.first_name}</p>
                <p>Email: {user.email}</p>
                <p>Date of Birth:{user?.birthDate} </p>
                <p>Gender: {user.gender_identity}</p>
                <p>Im interested In: {user.gender_interest}</p>
                <p>About: {user.about}</p>
              </Box>
            </>
          ) : (
            <>
              <Container sx={{ display: "flex", gap: 3, margin: "20px" }}>
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    flexFlow: "wrap column",
                  }}
                >
                  <TextField
                    id="first_name"
                    label="First Name"
                    defaultValue={user.first_name}
                    variant="standard"
                    onChange={(e) => onChangeHandle(e)}
                  />
                  <TextField
                    id="email"
                    label="Email"
                    defaultValue={user.email}
                    variant="standard"
                    onChange={(e) => onChangeHandle(e)}
                  />
                  <TextField
                    id="birthDate"
                    defaultValue={user?.birthDate}
                    variant="standard"
                    type="date"
                    onChange={(e) => onChangeHandle(e)}
                  />
                  <TextField
                    id="gender_identity"
                    label="Gender"
                    defaultValue={user.gender_identity}
                    variant="standard"
                    onChange={(e) => onChangeHandle(e)}
                  />
                  <TextField
                    id="gender_interest"
                    label="Im interested In"
                    defaultValue={user.gender_interest}
                    variant="standard"
                    onChange={(e) => onChangeHandle(e)}
                  />
                  <TextField
                    id="about"
                    label="About"
                    defaultValue={user.about}
                    variant="standard"
                    onChange={(e) => onChangeHandle(e)}
                  />
                </Box>
                <Box sx={{ display: "flex", flexFlow: "wrap column", gap: 2 }}>
                  <TextField
                    id="password"
                    label="New Password"
                    defaultValue={user.about}
                    variant="standard"
                    type="password"
                    onChange={(e) => onChangeHandle(e)}
                  />
                  <TextField
                    id="cpassword"
                    label="Confirm New Password"
                    defaultValue={user.about}
                    variant="standard"
                    type="password"
                    onChange={(e) => onChangeHandle(e)}
                  />
                  <TextField
                    id="url"
                    label="User Profile Image"
                    defaultValue={newInfo.url}
                    variant="standard"
                    onChange={(e) => onChangeHandle(e)}
                  />
                  <Box sx={image}>
                    <img src={newInfo.url} alt="userImage" width="100%" />
                  </Box>
                </Box>
              </Container>
            </>
          )}
        </Box>
      </Container>
      <Button
        variant="outlined"
        onClick={() => {
          updating === false ? setUpdating(true) : setUpdating(false);
        }}
      >
        {updating === false ? "Update User Information" : "Submit"}
      </Button>
    </Container>
  );
};

export default UpdateUser;
