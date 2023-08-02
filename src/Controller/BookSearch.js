import React, { useState } from "react";
import { searchBooks } from "../model/api.js";

const BookSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const data = await searchBooks(searchTerm);
      setSearchResults(data);
    } catch (error) {
      console.error("Error searching books:", error);
      setSearchResults([]);
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
        />
        <button onClick={handleSearch}>Search</button>

        {searchResults.length > 0 ? (
          <div className="content-holder">
            <h3>Search Results:</h3>
            <ul>
              {searchResults.map((book) => (
                <li key={book.id}>
                  {book.book_title} by {book.author} - {book.date_published},{" "}
                  {book.publisher}. The book is{" "}
                  <b>{book.isReserved ? "currently" : "not"}</b> reserved.
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default BookSearch;
