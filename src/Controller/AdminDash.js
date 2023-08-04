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
          src="https://img.freepik.com/free-vector/reading-book-concept-illustration_114360-8612.jpg?w=1480&t=st=1691105798~exp=1691106398~hmac=31e7d8f2801dd443ec7637191355f00e2d0e00cc4108e1c2c7e49da138561c7c"
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
          <Link to="/reserve">Manage Reservations</Link>
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
