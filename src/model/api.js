const API_BASE_URL = "http://localhost:5000/library";
const token = localStorage.getItem("token");

export const searchBooks = async (searchTerm) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/books/search?term=${searchTerm}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error searching books:", error);
    return [];
  }
};

export const addNewBook = async (
  book_title,
  author,
  date_published,
  publisher
) => {
  try {
    const response = await fetch(`${API_BASE_URL}/books/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ book_title, author, date_published, publisher }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding book:", error);
    return { success: false };
  }
};

export const getUserBorrowedBooks = async (username) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/user/${username}/borrowed-books`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user's borrowed books and debt:", error);
    throw error;
  }
};

export const editBook = async (bookId, updatedData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/books/${bookId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the JWT token in the headers
      },
      body: JSON.stringify(updatedData), // Pass the updated book data object in the request body
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error editing book:", error);
    return false;
  }
};

export const reserveBook = async (bookId, uid) => {
  try {
    const response = await fetch(`${API_BASE_URL}/books/${bookId}/reserve`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bookId, uid }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error reserving book:", error);
    return false;
  }
};

export const validateBorrowing = async (bookId, userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/books/borrow`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bookId, userId }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.isValid; // Assuming the backend returns an object with { isValid: true/false }
  } catch (error) {
    console.error("Error validating book borrowing:", error);
    return false;
  }
};

export const validateReturning = async (bookId, userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/books/return`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bookId, userId }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.isValid; // Assuming the backend returns an object with { isValid: true/false }
  } catch (error) {
    console.error("Error validating book return:", error);
    return false;
  }
};

export const addUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData), // Pass the entire user data object in the request body
    });

    fetch(`${API_BASE_URL}/debts/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding user:", error);
    return false;
  }
};

export const checkUser = async (email, phone) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${email}/${phone}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user's borrowed books and debt:", error);
    throw error;
  }
};

export const updateUser = async (userId, updatedData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ updatedData }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data; // Assuming the backend returns an object with { success: true/false }
  } catch (error) {
    console.error("Error updating user:", error);
    return false;
  }
};

export const login = async (username, pass) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, pass }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error logging in:", error);
    return { success: false };
  }
};
