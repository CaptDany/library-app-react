import React, { useState } from "react";
import { validateBorrowing, validateReturning } from "../model/api.js";

const BookValidation = () => {
  const [bookId, setBookId] = useState("");
  const [userId, setUserId] = useState("");
  const [validationStatus, setValidationStatus] = useState("");

  const handleBorrowValidation = async () => {
    try {
      const data = await validateBorrowing(bookId, userId);
      if (data) {
        setValidationStatus("Book is eligible for borrowing.");
      } else {
        setValidationStatus("Book is not eligible for borrowing.");
      }
    } catch (error) {
      console.error("Error validating book borrowing:", error);
      setValidationStatus("Validation failed.");
    }
  };

  const handleReturnValidation = async () => {
    try {
      const data = await validateReturning(bookId, userId);
      if (data) {
        setValidationStatus("Book return is valid.");
      } else {
        setValidationStatus("Book return is not valid.");
      }
    } catch (error) {
      console.error("Error validating book return:", error);
      setValidationStatus("Validation failed.");
    }
  };

  return (
    <div>
      <h2>Book Validation</h2>
      <h3>Borrowing Validation:</h3>
      <input
        type="text"
        value={bookId}
        onChange={(e) => setBookId(e.target.value)}
        placeholder="Enter book ID"
      />
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="Enter user ID"
      />
      <button onClick={handleBorrowValidation}>Validate Borrowing</button>

      <h3>Returning Validation:</h3>
      <input
        type="text"
        value={bookId}
        onChange={(e) => setBookId(e.target.value)}
        placeholder="Enter book ID"
      />
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="Enter user ID"
      />
      <button onClick={handleReturnValidation}>Validate Returning</button>

      {validationStatus && <p>{validationStatus}</p>}
    </div>
  );
};

export default BookValidation;
