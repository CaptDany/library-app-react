import React from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import Home from "./view/pages/HomePage";
import AdminDash from "./view/pages/Dashboard";
import BookSearchPage from "./view/pages/BookSearchPage";
import BookReservationPage from "./view/pages/BookReservationPage";
import BookValidationPage from "./view/pages/BookValidationPage";
import UserManagementPage from "./view/pages/UserManagementPage";
import AddBookPage from "./view/pages/AddBookPage";
import LoginPage from "./view/pages/LoginPage";
import NoPage from "./view/pages/NoPage";
import TopBar from "./Controller/Topbar.js";
import Logout from "./Controller/Logout";

function App() {
  console.log(
    localStorage.getItem("currentUser"),
    localStorage.getItem("token")
  );
  var isLogged = false;
  var loggedInUser = localStorage.getItem("currentUser");

  if (localStorage.getItem("token")) {
    isLogged = true;
  }

  return (
    <>
      <TopBar isLogged={isLogged} loggedInUser={loggedInUser} />
      <Routes>
        {loggedInUser ? (
          <>
            <Route index element={<AdminDash />} />
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/home" element={<AdminDash />} />
          </>
        ) : (
          <>
            <Route index element={<Home />} />
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
          </>
        )}
        <Route path="/dashboard" element={<AdminDash />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/search" element={<BookSearchPage />} />
        <Route path="/reserve" element={<BookReservationPage />} />
        <Route path="/validate" element={<BookValidationPage />} />
        <Route path="/manage" element={<UserManagementPage />} />
        <Route path="/add-book" element={<AddBookPage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </>
  );
}

export default App;
