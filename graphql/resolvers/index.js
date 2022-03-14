const userResolvers = require("./users");
const messageeResolvers = require("./messages");

module.exports = {
  // Message: {
  //   createdAt: (parent) => {
  //     parent.createdAt.toISOString();
  //   },
  // },
  // User: {
  //   createdAt: (parent) => {
  //     console.log("PARENt: ",)
  //     parent.createdAt.toISOString();
  //   },
  // },
  
  Query: {
    ...messageeResolvers.Query,
    ...userResolvers.Query,
  },
  Mutation: {
    ...messageeResolvers.Mutation,
    ...userResolvers.Mutation,
  },
};
