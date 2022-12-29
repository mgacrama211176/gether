import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";

//MUI
import { styled } from "@mui/material/styles";
import {
  Input,
  Box,
  InputLabel,
  TextField,
  FormControl,
  FormControlLabel,
  Container,
  Typography,
  Radio,
  RadioGroup,
  FormLabel,
  Button,
} from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#0971f1",
      darker: "#053e85",
    },
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
  },
  typography: {
    fontSize: 12,
  },
});

const FormContainer = styled(Container)({
  color: "black",
  backgroundColor: "white",
  borderRadius: "10px",
});

const imgStyle = {
  width: "100%",
};

const OnBoarding = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    cpassword: "",
    first_name: "",
    birthDate: "",
    show_gender: false,
    gender_identity: "man",
    gender_interest: "woman",
    url: "",
    about: "",
    matches: [],
  });

  const [matchStatus, setMatchStatus] = useState("");

  const navigate = useNavigate();

  const SubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/admin/signup", {
        email: formData.email,
        password: formData.password,
        first_name: formData.first_name,
        birthDate: formData.birthDate,
        show_gender: formData.show_gender,
        gender_identity: formData.gender_identity,
        gender_interest: formData.gender_interest,
        url: formData.url,
        about: formData.about,
        matches: formData.matches,
      });
      setFormData({
        email: "",
        password: "",
        cpassword: "",
        first_name: "",
        birthDate: "",
        show_gender: false,
        gender_identity: "man",
        gender_interest: "woman",
        url: "",
        about: "",
        matches: [],
      });
      console.log(response.data);
      navigate("/admin");
    } catch (err) {
      console.log(err);
    }
  };

  const onChangeHandler = (e) => {
    const newUser = { ...formData };
    newUser[e.target.name] = e.target.value;

    if (newUser.cpassword != newUser.password) {
      setMatchStatus("Password does not match!");
      return;
    } else {
      setMatchStatus("Password match!");
    }
    console.log(newUser);
    setFormData(newUser);
  };

  return (
    <>
      <div>
        <ThemeProvider theme={theme}>
          <FormContainer sx={{ padding: 3 }}>
            <h2>Overide Add User</h2>
            <Box
              sx={{
                display: "flex",
                gap: 5,
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Box>
                <FormControl
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    fontSize: "10px",
                  }}
                >
                  <TextField
                    label="Email"
                    variant="outlined"
                    name="email"
                    type="email"
                    onChange={(e) => onChangeHandler(e)}
                    required
                  />
                  <TextField
                    type="password"
                    label="Password"
                    variant="outlined"
                    name="password"
                    onChange={(e) => onChangeHandler(e)}
                    required
                  />
                  <TextField
                    type="password"
                    label="Confirm Password"
                    variant="outlined"
                    name="cpassword"
                    onChange={(e) => onChangeHandler(e)}
                    required
                  />
                </FormControl>
                {matchStatus}
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <TextField
                  label="First Name"
                  variant="outlined"
                  name="first_name"
                  onChange={(e) => onChangeHandler(e)}
                  required
                />

                <TextField
                  type="date"
                  label=""
                  variant="outlined"
                  helperText="Birthdate"
                  name="birthDate"
                  onChange={(e) => onChangeHandler(e)}
                />

                {/* Radios for gender */}
                <FormLabel>Gender</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="gender_identity"
                  onChange={(e) => onChangeHandler(e)}
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

                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
                <FormLabel>
                  Gaming Genre Interest Sexual Preference/Interest
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="gender_interest"
                  onChange={(e) => onChangeHandler(e)}
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

                  <FormControlLabel
                    value="Everyone"
                    control={<Radio />}
                    label="Everyone"
                  />
                </RadioGroup>
                <TextField
                  label="About Me"
                  variant="outlined"
                  name="about"
                  onChange={(e) => onChangeHandler(e)}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1,
                  width: "30%",
                }}
              >
                <InputLabel>Profile Image Url</InputLabel>
                <TextField
                  type="url"
                  variant="outlined"
                  name="url"
                  onChange={(e) => onChangeHandler(e)}
                />
                <Box sx={{ width: "40%" }}>
                  {formData.url && (
                    <img
                      src={formData.url}
                      alt="profile pic preview"
                      style={imgStyle}
                    />
                  )}
                </Box>
              </Box>
            </Box>
            <Button
              variant="contained"
              onClick={SubmitHandler}
              sx={{ marginTop: "15px" }}
            >
              Submit
            </Button>
          </FormContainer>
        </ThemeProvider>
      </div>
    </>
  );
};
export default OnBoarding;
