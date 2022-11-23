import React from "react";
import whiteLogo from "../images/gether-logo.png";
import colorLogo from "../images/gether-logo.png";
import styled from "styled-components";

const Container = styled.div``;

const NavBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const LogoContainer = styled.div`
  width: 170px;
  margin: 15px;
`;

const Logo = styled.img`
  width: 100%;
`;

const Button = styled.button`
  color: rgb(248, 248, 248);
  background: linear-gradient(
    90deg,
    rgba(32, 30, 146, 0.966),
    rgb(134, 65, 190)
  );
  font-size: 20px;
  height: 60px;
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
  margin: 10px;
  box-shadow: 0px 0px 15px 1px rgb(92, 35, 59);

  &:hover {
    background: linear-gradient(260deg, rgb(32, 185, 57), rgb(32, 185, 57));
    cursor: pointer;
  }

  &:disabled {
    background-color: rgb(181, 180, 180);
    color: rgb(189, 42, 90);
  }
`;

const Nav = ({ authToken, minimal, setShowModal, showModal, setIsSignUp }) => {
  const handleClick = () => {
    setShowModal(true);
    setIsSignUp(false);
  };
  return (
    <Container>
      <NavBar>
        <LogoContainer>
          <Logo src={minimal ? colorLogo : whiteLogo} alt="logo" />
        </LogoContainer>
        {!authToken && !minimal && (
          <Button
            className="nav-button"
            onClick={handleClick}
            disabled={showModal}
          >
            Log in
          </Button>
        )}
      </NavBar>
    </Container>
  );
};

export default Nav;
