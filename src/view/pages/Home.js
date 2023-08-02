import React, { useState } from "react";
import { Link } from "react-router-dom";
import Register from "../../Controller/Register";
import "../stylesheets/styles.css";

const Home = () => {
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);

  const openRegisterPopup = () => {
    setShowRegisterPopup(true);
  };

  const closeRegisterPopup = () => {
    setShowRegisterPopup(false);
  };

  return (
    <div className="home-container">
      <h1>Welcome to the Library App!</h1>
      <p>
        This is a library management app where readers can search for books,
        reserve books, and manage their borrowings. The staff can validate book
        borrowings and returns and manage users.
      </p>
      <h2>Get Started</h2>
      <p>Please select an option below:</p>
      <ul>
        <li>
          <Link to="/search">Search Books</Link>
        </li>
        <li>
          <Link to="/add-book">Add a Book</Link>
        </li>
        <li>
          <Link to="/reserve">Reserve Book</Link>
        </li>
        <li>
          <Link to="/validate">Book Validation</Link>
        </li>
        <li>
          <Link to="/manage">User Management</Link>
        </li>
      </ul>
      <button onClick={openRegisterPopup}>Register</button>
      {showRegisterPopup && <Register onClose={closeRegisterPopup} />}
    </div>
  );
};

export default Home;
