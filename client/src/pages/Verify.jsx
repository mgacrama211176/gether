import React from "react";
import { Box, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import background from "../images/gethersplashpage2.gif";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 260,
  lineHeight: "50px",
}));

const Verify = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${background})`,
        height: "100%",
        maxWidth: "100%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        margin: 0,
      }}
    >
      <Box
        sx={{
          p: 2,
          bgcolor: "transparent",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Item elevation={3} sx={{ fontSize: "20px" }}>
          Thank you for registering with us. To complete your registration and
          start using our platform, we need to verify your email address. Please
          check your email and follow the instructions in the verification email
          to confirm your email address. If you did not receive a verification
          email, please check your spam or junk folder or contact us at
          gether@gmail.com.
          <br />
          If you did not sign up for our services, please ignore this email.
        </Item>
      </Box>
    </Box>
  );
};

export default Verify;
