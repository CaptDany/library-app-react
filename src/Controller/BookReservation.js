import React, { useState } from "react";
import { reserveBook } from "../model/api.js";

const BookReservation = () => {
  const [bookId, setBookId] = useState("");
  const [userId, setUserId] = useState("");
  const [reservationStatus, setReservationStatus] = useState("");

  const handleReservation = async () => {
    try {
      const data = await reserveBook(bookId, userId);
      if (data) {
        setReservationStatus("Reservation successful!");
      } else {
        setReservationStatus("Reservation failed!");
      }
    } catch (error) {
      console.error("Error reserving book:", error);
      setReservationStatus("Reservation failed!");
    }
  };

  return (
    <div>
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
      <button onClick={handleReservation}>Reserve</button>

      <div>
        <h2>Reservation Status</h2>
        <p>{reservationStatus}</p>
      </div>
    </div>
  );
};

export default BookReservation;
