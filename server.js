const { ApolloServer } = require("apollo-server");
const { sequelize } = require("./models");

const resolvers = require("./graphql/resolvers");
const typeDefs = require("./graphql/typeDefs");
const contextMiddleware = require("./util/contextMiddleware")


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: contextMiddleware,
});

server.listen().then(async ({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
  try {
    await sequelize.authenticate();
    console.log("Database connected!");
  } catch (e) {
    console.log(e);
  }
});
