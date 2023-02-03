import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const AuthModal = ({ setShowModal, isSignUp }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(null);

  let navigate = useNavigate();

  const handleClick = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isSignUp && password !== confirmPassword) {
        setError("Passwords need to match!");
        return;
      }

      try {
        const response = await axios.post(
          `http://localhost:8000/${isSignUp ? "signup" : "login"}`,
          { email, password }
        );

        setCookie("AuthToken", response.data.token, { path: "/" });
        setCookie("UserId", response.data.userId, { path: "/" });

        const data = response.data.user;

        // at this point the account has already been created since it has passed the initial required AuthModal

        if (data.access === "admin") {
          navigate("/admin");
        } else if (data.validated === false || isSignUp === true) {
          // setError("Account has been Created. Please check email to validate.");
          navigate("/dashboard");
        } else {
        }

        // if (success && isSignUp) {
        //   navigate("/dashboard");
        //   // navigate("/onboarding");
        // } else {
        //   // navigate("/dashboard");
        // }

        window.location.reload();
      } catch (err) {
        setError(`Please Check email or Password!`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="auth-modal">
      <div className="close-icon" onClick={handleClick}>
        ⓧ
      </div>

      <h2>{isSignUp ? "CREATE ACCOUNT" : "LOG IN"}</h2>
      <p>
        By clicking Log In, you agree to our terms. Learn how we process your
        data in our Privacy Policy and Cookie Policy.
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

      <hr />
      <h2>GET THE APP</h2>
    </div>
  );
};
export default AuthModal;
