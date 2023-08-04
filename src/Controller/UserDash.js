import React from "react";
import { Link } from "react-router-dom";
import "../view/stylesheets/styles.css";

const UserDash = () => {
  return (
    <div className="home-container">
      <div
        style={{
          minHeight: "10vh",
        }}
      />
      <h1>Welcome to the Library App!</h1>
      <div className="dash-image-container">
        <img
          className="dash-image"
          src="https://img.freepik.com/free-vector/college-project-concept-illustration_114360-10511.jpg?w=1480&t=st=1691105696~exp=1691106296~hmac=771f68fb1939b3681f92f521d1f0a55f0b1a19a24298532907c3efd21fc074a6"
          alt="Tiny library"
        />
      </div>
      <p>
        This is a library viewing app where readers can search for books,
        reserve books, and manage their borrowings.
      </p>
      <h2>Get Started</h2>
      <p>Please select an option below:</p>
      <ul>
        <li>
          <Link to="/search">Search Books</Link>
        </li>
        <li>
          <Link to="/user/reserve">Reserve Book</Link>
        </li>
        <li>
          <Link to="/manage">Profile Settings</Link>
        </li>
      </ul>
    </div>
  );
};

export default UserDash;
