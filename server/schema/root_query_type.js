const mongoose = require("mongoose");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull
} = graphql;
const PlayerType = require("./player_type");
const Player = mongoose.model("player");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    players: {
      type: new GraphQLList(PlayerType),
      resolve() {
        return Player.find({});
      }
    },
    player: {
      type: PlayerType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      reolve(parentValue, { id }) {
        return Player.findById(id);
      }
    },
    topTen: {
      type: new GraphQLList(PlayerType),
      resolve() {
        return Player.find({})
          .sort("-wins")
          .limit(10);
      }
    }
  })
});

module.exports = RootQuery;
