const { AuthenticatorError, AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
        users: async () => {
            return User.find();
        },

        user: async (parent, { userId }) => {
            return User.findOne({ _id: userId });
        },

        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id });
            }
            throw new AuthenticatorError('You need to be logged in!');
        },
    },

    Mutation: {
        addUser: async (parent, {name, email, password}) => {
            const user = await User.create({name, email, password});
            const token = signToken(user);
            return {token, user};
        },
        login: async (parent, {email, password}) => {
            const user = await User.findone({ email });

            if (!user) {
                throw new AuthenticatorError('No user with this email found!');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticatorError('Incorrect password!');
            }

            const token = signToken(user);
            return {token, user}
        },
        saveBook: async (parent, {userId, book}, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: userId },
                    {
                        $addToSet: { savedBooks: book },
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                )
            }
            throw new AuthenticationError('You need to be logged in!')
        },
        removeBook: async (parent, {bookId}, context) => {
            if (context.user) {
                const removedBook = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$pull:{savedBooks:{bookId}}},
                    {new:true}
                )
                return removedBook;
            }
            throw new AuthenticationError('You need to be logged in!')
        }

    }
}



module.exports = resolvers;