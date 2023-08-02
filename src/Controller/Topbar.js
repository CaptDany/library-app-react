import React, { useState } from "react";
import Register from "./Register";
import "../view/stylesheets/TopBar.css";

const TopBar = ({ isLogged, loggedInUser }) => {
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);

  const openRegisterPopup = () => {
    setShowRegisterPopup(true);
  };

  const closeRegisterPopup = () => {
    setShowRegisterPopup(false);
  };

  return (
    <div className="top-bar">
      <div className="top-bar-content">
        <h2>The Library</h2>
        {isLogged ? (
          <p>Welcome, {loggedInUser.username}!</p>
        ) : (
          <button onClick={openRegisterPopup}>Register</button>
        )}
      </div>
      {showRegisterPopup && <Register onClose={closeRegisterPopup} />}
    </div>
  );
};

export default TopBar;
