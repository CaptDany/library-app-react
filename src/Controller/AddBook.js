import React, { useState } from "react";
import { addNewBook } from "../model/api";

const AddBookForm = () => {
  const [book_title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [date_published, setDatePublished] = useState("");
  const [publisher, setPublisher] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addNewBook(
        book_title,
        author,
        date_published,
        publisher
      );
      if (response.success) {
        setMessage("Book added successfully!");
        setTitle("");
        setAuthor("");
        setDatePublished("");
        setPublisher("");
      } else {
        setMessage("Failed to add the book. Please try again later.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={book_title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <br />
        <label>
          Author:
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </label>
        <br />
        <label>
          Date Published:
          <input
            type="text"
            value={date_published}
            onChange={(e) => setDatePublished(e.target.value)}
          />
        </label>
        <br />
        <label>
          Publisher:
          <input
            type="text"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBookForm;
