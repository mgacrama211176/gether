import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import OnBoarding from "./pages/OnBoarding";
import AdminRoute from "./pages/Admin";
import Verify from "./pages/Verify";
import Verified from "./pages/Verified";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useCookies } from "react-cookie";

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const authToken = cookies.UserId;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {authToken && <Route path="/dashboard" element={<Dashboard />} />}
        {authToken && <Route path="/onboarding" element={<OnBoarding />} />}
        {authToken && <Route path="/admin" element={<AdminRoute />} />}
        <Route path="/verify" element={<Verify />} />
        <Route path="/verified/:token" element={<Verified />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
