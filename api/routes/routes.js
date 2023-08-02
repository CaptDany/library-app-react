var express = require("express");
var router = express.Router();
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

router.put("/books/", async function (req, res) {
  await Book.findOneAndUpdate(
    {
      _id: req.body._id,
    },
    {
      book_title: req.body.book_title,
      author: req.body.author,
      date_published: req.body.date_published,
      publisher: req.body.publisher,
    }
  );
  res.send(true);
});

router.delete("/books/:id", async function (req, res) {
  await Book.findOneAndDelete({ _id: req.params.id });
  res.send(true);
});

module.exports = router;

router.post("/users/", async function (req, res, next) {
  const user = new User({
    username: req.body.username,
    pass: req.body.pass,
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
