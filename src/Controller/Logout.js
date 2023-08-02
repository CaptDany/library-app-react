import React from "react";

const Logout = () => {
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("adminUser");
    localStorage.removeItem("token");
    window.location.href = "/home";
  };

  return (
    <div className="content-holder">
      <div
        style={{
          minHeight: "10vh",
        }}
      ></div>
      <h2>Logout</h2>
      <p>Are you sure you want to logout?</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
