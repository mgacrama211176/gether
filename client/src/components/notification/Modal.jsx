import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  Badge,
  CircularProgress,
} from "@mui/material";
import { tryAgain } from "../Toasts";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

import axios from "axios";

const style = {
  position: "absolute",
  top: "20%",
  left: "80%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ user }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //Handling of the functions starts from here......

  const [notifications, setNotifications] = useState([]);
  const [acceptedId, setAcceptedId] = useState("");
  const [loader, setLoader] = useState(false);

  const userId = user?.user_id;
  const matchedUserId = acceptedId;
  const selectedId = user?.user_id;

  const fetchingNotif = async () => {
    const data = await axios.get(
      `https://getherbackend.onrender.com/notification/getNotif/${selectedId}`
    );
    setNotifications(data.data);
  };

  const AcceptMatch = async () => {
    setLoader(true);

    //accept match function with backend
    if (acceptedId === "") {
      console.log(`try again!`);
      tryAgain();
      setLoader(false);
    } else {
      const match = await axios.put(
        "https://getherbackend.onrender.com/addmatch",
        {
          userId,
          matchedUserId,
        }
      );

      const updateNotif = await axios.put(
        `https://getherbackend.onrender.com/notification/updateNotif/${selectedId}`
      );

      console.log(updateNotif);
      console.log(match);
      setLoader(false);
      window.location.reload();
    }
  };

  useEffect(() => {
    fetchingNotif();
  }, [user]);

  return (
    <div>
      <Badge
        badgeContent={notifications.length}
        color="primary"
        sx={{
          position: "absolute",
          top: "30px",
          right: "40px",
          color: "white",
          fontSize: 100,
        }}
      >
        <NotificationsActiveIcon
          color="white"
          sx={{ fontSize: 40, cursor: "pointer" }}
          onClick={handleOpen}
        />
      </Badge>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {notifications.length === 0 ? (
            <>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                No nofications available!
              </Typography>
            </>
          ) : (
            <>
              <Box>
                {notifications.map((notification) => (
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 2,
                      }}
                    >
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        key={notification._id}
                      >
                        This {notification.first_name} is requesting for a pair
                      </Typography>

                      {loader ? (
                        <CircularProgress />
                      ) : (
                        <>
                          <Button
                            variant="outlined"
                            onClick={() => {
                              AcceptMatch();
                              setAcceptedId(notification.userId);
                            }}
                          >
                            Accept
                          </Button>
                        </>
                      )}
                    </Box>

                    <hr />
                  </>
                ))}
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}
