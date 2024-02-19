import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context, baseURL } from "../main";
import axios from "axios";
import toast from "react-hot-toast";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context);
  
  const logoutHandler = async()=>{
    setLoading(true);
    try {
      const {data} = await axios.get(`${baseURL}/users/logout`,{
        withCredentials:true
      })
      toast.success(data.msg)
      console.log("isAuthenticated before",isAuthenticated);
      setIsAuthenticated(false)
      console.log("isAuthenticated after",isAuthenticated);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.msg)
      setIsAuthenticated(true)
      setLoading(false);
    }
  }

  return (
    <nav className="header">
      <div>
        <h2>TODO APP</h2>
      </div>
      <article>
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        {isAuthenticated ? (
          <button className="btn" disabled={loading} onClick={logoutHandler}>Logout</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </article>
    </nav>
  );
};

export default Header;
