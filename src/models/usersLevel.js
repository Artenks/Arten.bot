const mongoose = require("mongoose");
const usersLevelSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  username: String,
  Guild: [{
    _id: {type: String},
    xp: Number,
    level: Number,
  }],
  UserCreated: {
    type: Date,
    default: () => Date.now(),
  },
});

module.exports = mongoose.model("UsersLevel", usersLevelSchema);
