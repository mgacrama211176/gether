import React, { useEffect, useState } from "react";
import ChatContainer from "../components/ChatContainer";
import { useCookies } from "react-cookie";
import UpdateUser from "../components/UpdateUser";
import axios from "axios";
import UserMatchTable from "../components/UserMatchTable";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [genderedUsers, setGenderedUsers] = useState(null);
  // const [lastDirection, setLastDirection] = useState(
  //   "Swipe left to dislike, right for like"
  // );
  const [cookies] = useCookies(["user"]);
  const [possibleMatch, setPossibleMatch] = useState([]);
  // Update info useState and functions Below
  const [update, setUpdate] = useState(false);

  const userId = cookies.UserId;

  const matchedUserIds = user?.matches
    .map(({ user_id }) => user_id)
    .concat(userId);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get("http://localhost:8000/user", {
          params: { userId },
        });
        // console.log(response.data);
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const getGenderedUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/gendered-users",
          {
            params: { gender: user?.gender_interest },
          }
        );
        // console.log(response.data);
        setGenderedUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const filteredGenderedUsers = () => {
      const filtered = genderedUsers?.filter(
        (genderedUser) => !matchedUserIds?.includes(genderedUser.user_id)
      );
      console.log(filtered);
      setPossibleMatch(filtered);
    };

    getUser();
    getGenderedUsers();
    filteredGenderedUsers();
  }, []);

  // useEffect(() => {

  //   filteredGenderedUsers();
  //   getUser();
  // }, []);

  // useEffect(() => {
  //   if (user) {
  //     getGenderedUsers();
  //     console.log(user);
  //   }
  // }, [user]);

  // Add match
  // const updateMatches = async (matchedUserId) => {
  //   try {
  //     await axios.put("http://localhost:8000/addmatch", {
  //       userId,
  //       matchedUserId,
  //     });
  //     getUser();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const swiped = (direction, swipedUserId) => {
  //   if (direction === "right") {
  //     updateMatches(swipedUserId);
  //   }
  //   setLastDirection(direction);
  // };

  // const outOfFrame = (name) => {
  //   console.log(name + " left the screen!");
  // };

  return (
    <>
      {user && (
        <div className="dashboard">
          <ChatContainer user={user} update={update} setUpdate={setUpdate} />

          <div className="swipe-container">
            {update === false ? (
              <>
                <UserMatchTable possibleMatch={possibleMatch} />
                {/* <div className="card-container">
                  {filteredGenderedUsers?.map((genderedUser) => (
                    <TinderCard
                      className="swipe"
                      key={genderedUser.user_id}
                      onSwipe={(dir) => swiped(dir, genderedUser.user_id)}
                      onCardLeftScreen={() =>
                        outOfFrame(genderedUser.first_name)
                      }
                    >
                      <div
                        style={{
                          backgroundImage: "url(" + genderedUser.url + ")",
                        }}
                        className="card"
                      >
                        <h3>{genderedUser.first_name}</h3>
                        <h3>Gaming Categories: {genderedUser.genre}</h3>
                      </div>
                    </TinderCard>
                  ))}
                  <div className="swipe-info">
                    {lastDirection ===
                    "Swipe left to dislike, right for like" ? (
                      <p>{lastDirection} </p>
                    ) : (
                      <p>You swiped {lastDirection} </p>
                    )}
                  </div>
                </div> */}
              </>
            ) : (
              <>
                <UpdateUser user={user} userId={userId} setUpdate={setUpdate} />
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default Dashboard;
