const mongoose = require("mongoose");
const guildsInfoSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  Guilds: [
    {
      _id: { type: String, required: true },
      enable: Boolean,
      channelLog: String,
    },
  ],
});

module.exports = mongoose.model("GuildsInfo", guildsInfoSchema);
