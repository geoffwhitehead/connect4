const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const mongoose = require("mongoose");
const Player = mongoose.model("player");
const PlayerType = require("./player_type");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    processWinner: {
      type: PlayerType,
      args: {
        name: { type: GraphQLString }
      },
      resolve(parentValue, { name }) {
        return Player.findByName(name).then(
          p => (p ? Player.win(p._id) : new Player({ name }).save())
        );
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
