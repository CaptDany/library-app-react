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
          src="https://img.freepik.com/free-vector/library-concept-illustration_114360-2693.jpg?w=1380&t=st=1690997277~exp=1690997877~hmac=c7065d088af504b3182c7e364f2fb49f92f432307141dfb491dd56c4b356057e"
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
