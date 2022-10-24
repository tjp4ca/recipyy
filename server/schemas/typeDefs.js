const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String

        password: String

        recipes: [Recipe]
    }

    type Recipe {
        _id: ID
        recipeText: String
        description: String
        createdAt: String
        username: String
        directions: String
    }

    type Query {
        me: User
        users: [User]
        recipes: [Recipe]
        checkout(products: [ID]!): Checkout
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addRecipe(recipeText: String!, description: String!, directions: String!): Recipe
    }

    type Auth {
        token: ID!
        user: User
    }

    type Checkout {
        session: ID
    }
`;

module.exports = typeDefs;