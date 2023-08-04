var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var User = require("../models/user");
var Book = require("../models/booksModel");
var Debt = require("../models/debt");

router.post("/books/", async function (req, res, next) {
  const book = new Book({
    book_title: req.body.book_title,
    author: req.body.author,
    date_published: req.body.date_published,
    publisher: req.body.publisher,
    lastReservedBy: " ",
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
    const uid = req.body.uid;

    if (!bookId) {
      return res
        .status(404)
        .json({ success: false, message: "Book id was not passed" });
    }

    const book = await Book.findById(bookId);

    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }

    if (book.isReserved && book.lastReservedBy != uid) {
      return res
        .status(400)
        .json({ success: false, message: "Book is already reserved" });
    }

    if (!uid) {
      return res
        .status(404)
        .json({ success: false, message: "Debt id was not passed" });
    }

    const debt = await Debt.findOne({ username: uid });
    if (!debt) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (debt.loans >= 3 || debt.debt > 0 || debt.authorized == false) {
      debt.authorized = false;
      return res.status(400).json({
        success: false,
        message: "User presents debt or has 3 or more books reserved",
      });
    }

    book.isReserved = !book.isReserved;
    book.lastReservedBy = uid;

    if (book.isReserved) {
      if (debt.loans.bookA == "not") {
        debt.loans.bookA = book.book_title;
        debt.loans.bookADate = new Date();
      } else if (debt.loans.bookB == "not") {
        debt.loans.bookB = book.book_title;
        debt.loans.bookBDate = new Date();
      } else if (debt.loans.bookC == "not") {
        debt.loans.bookC = book.book_title;
        debt.loans.bookCDate = new Date();
      } else {
        return res.status(400).json({
          success: false,
          message: "User has already borrowed 3 books",
        });
      }
    } else {
      if (debt.loans.bookA == book.book_title) {
        debt.loans.bookA = "not";
        debt.loans.bookADate = new Date();
      } else if (debt.loans.bookB == book.book_title) {
        debt.loans.bookB = "not";
        debt.loans.bookBDate = new Date();
      } else if (debt.loans.bookC == book.book_title) {
        debt.loans.bookC = "not";
        debt.loans.bookCDate = new Date();
      } else {
        return res.status(400).json({
          success: false,
          message: "User never borrowed that book",
        });
      }
    }

    debt.totalLoans = debt.totalLoans + 1;
    await book.save();
    await debt.save();

    res.json({ success: true, message: "Executed successfully" });
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
    phone: req.body.phone,
    address: req.body.address,
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
      pass: hashedPassword,
      email: req.body.email,
      birthyear: req.body.birthyear,
      name: req.body.name,
      isAdmin: req.body.isAdmin,
      phone: req.body.phone,
      address: req.body.address,
    }
  );
  res.send(true);
});

router.delete("/users/:id", async function (req, res) {
  await User.findOneAndDelete({ _id: req.params.id });
  res.send(true);
});

router.post("/debts/", async function (req, res, next) {
  const debt = new Debt({
    username: req.body.username,
    debt: req.body.debt,
    loans: req.body.loans,
    totalLoans: req.body.totalLoans,
    authorized: req.body.authorized,
  });
  await debt.save();
  res.send(debt);
});

router.get("/debts/", async function (req, res) {
  const debt = await Debt.find();
  res.send(debt);
});

router.put("/debts/", async function (req, res) {
  await Debt.findOneAndUpdate(
    {
      _id: req.body._id,
    },
    {
      username: req.body.username,
      debt: req.body.debt,
      loans: req.body.loans,
      totalLoans: req.body.totalLoans,
      authorized: req.body.authorized,
    }
  );
  res.send(true);
});

router.delete("/debt/:id", async function (req, res) {
  await User.findOneAndDelete({ _id: req.params.id });
  res.send(true);
});

module.exports = router;

router.get("/user/:username/borrowed-books", async function (req, res) {
  const username = req.params.username;

  try {
    const userDebt = await Debt.findOne({ username });

    if (!userDebt) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const borrowedBooks = [];

    if (userDebt.loans.bookA && userDebt.loans.bookADate) {
      borrowedBooks.push({
        title: userDebt.loans.bookA,
        borrowedDate: userDebt.loans.bookADate,
      });
    }
    if (userDebt.loans.bookB && userDebt.loans.bookBDate) {
      borrowedBooks.push({
        title: userDebt.loans.bookB,
        borrowedDate: userDebt.loans.bookBDate,
      });
    }
    if (userDebt.loans.bookC && userDebt.loans.bookCDate) {
      borrowedBooks.push({
        title: userDebt.loans.bookC,
        borrowedDate: userDebt.loans.bookCDate,
      });
    }

    const currentDate = new Date();
    var authorized = true;
    var debt = userDebt.debt;
    if (
      debt > 0 ||
      (userDebt.loans.bookC != "not" &&
        userDebt.loans.bookB != "not" &&
        userDebt.loans.bookA != "not")
    ) {
      authorized = false;
    }

    const borrowedBooksData = borrowedBooks.map((book) => {
      // Calculate debt based on the borrowed date
      const borrowedDate = new Date(book.borrowedDate);
      const timeDiff = currentDate.getTime() - borrowedDate.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      const bookDebt = daysDiff > 3 ? (daysDiff - 3) * 10 : 0;
      debt = debt + bookDebt;

      return {
        title: book.title,
        borrowedDate: book.borrowedDate,
        debt: bookDebt,
      };
    });

    res.json({
      success: true,
      authorized,
      borrowedBooks: borrowedBooksData,
      totalDebt: debt,
    });
  } catch (error) {
    console.error("Error fetching borrowed books and debt:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
