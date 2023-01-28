import React, { useState, useEffect } from "react";
import { Container, Box } from "@mui/system";
import {
  Button,
  TextField,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import axios from "axios";

const boxContainer = {
  backgroundColor: "white",
  border: "5px solid white",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
};

const image = { width: "150px", margin: "0 auto" };

const UpdateUser = ({ user }) => {
  //   setting new state for onClick Update option
  const [updating, setUpdating] = useState(false);
  const [passValidator, setPassValidator] = useState("");

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
    newData[e.target.name] = e.target.value;
    setNewInfo(newData);
    console.log(newData);
  };

  useEffect(() => {
    if (newInfo.password === "" || newInfo.cpassword === "") {
      setPassValidator("");
    } else if (newInfo.password === newInfo.cpassword) {
      setPassValidator("password matched");
    } else {
      setPassValidator("password does not matched");
    }
  }, [newInfo]);

  //When Submitted
  const OnClickUpdate = async () => {
    const updateData = await axios.put(
      `http://localhost:8000/admin/updateUser/${user.user_id}`,
      newInfo
    );
    setUpdating(false);
    console.log(updateData);
  };

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
                    name="first_name"
                    label="First Name"
                    defaultValue={user.first_name}
                    variant="standard"
                    onChange={(e) => onChangeHandle(e)}
                  />
                  <TextField
                    id="email"
                    name="email"
                    label="Email"
                    defaultValue={user.email}
                    variant="standard"
                    onChange={(e) => onChangeHandle(e)}
                    disabled
                  />
                  <TextField
                    id="birthDate"
                    name="birthDate"
                    defaultValue={user?.birthDate}
                    variant="standard"
                    type="date"
                    onChange={(e) => onChangeHandle(e)}
                  />

                  <FormLabel id="demo-controlled-radio-buttons-group">
                    Gender
                  </FormLabel>
                  <RadioGroup
                    id="gender_identity"
                    name="gender_identity"
                    defaultValue={user.gender_identity}
                    // value={user.gender_identity}
                    onChange={(e) => onChangeHandle(e)}
                    row
                  >
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                  </RadioGroup>

                  {/* SPACE CREATED */}
                  <FormLabel id="demo-controlled-radio-buttons-group">
                    Im interested In
                  </FormLabel>
                  <RadioGroup
                    id="gender_interest"
                    name="gender_interest"
                    defaultValue={user.gender_identity}
                    // value={user.gender_identity}
                    onChange={(e) => onChangeHandle(e)}
                    row
                  >
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                  </RadioGroup>

                  {/* SPACE CREATED */}

                  <TextField
                    id="about"
                    name="about"
                    label="About"
                    defaultValue={user.about}
                    variant="standard"
                    onChange={(e) => onChangeHandle(e)}
                  />
                </Box>
                <Box sx={{ display: "flex", flexFlow: "wrap column", gap: 2 }}>
                  <TextField
                    id="password"
                    name="password"
                    label="New Password"
                    defaultValue={user.about}
                    variant="standard"
                    type="password"
                    onChange={(e) => onChangeHandle(e)}
                  />
                  <TextField
                    id="cpassword"
                    name="cpassword"
                    label="Confirm New Password"
                    defaultValue={user.about}
                    variant="standard"
                    type="password"
                    onChange={(e) => onChangeHandle(e)}
                  />
                  <TextField
                    id="url"
                    name="url"
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

      {updating === false ? "" : passValidator}

      {updating === false ? (
        <>
          <Button variant="outlined" onClick={() => setUpdating(true)}>
            Update My Information
          </Button>
        </>
      ) : (
        <>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
            <Button
              variant="outlined"
              onClick={() => {
                updating === false ? setUpdating(true) : setUpdating(false);
              }}
            >
              Back
            </Button>

            {passValidator === "password does not matched" ||
            passValidator === "" ? (
              <>
                <Button variant="outlined" onClick={OnClickUpdate} disabled>
                  Save
                </Button>
              </>
            ) : (
              <>
                <Button variant="outlined" onClick={OnClickUpdate}>
                  Save
                </Button>
              </>
            )}
          </Box>
        </>
      )}
    </Container>
  );
};

export default UpdateUser;
