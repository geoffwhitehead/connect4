const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const mongoose = require("mongoose");
const Player = mongoose.model("player");
const PlayerType = require("./player_type");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addPlayer: {
      type: SongType,
      args: {
        title: { GraphQLString }
      },
      resolve(parentValue, { name }) {
        return new Player({ name }).save();
      }
    },
    addWin: {
      type: PlayerType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Player.win(id);
      }
    }
  }
});

module.exports = mutation;
