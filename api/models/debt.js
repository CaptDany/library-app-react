const mongoose = require("../connection.js");
const { Schema } = mongoose;

const loanSchema = new Schema({
  bookA: {
    type: String,
    required: true,
  },
  bookADate: {
    type: Date,
    required: true,
  },
  bookB: {
    type: String,
    required: true,
  },
  bookBDate: {
    type: Date,
    required: true,
  },
  bookC: {
    type: String,
    required: true,
  },
  bookCDate: {
    type: Date,
    required: true,
  },
});

const debtSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  debt: {
    type: Number,
    required: true,
  },
  loans: loanSchema,
  totalLoans: {
    type: Number,
    required: true,
  },
  authorized: {
    type: Boolean,
    required: true,
  },
});

const debt = mongoose.model("Debt", debtSchema);

module.exports = debt;
