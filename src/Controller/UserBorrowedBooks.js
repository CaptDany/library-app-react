import React, { useState, useEffect } from "react";
import { getUserBorrowedBooks } from "../model/api.js";

const UserBorrowedBooks = () => {
  const [userDebtInfo, setUserDebtInfo] = useState(null);
  const username = localStorage.getItem("currentUser");

  useEffect(() => {
    // Call the API to get the user's borrowed books and debt information
    const fetchUserBorrowedBooks = async () => {
      try {
        const response = await getUserBorrowedBooks(username);
        setUserDebtInfo(response);
      } catch (error) {
        console.error("Error fetching user's borrowed books and debt:", error);
      }
    };
    fetchUserBorrowedBooks();
  }, [username]);

  if (!userDebtInfo) {
    return (
      <div style={{ marginTop: "20vh", marginLeft: "20vw" }}>Loading...</div>
    );
  }

  const filteredBorrowedBooks = userDebtInfo.borrowedBooks.filter((book) => {
    return !/\bnot\b/i.test(book.title);
  });

  const allBooksHaveNotInTitle = userDebtInfo.borrowedBooks.every((book) => {
    return /\bnot\b/i.test(book.title);
  });

  if (allBooksHaveNotInTitle) {
    return (
      <div className="content-holder">
        <div style={{ marginTop: "20vh", marginLeft: "20vw" }}></div>
        <p>You have no books borrowed.</p>
        <p>Authorized to borrow: {userDebtInfo.authorized ? "Yes" : "No"}</p>
        <p>Total Debt: {userDebtInfo.totalDebt}</p>
      </div>
    );
  }

  return (
    <div className="content-holder">
      <div style={{ marginTop: "10vh", marginLeft: "20vw" }}></div>
      <h2>Your Borrowed Books</h2>
      <ul>
        {filteredBorrowedBooks.map((book) => (
          <li key={book.title}>
            <strong>Title:</strong> {book.title} <br />
            <strong>Borrowed Date:</strong> {book.borrowedDate} <br />
            <strong>Debt:</strong> {book.debt}
          </li>
        ))}
      </ul>
      <p>Authorized to borrow: {userDebtInfo.authorized ? "Yes" : "No"}</p>
      <p>Total Debt: {userDebtInfo.totalDebt}</p>
    </div>
  );
};

export default UserBorrowedBooks;
