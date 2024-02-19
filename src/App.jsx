import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import "./styles/app.scss";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { Context, baseURL } from "./main";
import { useContext, useEffect } from "react";

function App() {
  const { setUserData, setIsAuthenticated, setLoading } = useContext(Context);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${baseURL}/users/me`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success) {
          setUserData(res.data.user);
          setIsAuthenticated(true);
        } else {
          setUserData({});
          setIsAuthenticated(false);
        }
        setLoading(false);
      })
      .catch((error) => {
        setUserData({});
        setIsAuthenticated(false);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Toaster />
      </Router>
    </>
  );
}

export default App;
