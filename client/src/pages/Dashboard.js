import React, { useEffect, useState } from "react";
import ChatContainer from "../components/ChatContainer";
import { useCookies } from "react-cookie";
import UpdateUser from "../components/UpdateUser";
import axios from "axios";
import UserMatchTable from "../components/UserMatchTable";
import TinderCard from "react-tinder-card";
import { ToastContainer } from "react-toastify";

//NOTIFICATION
import Modal from "../components/notification/Modal";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [genderedUsers, setGenderedUsers] = useState(null);
  // const [lastDirection, setLastDirection] = useState(
  //   "Swipe left to dislike, right for like"
  // );
  const [lastDirection, setLastDirection] = useState();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const [possibleMatch, setPossibleMatch] = useState([]);
  // Update info useState and functions Below
  const [update, setUpdate] = useState(false);
  const [matched, setMatched] = useState();
  const [status, setStatus] = useState("");
  const [filtered, setFiltered] = useState([]);

  const userId = cookies.UserId;

  // console.log(user);

  const getUser = async () => {
    try {
      const response = await axios.get(
        "https://getherbackend.onrender.com/user",
        {
          params: { userId },
        }
      );
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getGenderedUsers = async () => {
    try {
      const response = await axios.get(
        "https://getherbackend.onrender.com/gendered-users",
        {
          params: { gender: user?.gender_interest },
        }
      );
      setGenderedUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (user) {
      getGenderedUsers();
    }
  }, [user, status]);

  // const swiped = (direction, swipedUserId) => {
  //   if (direction === "right") {
  //     updateMatches(swipedUserId);
  //   }
  //   setLastDirection(direction);
  // };

  // const outOfFrame = (name) => {
  //   console.log(name + " left the screen!");
  // };

  ///----------------------------------------------------------------------------------------

  const matchedUserIds = user?.matches
    .map(({ user_id }) => user_id)
    .concat(userId);

  useEffect(() => {
    const filteredGenderedUsers = () =>
      genderedUsers?.filter(
        (genderedUser) => !matchedUserIds.includes(genderedUser.user_id)
      );
    filteredGenderedUsers();
    setFiltered(filteredGenderedUsers);
  }, [matched, user, update]);

  // console.log("filteredGenderedUsers ", filteredGenderedUsers);

  return (
    <>
      <ToastContainer />

      <Modal user={user} />

      {user && (
        <div className="dashboard">
          <ChatContainer user={user} update={update} setUpdate={setUpdate} />

          <div className="swipe-container">
            {update !== false ? (
              <>
                <UserMatchTable
                  possibleMatch={possibleMatch}
                  filtered={filtered}
                  user={user}
                  matched={matched}
                  setMatched={setMatched}
                  status={status}
                  setStatus={setStatus}
                />
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
                      </div>
                    </TinderCard>
                  ))}
                  <div className="swipe-info">
                    {lastDirection ? <p>You swiped {lastDirection}</p> : <p />}
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
