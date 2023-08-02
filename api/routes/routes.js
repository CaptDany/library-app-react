var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var User = require("../models/user");
var Book = require("../models/booksModel");

router.post("/books/", async function (req, res, next) {
  const book = new Book({
    book_title: req.body.book_title,
    author: req.body.author,
    date_published: req.body.date_published,
    publisher: req.body.publisher,
    isReserved: "false",
  });
  await book.save();
  res.send(book);
});

router.get("/books/", async function (req, res) {
  const books = await Book.find();
  res.send(books);
});

router.get("/books/search", async function (req, res) {
  const searchTerm = req.query.term;

  try {
    // Query the database for books that match the search term in title, author, or editor fields
    const searchResults = await Book.find({
      $or: [
        { book_title: { $regex: searchTerm, $options: "i" } }, // Case-insensitive search for title
        { author: { $regex: searchTerm, $options: "i" } }, // Case-insensitive search for author
        { date_published: { $regex: searchTerm, $options: "i" } },
        { publisher: { $regex: searchTerm, $options: "i" } },
      ],
    });

    // Return the search results as a JSON response
    res.json(searchResults);
  } catch (error) {
    console.error("Error searching books:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/books/:id", async function (req, res) {
  const book = await Book.findById(req.params.id);
  res.send(book);
});

router.put("/books/:id", async function (req, res) {
  try {
    const bookId = req.params.id;
    const updatedData = req.body;

    const updatedBook = await Book.findOneAndUpdate(
      { _id: bookId },
      updatedData,
      { new: true }
    );

    if (!updatedBook) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }

    // Return the updated book data as a JSON response
    res.json(updatedBook);
  } catch (error) {
    console.error("Error editing book:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.post("/books/:id/reserve", async function (req, res) {
  try {
    const bookId = req.params.id;
    if (!bookId) {
      return res
        .status(404)
        .json({ success: false, message: "Book id was not passed" });
    }
    const uid = req.body.uid;
    console.log(uid);

    const book = await Book.findById(bookId);

    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }

    // Check if the book is already reserved
    if (book.isReserved) {
      return res
        .status(400)
        .json({ success: false, message: "Book is already reserved" });
    }

    // Set the book as reserved
    book.isReserved = true;
    book.reservedBy = uid;
    await book.save();

    // Perform any additional reservation logic here (e.g., store the user's reservation details)

    // Return a success response
    res.json({ success: true, message: "Book reserved successfully" });
  } catch (error) {
    console.error("Error reserving book:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.delete("/books/:id", async function (req, res) {
  await Book.findOneAndDelete({ _id: req.params.id });
  res.send(true);
});

router.post("/users/", async function (req, res, next) {
  const hashedPassword = await bcrypt.hash(req.body.pass, 10);

  const user = new User({
    username: req.body.username,
    pass: hashedPassword,
    email: req.body.email,
    birthyear: req.body.birthyear,
    name: req.body.name,
    isAdmin: req.body.isAdmin,
  });
  await user.save();
  res.send(user);
});

router.get("/users/", async function (req, res) {
  const users = await User.find();
  res.send(users);
});

router.post("/login", async (req, res) => {
  try {
    const { username, pass } = req.body;
    console.log("Received login request for username:", username);

    const user = await User.findOne({
      $or: [{ username }, { email: username }],
    });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Validate the password
    const isMatch = await bcrypt.compare(pass, user.pass);
    console.log("Match confirmation from bcrypt:", isMatch);
    if (!isMatch) {
      res.status(401).json({ success: false, message: "Invalid credentials" });
      return console.log(res._contentLength);
    }

    // Generate a JWT token (optional)
    const token = jwt.sign({ userId: user._id }, "your-secret-key", {
      expiresIn: "1h", // Set the token expiration time (e.g., 1 hour)
    });

    // Return a success response with the token
    res.json({ success: true, token, user });
    console.log(res.success, res.token);
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ success: false, message: "An error occurred" });
  }
});

router.put("/users/", async function (req, res) {
  await User.findOneAndUpdate(
    {
      _id: req.body._id,
    },
    {
      username: req.body.username,
      pass: req.body.pass,
      email: req.body.email,
      birthyear: req.body.birthyear,
      name: req.body.name,
      isAdmin: req.body.isAdmin,
    }
  );
  res.send(true);
});

router.delete("/users/:id", async function (req, res) {
  await User.findOneAndDelete({ _id: req.params.id });
  res.send(true);
});

module.exports = router;
