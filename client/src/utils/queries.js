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

export const QUERY_ALL_RECIPIES = gql`
  {
    recipe {
      _id
      recipeText
      username
      description
      directions
    }
  }
`;