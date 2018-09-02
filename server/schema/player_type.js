const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt } = graphql;

const PlayerType = new GraphQLObjectType({
  name: "PlayerType",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    wins: { type: GraphQLInt }
  })
});

module.exports = PlayerType;
