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

// export const QUERY_ALL_RECIPIES = gql`
//   {
//     recipes {
//       _id
//       recipeText
//       username
//       description
//       directions
//     }
//   }
// `;
// export const QUERY_ALL_RECIPIES = gql`
//   query recipies($username: String) {
//     recipies(username: $username) {
//       _id
//       recipeText
//       username
//       description
//       directions
//     }
//   }
// `;

export const QUERY_ALL_RECIPIES = gql`
  query recipies($recipeText: String) {
    recipies(recipeText: $recipieText) {
      _id
      recipeText
      username
      description
      directions
    }
  }
`;