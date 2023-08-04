import React, { useState } from "react";
import Register from "./Register";
import { Link } from "react-router-dom";
import "../view/stylesheets/TopBar.css";

const TopBar = ({ isLogged, loggedInUser }) => {
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);
  const [showDropdownMenu, setShowDropdownMenu] = useState(false);

  const openRegisterPopup = () => {
    setShowRegisterPopup(true);
  };

  const closeRegisterPopup = () => {
    setShowRegisterPopup(false);
  };

  const toggleDropdownMenu = () => {
    setShowDropdownMenu((prevState) => !prevState);
  };

  return (
    <>
      <div className="top-bar">
        <div className="top-bar-content">
          {isLogged ? (
            <Link to="/dashboard" className="logo">
              <h2>The Library</h2>
            </Link>
          ) : (
            <Link to="/home" className="logo">
              <h2>The Library</h2>
            </Link>
          )}
          {isLogged ? (
            <div className="username-container">
              <p className="username" onMouseDown={toggleDropdownMenu}>
                Welcome, {loggedInUser}!
              </p>
              {showDropdownMenu && (
                <div className="dropdown-menu">
                  {/* Add dropdown menu items here */}
                  <Link onClick={toggleDropdownMenu} to="/profile">
                    Profile
                  </Link>
                  <Link onClick={toggleDropdownMenu} to="/logout">
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <button onClick={openRegisterPopup}>Register</button>
          )}
        </div>
        {showRegisterPopup && <Register onClose={closeRegisterPopup} />}
      </div>
      <div></div>
    </>
  );
};

export default TopBar;
