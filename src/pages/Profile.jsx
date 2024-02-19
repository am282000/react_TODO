import React, { useContext } from "react";
import { Context } from "../main";
import Loader from "../components/Loader";
import { Navigate } from "react-router-dom";

const Profile = () => {
  const { isAuthenticated, loading, userData } = useContext(Context);

  if (!isAuthenticated) return <Navigate to={"/login"} />;
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="todosContainer">
          <h1>My Profile</h1>
          <h3>{userData.name}</h3>
          <p>{userData.email}</p>
        </div>
      )}
    </>
  );
};

export default Profile;
