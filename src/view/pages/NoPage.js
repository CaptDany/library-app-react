import React from "react";

const NotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          minHeight: "10vh",
        }}
      />
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <img
        src="https://cdn.dribbble.com/users/1000681/screenshots/3466109/cat.gif"
        alt="Cat GIF"
        style={{ maxWidth: "90%" }}
      />
    </div>
  );
};

export default NotFound;
