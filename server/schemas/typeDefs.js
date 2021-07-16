const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        name: String
        email: String
        password: String
        savedBooks: [String]
    }

    type Auth {
        token: ID!
        profile: Profile
    }

    type Book {
        authors: [String]
        description: String!
        bookId: ID!
        image: String
        link: String
        title: String!
    }

    type Query {
        me: User
    }

    type Mutation {
        addUser(name: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth

        saveBook(userId: ID!, book: String!): User
        removeBook(book: String): User
    }
`;

module.exports = typeDefs;