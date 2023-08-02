const mongoose = require("../connection.js");
const { Schema } = mongoose;

const nameSchema = new Schema({
  first: {
    type: String,
    required: true,
  },
  middle: {
    type: String,
  },
  last: {
    type: String,
    required: true,
  },
});

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  pass: {
    type: String,
    required: true,
  },
  birthyear: {
    type: Number,
    required: true,
    min: 1800,
    max: 2030,
  },
  name: nameSchema,
  isAdmin: {
    type: Boolean,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
