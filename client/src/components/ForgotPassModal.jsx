import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import CircularProgress from "@mui/material/CircularProgress";

const AuthModal = ({ setForgotPassword }) => {
  const [email, setEmail] = useState(null);
  const [forgotModal, setForgotModal] = useState(false);
  const [error, setError] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState("");

  let navigate = useNavigate();

  const handleClick = () => {
    console.log(forgotModal);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const passwordResetFunction = await axios.put(
      "https://getherbackend.onrender.com/validation/forgotPass",
      { email }
    );

    setLoading(false);
    setNotification(passwordResetFunction.data);
  };

  return (
    <div>
      {/* showing the forgot password modal */}
      <div>
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="email"
            required={true}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input className="secondary-button" type="submit" />
          <p>{error}</p>
        </form>
        {loading ? (
          <>
            <p>Retrieving Game files.....</p>
          </>
        ) : (
          <>{notification}</>
        )}
        <p onClick={() => setForgotPassword(false)}>Login</p>
        <hr />
        <h2>GET THE APP</h2>
      </div>
    </div>
  );
};
export default AuthModal;
