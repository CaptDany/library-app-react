import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Library App!</h1>
      <p>
        This is a library management app where readers can search for books, reserve books, and
        manage their borrowings. The staff can validate book borrowings and returns and manage users.
      </p>
      <h2>Get Started</h2>
      <p>Please select an option below:</p>
      <ul>
        <li>
          <Link to="/search">Search Books</Link>
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

export default Home;
