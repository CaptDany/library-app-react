import React, { useState } from "react";
import { updateUser, checkUser } from "../model/api.js";

const ModifyProfile = () => {
  const [firstName, setFirstName] = useState(null);
  const [middleName, setMiddleName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [pass, setPass] = useState(null);
  const [birthyear, setBirthyear] = useState(null);
  const [phone, setPhone] = useState(null);
  const [address, setAddress] = useState(null);

  const handleUpdateProfile = async () => {
    try {
      const name = {
        first: firstName,
        middle: middleName,
        last: lastName,
      };

      const updatedData = {
        username,
        email,
        pass,
        birthyear,
        name,
        phone,
        address,
      };

      const check = await checkUser(email, phone);
      console.log(check);
      if (!check.success) {
        return console.log("User is already registered with phone or email");
      }

      const response = await updateUser(localStorage.getItem("currentUser"), updatedData);
      console.log(response);
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  return (
    <div className="content-holder">
            <div
        style={{
          minHeight: "10vh",
        }}
      />
      <h2>Modify Profile</h2>
      <div>
        <label>
          First Name:
          <input
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Middle Name:
          <input
            type="text"
            placeholder="Middle name"
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Last Name:
          <input
            type="text"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Username:
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            type="password"
            placeholder="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Birthyear:
          <input
            type="number"
            placeholder="Birthyear"
            value={birthyear}
            onChange={(e) => setBirthyear(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Phone:
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Address:
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
      </div>
      <button onClick={handleUpdateProfile}>Update Profile</button>
    </div>
  );
};

export default ModifyProfile;
