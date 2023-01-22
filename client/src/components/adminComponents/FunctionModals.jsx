import React, { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";

import UpdateForm from "./UpdateForm";
import RetrievedUserCard from "./RetrievedUserCard";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const styleMatched = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -25%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const DeleteModal = ({ user }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const deleteButton = async () => {
    console.log(user.user_id);
    const deleteData = await axios.delete(
      `http://localhost:8000/admin/deleteUser/${user.user_id}`
    );

    console.log(deleteData.status);
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="contained" size="small">
        Delete User
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Are you sure you want to delete {user.first_name}
            </Typography>
            <Button variant="contained" size="small" onClick={deleteButton}>
              Yes
            </Button>
            <Button onClick={handleClose} variant="contained" size="small">
              NO
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export const UpdateModal = ({ user }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [updateUser, setUpdateUser] = useState({
    first_name: user.first_name,
    birthDate: user.birthDate,
    gender_identity: user.gender_identity,
    gender_interest: user.gender_interest,
    about: user.about,
    password: user.password,
    cpassword: user.cpassword,
    url: user.url,
  });

  const [matchStatus, setMatchStatus] = useState("");

  const updateButton = async () => {
    console.log(user.user_id);
    const id = user.user_id;
    console.log(updateUser);

    console.log("user info updated!");
    const updateData = await axios.put(
      `http://localhost:8000/admin/updateUser/${id}`,
      updateUser
    );
    console.log(updateData.status);
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="contained" size="small">
        Update User
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Update {user.first_name} Information
            </Typography>

            <UpdateForm
              updateButton={updateButton}
              handleClose={handleClose}
              user={user}
              updateUser={updateUser}
              setUpdateUser={setUpdateUser}
              matchStatus={matchStatus}
              setMatchStatus={setMatchStatus}
            />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export const MatchUserModal = ({ user }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    matches();
  };
  const handleClose = () => setOpen(false);

  const [fetched, setfetched] = useState([]);

  //Setting the retrived users that have matched with this user.
  const matches = async () => {
    const fetchData = await axios.get(
      `http://localhost:8000/admin/matched/${user.user_id}`
    );
    setfetched(fetchData.data);
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="contained" size="small">
        Matched Users
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        sx={{ overflowY: "scroll", height: "90%" }}
      >
        <Fade in={open}>
          <Box sx={styleMatched}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Matched Users
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexFlow: "wrap row",
                gap: 2,
              }}
            >
              {fetched.map((fetch) => (
                <div key={fetch._id}>
                  <RetrievedUserCard fetch={fetch} />
                </div>
              ))}
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
