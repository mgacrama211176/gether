import React, { useState, useEffect } from "react";
import { Container, Box } from "@mui/system";
import {
  Button,
  TextField,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import MatchedTable from "./MatchedTable";
import ComboBox from "./ComboBox";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const boxContainer = {
  backgroundColor: "white",
  border: "5px solid white",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
};

const image = { width: "150px", margin: "0 auto" };

const UpdateUser = ({ user, userId, setUpdate }) => {
  //   setting new state for onClick Update option
  const [updating, setUpdating] = useState(false);
  const [passValidator, setPassValidator] = useState("");
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState("");
  const [viewUser, setViewUser] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  //For the genre category
  const options = ["rts", "fps", "rpg", "moba"];
  const [value, setValue] = useState(user.genre);
  const [inputValue, setInputValue] = useState("");
  const nav = useNavigate();

  const OnclickSelectedPairing = async () => {
    const fetched = await axios.get(
      `http://localhost:8000/usersInfo/usersById/${selected}`
    );

    fetched.data.map((user) => {
      setViewUser(user);
    });
  };

  useEffect(() => {
    if (selected !== "") {
      OnclickSelectedPairing();
    } else {
    }
  }, [selected]);

  // new state for the new user Information
  const [newInfo, setNewInfo] = useState({
    first_name: `${user.first_name}`,
    email: `${user.email}`,
    gender_identity: `${user.gender_identity}`,
    birthDate: `${user.birthDate}`,
    gender_interest: `${user.gender_interest}`,
    about: `${user.about}`,
    url: `${user.url}`,
    password: ``,
    cpassword: ``,
    genre: `${user.genre}`,
    access: "user",
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
      if (newInfo.password.length > 4) {
        setPassValidator("password matched");
      } else {
        setPassValidator("Password must be minimum of 5 characters");
      }
    } else {
      setPassValidator("password does not matched");
    }
  }, [newInfo]);

  //When Submitted
  const OnClickUpdate = async () => {
    setLoading(true);
    const updateData = await axios.put(
      `http://localhost:8000/admin/updateUser/${user.user_id}`,
      newInfo
    );
    console.log(updateData);

    setUpdating(false);
    setLoading(false);
    nav("/dashboard");
    window.location.reload();
  };

  // remove Match
  const removeMatches = async () => {
    try {
      const process = await axios.get(
        `http://localhost:8000/unmatch/${userId}/${selected}`
      );
    } catch (err) {
      console.log(err);
    }
    window.location.reload();
  };

  const closeProfileModal = () => {
    setUpdate(false);
  };

  return (
    <Container sx={boxContainer}>
      <h1>User Profile</h1>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "-75px",
            right: "5px",
            cursor: "pointer",
          }}
          onClick={closeProfileModal}
        >
          <p>X</p>
        </Box>
        <Box>
          {updating === false ? (
            <>
              <Box
                sx={{ display: "flex", justifyContent: "space-evenly", gap: 2 }}
              >
                <Box>
                  {viewUser === "" ? (
                    <>
                      <Box sx={image}>
                        <img src={user.url} alt="userImage" width="100%" />
                      </Box>
                      <Box>
                        <p>First Name: {user.first_name}</p>
                        <p>Email: {user.email}</p>
                        <p>Date of Birth:{user?.birthDate} </p>
                        <p>Gender: {user.gender_identity}</p>
                        <p>Genre: {user.genre}</p>
                        <p>Im interested In: {user.gender_interest}</p>
                        <p>About: {user.about}</p>
                      </Box>
                    </>
                  ) : (
                    <>
                      {/* Others Profile */}
                      <Box sx={image}>
                        <img src={viewUser.url} alt="userImage" width="100%" />
                      </Box>
                      <Box>
                        <p>First Name: {viewUser.first_name}</p>
                        <p>Email: {viewUser.email}</p>
                        <p>Date of Birth:{viewUser?.birthDate} </p>
                        <p>Gender: {viewUser.gender_identity}</p>
                        <p>Genre: {viewUser.genre}</p>
                        <p>Im interested In: {viewUser.gender_interest}</p>
                        <p>About: {viewUser.about}</p>
                      </Box>
                    </>
                  )}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <h2>User Matches</h2>
                  <ComboBox
                    //Category
                    value={value}
                    setValue={setValue}
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                    options={options}
                    user={user}
                  />

                  <MatchedTable
                    user={user}
                    selected={selected}
                    setSelected={setSelected}
                    value={value}
                    viewUser={viewUser}
                  />
                  {/* <MatchedUsers user={user} /> */}
                </Box>
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

                  <FormLabel id="demo-controlled-radio-buttons-group">
                    Gaming Genre
                  </FormLabel>
                  <RadioGroup
                    id="genre"
                    name="genre"
                    defaultValue={user.genre}
                    onChange={(e) => onChangeHandle(e)}
                    row
                  >
                    <FormControlLabel
                      value="rts"
                      control={<Radio />}
                      label="RTS"
                    />
                    <FormControlLabel
                      value="moba"
                      control={<Radio />}
                      label="MOBA"
                    />
                    <FormControlLabel
                      value="fps"
                      control={<Radio />}
                      label="FPS"
                    />
                    <FormControlLabel
                      value="rpg"
                      control={<Radio />}
                      label="RPG"
                    />
                  </RadioGroup>

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
              {loading ? (
                <>
                  <Box>
                    <CircularProgress />
                    <p>Saving game files....</p>
                  </Box>
                </>
              ) : (
                <></>
              )}
            </>
          )}
        </Box>
      </Container>

      {updating === false ? "" : passValidator}

      {updating === false ? (
        <>
          {viewUser ? (
            <>
              <Button variant="outlined" onClick={removeMatches}>
                Unpair
              </Button>
            </>
          ) : (
            <>
              <Button variant="outlined" onClick={() => setUpdating(true)}>
                Update My Information
              </Button>
            </>
          )}
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
            passValidator === "Password must be minimum of 5 characters" ? (
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
