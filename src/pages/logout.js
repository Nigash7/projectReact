import React from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate(); // ✅ use the hook

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser"); // clear user data
    navigate("/login"); // redirect to login page
  };

  return (
    <div className="container mt-4">
      <h2>Logout</h2>
      <button className="btn btn-danger" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Logout;
