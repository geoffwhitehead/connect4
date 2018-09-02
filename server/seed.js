const mongoose = require("mongoose");
const Player = mongoose.model("player");

/**
 * Seed the database
 */

function seedPlayers(req, res) {
  // create some players
  const players = [
    { name: 'SON', wins: 1 },
    { name: 'MAR', wins: 5 },
    { name: 'SOR', wins: 0 },
    { name: 'AXE', wins: 2 },
    { name: 'RYU', wins: 3 },
    { name: 'KEN', wins: 2 },
    { name: 'AXE', wins: 1 },
    { name: 'LUI', wins: 0 },
    { name: 'COM', wins: 4 }
  ];

  // use the Event model to insert/save
  for (player of players) {
    var newPlayer = new Player(player);
    newPlayer.save();
  }

  // seeded!
  res.send('Database seeded!');
}