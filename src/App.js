import React from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import Home from "./view/pages/Home";
import BookSearchPage from "./view/pages/BookSearchPage";
import BookReservationPage from "./view/pages/BookReservationPage";
import BookValidationPage from "./view/pages/BookValidationPage";
import UserManagementPage from "./view/pages/UserManagementPage";
import AddBookPage from "./view/pages/AddBookPage";
import NoPage from "./view/pages/NoPage";
import TopBar from "./Controller/Topbar.js";

function App() {
  const isLogged = false;

  const loggedInUser = {
    username: "Dany", // Replace with the actual username
  };

  return (
    <>
      <TopBar isLogged={isLogged} loggedInUser={loggedInUser} />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<BookSearchPage />} />
        <Route path="/reserve" element={<BookReservationPage />} />
        <Route path="/validate" element={<BookValidationPage />} />
        <Route path="/manage" element={<UserManagementPage />} />
        <Route path="/add-book" element={<AddBookPage />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </>
  );
}

export default App;
