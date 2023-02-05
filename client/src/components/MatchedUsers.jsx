import React, { useState, useEffect } from "react";
import { Avatar, Stack, AvatarGroup, CircularProgress } from "@mui/material";
import axios from "axios";

const MatchedUsers = ({ user, selected, setSelected, value }) => {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const matches = user.user_id;

  const retrieveMatchesByUserId = async () => {
    setLoading(true);
    const users = await axios.get(
      // `http://localhost:8000/usersInfo/allUsers/${matches}`
      `http://localhost:8000/usersInfo/genre/${value}/${matches}`
    );
    console.log(users);
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
              onClick={() => setSelected(user.user_id)}
            />
          ))}
        </AvatarGroup>
      )}
    </div>
  );
};

export default MatchedUsers;
