import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
    }
  }
`;

export const QUERY_RECIPES = gql`
  query recipes($recipeText: String) {
    recipes(recipeText: $recipieText) {
      _id
      recipeText
      username
      description
      directions
    }
  }
`;

export const QUERY_ALL_RECIPES = gql`
  {
    products {
      _id
      recipeText
      username
      description
      directions
    }
  }
`;