import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Button,
  TextField,
  RadioGroup,
  Radio,
  Box,
} from "@mui/material";

export default function App({
  updateButton,
  handleClose,
  user,
  matchStatus,
  setMatchStatus,
  updateUser,
  setUpdateUser,
}) {
  const onChangeHandler = (e) => {
    const newUser = { ...updateUser };
    newUser[e.target.name] = e.target.value;

    if (newUser.cpassword != newUser.password) {
      setMatchStatus("Password does not match!");
    } else {
      setMatchStatus("Password match!");
    }

    console.log(newUser);
    setUpdateUser(newUser);
  };
  return (
    <Box>
      <Box sx={{ display: "flex", gap: 4 }}>
        <FormControl>
          <FormControl
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              type="text"
              placeholder="Email"
              defaultValue={user.email}
              label="Email"
              disabled
            />
            <TextField
              type="text"
              label="First Name"
              placeholder="First name"
              name="first_name"
              onChange={(e) => onChangeHandler(e)}
              defaultValue={user.first_name}
            />

            <TextField
              type="date"
              variant="outlined"
              helperText="Birthdate"
              name="birthDate"
              placeholder={user.birthDate}
              defaultValue={user.birthDate}
              onChange={(e) => onChangeHandler(e)}
            />
          </FormControl>

          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Gender
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="gender_identity"
              value={updateUser.gender_identity}
              onChange={(e) => onChangeHandler(e)}
            >
              <FormControlLabel value="Man" control={<Radio />} label="Man" />
              <FormControlLabel
                value="Woman"
                control={<Radio />}
                label="Woman "
              />

              <FormControlLabel
                value="Other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>

          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Gender Interest
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="gender_interest"
              onChange={(e) => onChangeHandler(e)}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="Everyone"
                control={<Radio />}
                label="Everyone"
              />
            </RadioGroup>
          </FormControl>
          <TextField
            type="text"
            label="About"
            placeholder="About"
            defaultValue={user.about}
            onChange={(e) => onChangeHandler(e)}
            name="about"
          />
        </FormControl>

        {/* CENTER */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            type="password"
            label="Password"
            name="password"
            onChange={(e) => onChangeHandler(e)}
          />
          <TextField
            type="password"
            label="Confirm Password"
            name="cpassword"
            onChange={(e) => onChangeHandler(e)}
          />

          {updateUser.password === "" ? "" : <>{matchStatus}</>}
        </Box>
        <FormControl>
          <TextField
            type="url"
            label="User Profile Image"
            onChange={(e) => onChangeHandler(e)}
            name="url"
          />

          <img src={updateUser.url} alt="profile pic preview" width={"200px"} />
        </FormControl>
      </Box>
      <Button variant="contained" size="small" onClick={updateButton}>
        Confirm
      </Button>
      <Button onClick={handleClose} variant="contained" size="small">
        Cancel
      </Button>
    </Box>
  );
}
