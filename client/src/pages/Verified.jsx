import React, { useEffect } from "react";
import { Box, Paper, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import background from "../images/gethersplashpage2.gif";

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
      `https://getherbackend.onrender.com/validation/getUsers/${param.token}`
    );
    console.log(data);
  };

  useEffect(() => {
    validated();
  }, []);

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
        <Item
          elevation={1}
          sx={{
            fontSize: "36px",
            color: "white",
            backgroundColor: "transparent",
          }}
        >
          Thank you for verifying your email address. Your email has been
          successfully confirmed and your account is now active. You can now
          start using our platform and enjoy all of its features. If you have
          any questions or need assistance, please feel free to contact us at
          gether@gether.com.
          <br />
          <br />
          <Link to="/">
            <Button
              variant="outlined"
              className="primary-button"
              sx={{
                fontSize: "36px",
                color: "white",
                borderRadius: "30px",
                textDecoration: "none",
                "&:hover": {
                  color: "white",
                },
              }}
            >
              Login
            </Button>
          </Link>
          <br />
        </Item>
      </Box>
    </Box>
  );
};

export default Verified;
