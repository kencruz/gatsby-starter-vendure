import {gql} from 'apollo-boost'

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

export const LOGOUT_USER = gql`
  mutation Logout {
    logout {
      success
    }
  }
`
