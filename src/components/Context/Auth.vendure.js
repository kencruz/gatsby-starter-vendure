import {gql} from 'apollo-boost'

// eslint-disable-next-line import/prefer-default-export
export const AUTHENTICATE_USER = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ... on CurrentUser {
        id
        identifier
      }
      ... on InvalidCredentialsError {
        authenticationError
        message
        errorCode
      }
    }
  }
`
