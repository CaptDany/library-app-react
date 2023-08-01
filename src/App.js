import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import BookSearchPage from './pages/BookSearchPage';
import BookReservationPage from './pages/BookReservationPage';
import BookValidationPage from './pages/BookValidationPage';
import UserManagementPage from './pages/UserManagementPage';
import NoPage from './pages/NoPage';

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<BookSearchPage />} />
        <Route path="/reserve" element={<BookReservationPage />} />
        <Route path="/validate" element={<BookValidationPage />} />
        <Route path="/manage" element={<UserManagementPage />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </>
  )
}

export default App;