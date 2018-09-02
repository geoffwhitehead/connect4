const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
  name: { type: String },
  wins: { type: Number, default: 0 }
});

PlayerSchema.statics.win = function(id) {
  const Player = mongoose.model("player");

  return Player.findById(id).then(player => {
    ++player.wins;
    return player.save();
  });
};

mongoose.model("player", PlayerSchema);
