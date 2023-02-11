import React, { useState, useEffect } from "react";
import { Avatar, AvatarGroup, CircularProgress } from "@mui/material";
import axios from "axios";

const MatchedUsers = ({ user, selected, setSelected, value, viewUser }) => {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [matchContainer, setMatchContainer] = useState(user.user_id);
  // const matches = user.user_id;

  useEffect(() => {
    const genreViewer = () => {
      if (selected === "") {
        setMatchContainer(user.user_id);
      } else {
        setMatchContainer(selected);
      }
    };
    genreViewer();
    retrieveMatchesByUserId();
  }, [selected, value]);

  const retrieveMatchesByUserId = async () => {
    setLoading(true);
    const users = await axios.get(
      `http://localhost:8000/usersInfo/genre/${value}/${matchContainer}`
    );
    setUsersData(users.data);
    setLoading(false);
  };

  useEffect(() => {
    retrieveMatchesByUserId();
  }, [value]);

  return (
    <div>
      {loading ? (
        <>
          <CircularProgress sx={{ position: "relative", float: "right" }} />
        </>
      ) : (
        <AvatarGroup direction="row" spacing={2} max={10}>
          {usersData.map((user) => (
            <Avatar
              key={user._id}
              alt={user.first_name}
              src={user.url}
              onClick={() => {
                setSelected(user.user_id);
              }}
              sx={{ cursor: "pointer" }}
            />
          ))}
        </AvatarGroup>
      )}
    </div>
  );
};

export default MatchedUsers;
