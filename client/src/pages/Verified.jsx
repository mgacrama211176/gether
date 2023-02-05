import React, { useEffect } from "react";
import { Container, Box, Paper } from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 260,
  lineHeight: "50px",
}));

const Verified = () => {
  const param = useParams();

  const validated = async () => {
    const data = await axios.get(
      `http://localhost:8000/validation/getUsers/${param.token}`
    );
    console.log(data);
  };

  useEffect(() => {
    validated();
  }, []);

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
          Thank you for verifying your email address. Your email has been
          successfully confirmed and your account is now active. You can now
          start using our platform and enjoy all of its features. If you have
          any questions or need assistance, please feel free to contact us at
          gether@gether.com.
          <br />
          <br />
          <Link to="/">
            <span>You may now login on your account</span>
          </Link>
          <br />
        </Item>
      </Box>
    </Container>
  );
};

export default Verified;
