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

export const ADD_RECIPE = gql`
    mutation addRecipe($recipeText: String!, $description: String!, $createdAt: String!, $username: String!, $directions: String!) {
        addRecipe(recipeText: $recipeText, description: $description, createdAt: $createdAt, username: $username, directions: $directions) {
            _id
            recipeText
            description
            createdAt
            directions
            user {
                _id
                username
            }
        }
    } 
`