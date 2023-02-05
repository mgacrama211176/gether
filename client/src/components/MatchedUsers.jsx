import React, { useState, useEffect } from "react";
import { Avatar, Stack, AvatarGroup } from "@mui/material";
import axios from "axios";

const MatchedUsers = ({ user, selected, setSelected }) => {
  const [usersData, setUsersData] = useState([]);

  const matches = user.user_id;

  const data = async () => {
    const users = await axios.get(
      `http://localhost:8000/usersInfo/allUsers/${matches}`
    );
    setUsersData(users.data);
  };

  useEffect(() => {
    data();
  }, []);

  console.log(selected);

  return (
    <div>
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
    </div>
  );
};

export default MatchedUsers;
