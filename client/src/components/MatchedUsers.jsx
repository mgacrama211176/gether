import React, { useState, useEffect } from "react";
import { Avatar, Stack, AvatarGroup, CircularProgress } from "@mui/material";
import axios from "axios";

const MatchedUsers = ({ user, selected, setSelected, value, viewUser }) => {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [matchContainer, setMatchContainer] = useState("");
  // const matches = user.user_id;

  const genreViewer = () => {
    if (selected !== "") {
      console.log(`selected is not empty`);
      setMatchContainer(viewUser);
      console.log(viewUser);
    } else {
      setMatchContainer(user);
    }
  };
  useEffect(() => {
    genreViewer();
    retrieveMatchesByUserId();
  }, [selected]);

  // console.log(`Matches of the selected users data: ${usersData}`);
  // console.log(matchContainer);

  // console.log(`Selected user: ${selected}`);
  // console.log(`This is the current User: ${user.first_name}`);
  console.log(`This is the View User: ${matchContainer.first_name}`);
  // console.log(
  //   `This is the MatchedContainerValue: ${matchContainer.first_name}`
  // );

  const retrieveMatchesByUserId = async () => {
    setLoading(true);
    const users = await axios.get(
      // `http://localhost:8000/usersInfo/allUsers/${matches}`
      `http://localhost:8000/usersInfo/genre/${value}/${matchContainer.user_id}`
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
              onClick={() => setSelected(user.user_id)}
              sx={{ cursor: "pointer" }}
            />
          ))}
        </AvatarGroup>
      )}
    </div>
  );
};

export default MatchedUsers;
