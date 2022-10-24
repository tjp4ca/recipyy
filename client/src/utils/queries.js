import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      friendCount
      recipes {
        _id
        name
        description
        instructions
        createdAt
        createdBy
        commentCount
        comments {
          _id
          body
          createdAt
          createdBy
        }
      }
      friends {
        _id
        username
      }
    }
  }
`;

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
      friendCount
      friends {
        _id
        username
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      friendCount
      friends {
        _id
        username
      }
      recipes {
        _id
        name
        description
        instructions
        createdAt
        createdBy
        commentCount
      }
    }
  }
`;

export const QUERY_RECIPE = gql`
  query recipe($id: ID!) {
    recipe(_id: $id) {
      _id
      name
      description
      instructions
      createdAt
      createdBy
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

export const QUERY_RECIPES = gql`
  query recipes($username: String) {
    recipes(username: $username) {
      _id
      name
      description
      instructions
      createdAt
      createdBy
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