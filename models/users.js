const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    trim: true,
    maxlength: 20,
    unique: true,
  },
  genre: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
});

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;
