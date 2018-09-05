const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
  name: { type: String },
  wins: { type: Number, default: 1 } // a player is only created when winning the game.
});

PlayerSchema.statics.win = function(id) {
  const Player = mongoose.model("player");

  return Player.findById(id).then(player => {
    ++player.wins;
    return player.save();
  });
};

PlayerSchema.statics.findByName = function(name) {
  const Player = mongoose.model("player");

  return Player.findOne({ name: name }).then(player => player);
};

mongoose.model("player", PlayerSchema);
