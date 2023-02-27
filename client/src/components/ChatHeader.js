import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ChatHeader = ({ user, setUpdate, update }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const nav = useNavigate();

  const logout = () => {
    removeCookie("UserId", cookies.UserId);
    removeCookie("AuthToken", cookies.AuthToken);
    nav("/");
  };

  return (
    <div className="chat-container-header">
      <div className="profile">
        <div className="img-container">
          <img src={user.url} alt={"photo of " + user.first_name} />
        </div>
        <div>
          <h3>{user.first_name}</h3>
          <h5
            onClick={() => {
              update === false ? setUpdate(true) : setUpdate(false);
            }}
          >
            {update === false ? "User Profile" : "Dashboard"}
          </h5>
        </div>
      </div>
      <button className="primary-button logoutPlacement" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default ChatHeader;
