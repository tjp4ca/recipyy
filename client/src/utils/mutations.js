import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_FRIEND = gql`
  mutation addFriend($id: ID!) {
    addFriend(friendId: $id) {
      _id
      username
      friendCount
      friends {
        _id
        username
      }
    }
  }
`;

export const ADD_RECIPE = gql`
  mutation addRecipe($name: String!, $description: String!, $instructions: String!) {
    addRecipe(name: $name, description: $description, instructions: $instructions) {
      _id
      name
      description
      instructions
      createdAt
      createdBy
      commentCount
      comments {
        _id
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($recipeId: ID!, $body: String!) {
    addComment(recipeId: $recipeId, body: $body) {
      _id
      commentCount
      comments {
        _id
        body
        createdAt
        createdBy
      }
    }
  }
`;

export const UPDATE_RECIPE = gql`
  mutation updateRecipe($name: String!, $description: String!, $instructions: String!) {
    updateRecipe(name: $name, description: $description, instructions: $instructions) {
      _id
      name
      description
      instructions
    }
  }
`;