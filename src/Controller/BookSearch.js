import React, { useState } from "react";
import {
  searchBooks,
  reserveBook,
  editBook,
  getUserBorrowedBooks,
} from "../model/api.js";

const BookSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const uid = localStorage.getItem("currentUser");

  const handleSearch = async () => {
    try {
      const data = await searchBooks(searchTerm);
      setSearchResults(data);
    } catch (error) {
      console.error("Error searching books:", error);
      setSearchResults([]);
    }
  };

  const handleEditBook = async (bookNo, token) => {
    try {
      const book = await editBook(bookNo, token);
      console.log("Editing book:", book);
    } catch (error) {
      console.error("Error editing book:", error);
    }
  };

  const handleReserveBook = async (isReserved, lastReservedBy, bookId, uid) => {
    try {
      if (isReserved && uid !== lastReservedBy) {
        return <div>This book ain't yours</div>;
      }

      const userDebtInfo = await getUserBorrowedBooks(uid);
      console.log(userDebtInfo);
      if (!userDebtInfo.authorized) {
        return console.log("User is not authorized to borrow.");
      }
      const response = await reserveBook(bookId, uid);
      console.log(response);

      if (response.success) {
        const updatedSearchResults = searchResults.map((book) => {
          if (book._id === bookId) {
            return { ...book, isReserved: !book.isReserved };
          }
          return book;
        });
        setSearchResults(updatedSearchResults);
      } else {
        console.log("Failed to reserve book.");
      }
    } catch (error) {
      console.error("Error reserving book:", error);
    }
  };

  return (
    <div>
      <div
        style={{
          minHeight: "15vh",
        }}
      />
      <h2 className="inner-page-titles">Book Search</h2>
      <div className="content-holder">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter author, title, or editor"
          onSubmit={handleSearch}
        />
        <button onClick={handleSearch}>Search</button>

        {searchResults.length > 0 ? (
          <div className="content-holder">
            <h3>Search Results:</h3>
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Date Published</th>
                  <th>Publisher</th>
                  <th>Reserved</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((book) => (
                  <tr key={book._id}>
                    <td>{book.book_title}</td>
                    <td>{book.author}</td>
                    <td>{book.date_published}</td>
                    <td>{book.publisher}</td>
                    <td>{book.isReserved ? "Yes" : "No"}</td>
                    <td>
                      {localStorage.getItem("adminUser") === "true" && (
                        <button onClick={() => handleEditBook(book._id, uid)}>
                          Edit
                        </button>
                      )}
                      <button
                        onClick={() =>
                          handleReserveBook(
                            book.isReserved,
                            book.lastReservedBy,
                            book._id,
                            uid
                          )
                        }
                      >
                        {book.isReserved ? "Request return" : "Reserve"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default BookSearch;
