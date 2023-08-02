const mongoose = require("../booksconnection.js");
const Book = mongoose.model("Book", {
  book_title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  date_published: {
    type: String,
    required: true,
    min: 4,
  },
  publisher: {
    type: String,
    required: true,
  },
  isReserved: {
    type: Boolean,
    required: true,
  },
});

module.exports = Book;
