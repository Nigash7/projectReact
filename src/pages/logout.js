import React from 'react'

function logout() {
    localStorage.removeItem("loggedInUser"); // remove login info
  navigate("/login");
  return (
    <div>
      
    </div>
  )
}

export default logout
