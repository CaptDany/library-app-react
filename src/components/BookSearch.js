import React, { useState } from 'react';
import { searchBooks } from '../controller/api';

const BookSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const data = await searchBooks(searchTerm);
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching books:', error);
      setSearchResults([]);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter search term"
      />
      <button onClick={handleSearch}>Search</button>

      <div>
        <h2>Search Results</h2>
        <ul>
          {searchResults.map((book) => (
            <li key={book.id}>
              {book.title} by {book.author} - {book.editor}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BookSearch;
