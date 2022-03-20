const userResolvers = require("./users");
const messageeResolvers = require("./messages");

module.exports = {
  Message: {
    createdAt: (parent) => {
      return parent.createdAt.toISOString();
    },
  },
  User: {
    createdAt: (parent) => {
      return parent.createdAt.toISOString();
    },
  },
  
  Query: {
    ...messageeResolvers.Query,
    ...userResolvers.Query,
  },
  Mutation: {
    ...messageeResolvers.Mutation,
    ...userResolvers.Mutation,
  },
  Subscription: {
    ...messageeResolvers.Subscription,
  }

};
