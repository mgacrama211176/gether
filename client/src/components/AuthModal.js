import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import CircularProgress from "@mui/material/CircularProgress";
import ForgotPassModal from "./ForgotPassModal";

const AuthModal = ({ setShowModal, isSignUp }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [loading, setLoading] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [dataHolder, setDataHolder] = useState("");
  let navigate = useNavigate();

  const handleClick = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log(isSignUp);

    if (isSignUp === true) {
      if (password === confirmPassword) {
        const register = await axios.post(`http://localhost:8000/signup`, {
          email,
          password,
        });

        navigate("/verify");
      } else {
        setError("Password not match");
      }
    } else {
      // if isSignup is false or user trying to login.

      try {
        const login = await axios.post(`http://localhost:8000/login`, {
          email,
          password,
        });

        // if it's an admin
        if (login.data.user.access === "admin" ||login.data.user.access === "Sadmin" ) {
          navigate("/admin");
          setCookie("AuthToken", login.data.token, { path: "/" });
          setCookie("UserId", login.data.userId, { path: "/" });
        }
        // if this is a regular user and not an admin
        else {
          if (login.data.user.validated === false) {
            navigate("/verify");
          } else {
            navigate("/dashboard");
            setCookie("AuthToken", login.data.token, { path: "/" });
            setCookie("UserId", login.data.userId, { path: "/" });
          }
        }
        setLoading(false);
        window.location.reload();
      } catch (err) {
        console.log(err);
        setError("Incorrect Password or Email");
        setLoading(false);
      }
    }
  };

  return (
    <div className="auth-modal">
      {forgotPassword ? (
        <>
          <div>
            <ForgotPassModal setForgotPassword={setForgotPassword} />
          </div>
        </>
      ) : (
        <div>
          <div className="close-icon" onClick={handleClick}>
            ⓧ
          </div>
          <h2>{isSignUp ? "CREATE ACCOUNT" : "LOG IN"}</h2>
          <p>
            By clicking Log In, you agree to our terms. Learn how we process
            your data in our Privacy Policy and Cookie Policy.
          </p>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="email"
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="password"
              required={true}
              onChange={(e) => setPassword(e.target.value)}
            />
            {isSignUp && (
              <input
                type="password"
                id="password-check"
                name="password-check"
                placeholder="confirm password"
                required={true}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            )}
            <input className="secondary-button" type="submit" />
            <p>{error}</p>
          </form>
          {loading && isSignUp ? (
            <>
              <CircularProgress />
              <p>Creating Game files.....</p>
            </>
          ) : isSignUp === false && loading ? (
            <>
              <CircularProgress />
              <p>Retrieving Game files.....</p>
            </>
          ) : (
            <></>
          )}

          <p onClick={() => setForgotPassword(true)}>Forgot Password</p>
          <hr />
          <h2>GET THE APP</h2>
        </div>
      )}
    </div>
  );
};
export default AuthModal;
