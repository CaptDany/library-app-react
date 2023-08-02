import React, { useState } from "react";
import Register from "./Register";
import { Link } from "react-router-dom";
import "../view/stylesheets/home.css";

const Home = () => {
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);

  const openRegisterPopup = () => {
    setShowRegisterPopup(true);
  };

  const closeRegisterPopup = () => {
    setShowRegisterPopup(false);
  };

  return (
    <div className="bigboicontainer">
      <div className="pipi" />
      <div className="container">
        <h1>Welcome to The Library!</h1>
        <div className="button-wrapper">
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link>
            <button onClick={openRegisterPopup}>Register</button>
          </Link>
        </div>
        <div className="intro-wrapper">
          <p>
            This app allows readers to search for books, reserve books, and
            manage their borrowings. The staff can validate book borrowings and
            returns and manage users. Get started by logging in or registering
            below!
          </p>
        </div>
      </div>
      {showRegisterPopup && <Register onClose={closeRegisterPopup} />}
    </div>
  );
};

export default Home;
