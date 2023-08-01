const API_BASE_URL = 'http://your-backend-api-url';

export const searchBooks = async (searchTerm) => {
  try {
    const response = await fetch(`${API_BASE_URL}/books/search?term=${searchTerm}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching books:', error);
    return [];
  }
};

export const reserveBook = async (bookId, userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/books/reserve`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ bookId, userId }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error reserving book:', error);
    return false;
  }
};
