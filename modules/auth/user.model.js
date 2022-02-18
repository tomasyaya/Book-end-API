const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true
  },
  Books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
});

module.exports = mongoose.model("User", userSchema);
