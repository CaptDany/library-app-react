import React, { useState } from "react";
import { addUser } from "../model/api";
import { Link } from "react-router-dom";

const Register = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [birthyear, setBirthyear] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const name = {
        first: firstName,
        middle: middleName,
        last: lastName,
      };

      const data = {
        username,
        email,
        pass,
        birthyear,
        name,
        isAdmin,
      };

      const response = await addUser(data);
      console.log(response);
      if (response._id) {
        setMessage("User registered successfully!");
        onClose();
      } else {
        setMessage("Failed to register user. Please try again later.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="register-modal-overlay">
      <div className="register-modal-content">
        <h2 className="inner-page-titles">Register</h2>
        {message && <p>{message}</p>}
        <form onSubmit={handleRegister}>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>

          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label>
            Password:
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
          </label>

          <label>
            Birthyear:
            <input
              type="number"
              value={birthyear}
              onChange={(e) => setBirthyear(e.target.value)}
            />
          </label>

          <label>
            First Name:
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>

          <label>
            Middle Name:
            <input
              type="text"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
            />
          </label>

          <label>
            Last Name:
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>

          <label>
            Is Admin:
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
          </label>
          <div>
            <button type="submit">Register</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
          <div>
            <Link to="/login">
              <button type="button">Login</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
