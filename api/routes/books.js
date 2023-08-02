var express = require("express");
var router = express.Router();
var Book = require("../models/booksModel");

router.post("/", async function (req, res, next) {
  const book = new Book({
    book_title: req.body.book_title,
    author: req.body.author,
    date_published: req.body.date_published,
    publisher: req.body.publisher,
  });
  await book.save();
  res.send(book);
});

router.get("/", async function (req, res) {
  const books = await Book.find();
  res.send(books);
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
