const mongoose = require("../connection.js");
const { Schema } = mongoose;

const debtSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  debt: {
    type: Number,
    required: true,
  },
  loans: {
    type: Number,
    required: true,
  },
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
