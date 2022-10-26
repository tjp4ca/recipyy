const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    recipes: [Recipe]
    friends: [User]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Recipe {
    _id: ID
    name: String
    description: String
    instructions: String
    createdAt: String
    createdBy: String
    commentCount: Int
    comments: [Comment]
  }

  type Product {
    _id: ID
    name: String
    description: String
    price: Int
  }

  type Checkout {
    session: ID
  }

  type Comment {
    _id: ID
    body: String
    createdAt: String
    createdBy: String
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    recipes(username: String): [Recipe]
    recipe(_id: ID!): Recipe
    checkout(products: [ID]!): Checkout
    donate(donation: Int!): Checkout
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addFriend(friendId: ID!): User
    addProduct(name: String!, description: String!, price: Int!): Product
    addRecipe(name: String!, description: String!, instructions: String!): Recipe
    addComment(recipeId: ID!, body: String!): Recipe
  }
`;

module.exports = typeDefs;