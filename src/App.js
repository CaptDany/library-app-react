import React, { useState, useEffect } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import AddBookPage from "./view/pages/AddBookPage";
import AdminDash from "./view/pages/AdminDashboard";
import BookSearchPage from "./view/pages/BookSearchPage";
import BookValidationPage from "./view/pages/BookValidationPage";
import Home from "./view/pages/HomePage";
import LoginPage from "./view/pages/LoginPage";
import NoPage from "./view/pages/NoPage";
import ReservationManagementPage from "./view/pages/ReservationManagementPage";
import TopBar from "./Controller/Topbar.js";
import UserDash from "./view/pages/UserDashboard";
import UserManagementPage from "./view/pages/UserManagementPage";
import Logout from "./Controller/Logout";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if user is logged in and set the state accordingly
    const token = localStorage.getItem("token");
    const currentUser = localStorage.getItem("currentUser");
    const adminUser = localStorage.getItem("adminUser");

    if (token && currentUser) {
      setIsLogged(true);
      setLoggedInUser(currentUser);
      setIsAdmin(adminUser === "true");
    } else {
      setIsLogged(false);
      setLoggedInUser("");
      setIsAdmin(false);
    }
  }, []);

  return (
    <>
      <TopBar
        isLogged={isLogged}
        loggedInUser={loggedInUser}
        isAdmin={isAdmin}
      />
      <Routes>
        {isLogged ? (
          isAdmin ? (
            <>
              <Route index element={<AdminDash />} />
              <Route path="/home" element={<AdminDash />} />
              <Route path="/dashboard" element={<AdminDash />} />
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/search" element={<BookSearchPage />} />
              <Route path="/reserve" element={<ReservationManagementPage />} />
              <Route path="/validate" element={<BookValidationPage />} />
              <Route path="/manage" element={<UserManagementPage />} />
              <Route path="/add-book" element={<AddBookPage />} />
              <Route path="*" element={<NoPage />} />
            </>
          ) : (
            <>
              <Route path="/dashboard" element={<UserDash />} />
              <Route index element={<UserDash />} />
              <Route path="/home" element={<UserDash />} />
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/search" element={<BookSearchPage />} />
              <Route path="/reserve" element={<ReservationManagementPage />} />
              <Route path="*" element={<NoPage />} />
            </>
          )
        ) : (
          <>
            <Route index element={<Home />} />
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<NoPage />} />
          </>
        )}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </>
  );
}

export default App;
