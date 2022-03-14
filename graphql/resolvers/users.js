const { User, Message } = require("../../models");
const { UserInputError, AuthenticationError } = require("apollo-server");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config/env.json");
const { Op } = require("sequelize");
const messages = require("./messages");
module.exports = {
  Query: {
    getUsers: async (_, __, { user }) => {
      try {
        if (!user) throw new AuthenticationError("Unauthenticated");

        let users = await User.findAll({
          attributes: ['username', 'imageUrl', 'createdAt'],
          where: {
            username: { [Op.ne]: user.username },
          },
        });

        const allUsersMessages = await Message.findAll({
          where: {
            [Op.or]: [{ from: user.username }, { to : user.username }]
          },
          order: [['createdAt', 'DESC']]
        })

        users = users.map(otherUser => {
          const latestMessage = allUsersMessages.find(
            m => m.from === otherUser.username || m.to === otherUser.username
          )

          otherUser.latestMessage = latestMessage
          return otherUser
        })

        return users;
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
    login: async (_, args) => {
      const { username, password } = args;
      let errors = {};

      try {
        if (!username) errors.username = "username must not be empty";
        if (!password) errors.password = "password must not be empty";

        if (Object.keys(errors).length > 0) {
          throw new UserInputError("bad input", { errors });
        }

        const user = await User.findOne({ where: { username } });
        if (!user) {
          errors.username = "user not found";
          throw new UserInputError("user not found", { errors });
        }

        const correctPassword = await bcrypt.compare(password, user.password);

        if (!correctPassword) {
          errors.password = "password is incorrect";
          throw new UserInputError("password is incorrect", { errors });
        }

        const token = jwt.sign(
          {
            username,
          },
          JWT_SECRET,
          { expiresIn: 60 * 60 }
        );
        return {
          ...user.toJSON(),
          createdAt: user.createdAt.toISOString(),
          token: token,
        };
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
  },
  Mutation: {

    register: async (_, args) => {
      let { username, email, password, confirmPassword } = args;
      let errors = {};
      try {
        if (!email) errors.email = "email must not be empty";
        if (!username) errors.username = "username must not be empty";
        if (!password) errors.password = "password must not be empty";
        if (!confirmPassword)
          errors.confirmPassword = "repeated password must not be empty";

        if (password !== confirmPassword)
          errors.confirmPassword = "passwords must match";

        if (Object.keys(errors).length > 0) {
          throw errors;
        }
        password = await bcrypt.hash(password, 6);

        const user = await User.create({
          username: username,
          email: email,
          password: password,
        });

        return user;
      } catch (e) {
        console.log(e);
        if (e.name === "SequelizeUniqueConstraintError") {
          e.errors.forEach(
            (err) => (errors[err.path] = `${err.path} is already taken`)
          );
        } else if (e.name === "SequelizeValidationError") {
          e.errors.forEach((err) => (errors[err.path] = err.message));
        }
        throw new UserInputError("Bad Input", { errors });
      }
    },
  },
};
