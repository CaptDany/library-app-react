import React from "react";
import "../stylesheets/styles.css";
import UserBorrowedBooks from "../../Controller/UserBorrowedBooks";

const BookReservationPage = () => {
  return (
    <div>
      <UserBorrowedBooks />
    </div>
  );
};

export default BookReservationPage;
