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
        ingredients: [Ingredient]
        user: ID
    }
    type Ingredient {
        _id: ID
        ingredientBody: String
    }
    type Query {
        users: [User]
        recipes: [Recipe]
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
`;

module.exports = typeDefs;