import React from "react";
import { Link } from "react-router-dom";
import "../view/stylesheets/styles.css";

const AdminDash = () => {
  return (
    <div className="home-container">
      <div
        style={{
          minHeight: "10vh",
        }}
      />
      <h1>Welcome to the Administrator Library App!</h1>
      <div className="dash-image-container">
        <img
          className="dash-image"
          src="https://img.freepik.com/free-vector/library-concept-illustration_114360-2673.jpg?w=1380&t=st=1690995819~exp=1690996419~hmac=61da2f56ca330d55c853034d0335081df64a82e19f8d51cb2c97d00402131feb"
          alt="Tiny library"
        />
      </div>
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
    </div>
  );
};

export default AdminDash;
