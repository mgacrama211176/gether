import React, { useEffect, useState } from "react";
import ChatContainer from "../components/ChatContainer";
import { useCookies } from "react-cookie";
import UpdateUser from "../components/UpdateUser";
import axios from "axios";
import UserMatchTable from "../components/UserMatchTable";
import { ToastContainer } from "react-toastify";

//NOTIFICATION
import Modal from "../components/notification/Modal";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [genderedUsers, setGenderedUsers] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [possibleMatch, setPossibleMatch] = useState([]);

  // Update info useState and functions Below
  const [update, setUpdate] = useState(false);
  const [matched, setMatched] = useState();
  const [status, setStatus] = useState("");
  const [filtered, setFiltered] = useState([]);

  //For the sorting UseStates
  const options = ["All", "rts", "fps", "rpg", "moba"];
  const [value, setValue] = useState("All");
  const [inputValue, setInputValue] = useState("");

  const userId = cookies.UserId;

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
      setFiltered(response.data);
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

  ///----------------------------------------------------------------------------------------

  // const matchedUserIds = user?.matches
  //   .map(({ user_id }) => user_id)
  //   .concat(userId);

  useEffect(() => {
    const matchedUserIds = user?.matches
      .map(({ user_id }) => user_id)
      .concat(userId);

    const filteredGenderedUsers = () =>
      genderedUsers?.filter(
        (genderedUser) => !matchedUserIds.includes(genderedUser.user_id)
      );
    filteredGenderedUsers();
    setFiltered(filteredGenderedUsers);

    if (value !== null) {
      const filteredData = genderedUsers?.filter(
        (item) => item.genre === value
      );

      console.log(filteredData);
      setFiltered(filteredData);
    }

    if (value === "All") {
      getGenderedUsers();
    }
  }, [matched, user, update, value]);

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
                  value={value}
                  setValue={setValue}
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                  options={options}
                />
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
