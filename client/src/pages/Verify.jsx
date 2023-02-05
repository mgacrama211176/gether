import React from "react";
import { Container, Box, Paper } from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 260,
  lineHeight: "50px",
}));

const Verify = () => {
  return (
    <Container>
      <Box
        sx={{
          p: 2,
          bgcolor: "background.default",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Item elevation={3} sx={{ fontSize: "18px" }}>
          Thank you for registering with us. To complete your registration and
          start using our platform, we need to verify your email address. Please
          check your email and follow the instructions in the verification email
          to confirm your email address. If you did not receive a verification
          email, please check your spam or junk folder or contact us at
          gether@gether.com.
          <br />
          If you did not sign up for our services, please ignore this email.
        </Item>
      </Box>
    </Container>
  );
};

export default Verify;
