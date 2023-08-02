var express = require("express");
var router = express.Router();
var Book = require("../models/booksModel");

router.post("/", async function (req, res, next) {
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

router.get("/", async function (req, res) {
  const books = await Book.find();
  res.send(books);
});

router.get("/search", async function (req, res) {
  const searchTerm = req.query.term;

  try {
    // Query the database for books that match the search term in title, author, or editor fields
    const searchResults = await Book.find({
      $or: [
        { title: { $regex: searchTerm, $options: "i" } }, // Case-insensitive search for title
        { author: { $regex: searchTerm, $options: "i" } }, // Case-insensitive search for author
        { editor: { $regex: searchTerm, $options: "i" } }, // Case-insensitive search for editor
      ],
    });

    // Return the search results as a JSON response
    res.json(searchResults);
  } catch (error) {
    console.error("Error searching books:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async function (req, res) {
  const book = await Book.findById(req.params.id);
  res.send(book);
});

router.put("/", async function (req, res) {
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

router.delete("/:id", async function (req, res) {
  await Book.findOneAndDelete({ _id: req.params.id });
  res.send(true);
});

module.exports = router;
