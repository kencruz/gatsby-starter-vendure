import {gql} from 'apollo-boost'

export const GET_CUSTOMER_ORDERS = gql`
  {
    activeCustomer {
      orders(options: {take: 5}) {
        items {
          id
          active
          billingAddress {
            streetLine1
            streetLine2
            city
            postalCode
            country
          }
          shippingAddress {
            streetLine1
            streetLine2
            city
            country
            postalCode
          }
          total
          lines {
            quantity
            productVariant {
              name
            }
            unitPrice
          }
        }
      }
    }
  }
`

export const AUTHENTICATE_USER = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ... on CurrentUser {
        id
        identifier
      }
      ... on InvalidCredentialsError {
        __typename
        authenticationError
        message
        errorCode
      }
      ... on NotVerifiedError {
        __typename
        errorCode
        message
      }
    }
  }
`

export const REGISTER_USER = gql`
  mutation RegisterCustomerAccount(
    $emailAddress: String!
    $firstName: String!
    $lastName: String!
    $password: String!
  ) {
    registerCustomerAccount(
      input: {
        emailAddress: $emailAddress
        firstName: $firstName
        lastName: $lastName
        password: $password
      }
    ) {
      ... on Success {
        __typename
        success
      }
      ... on MissingPasswordError {
        __typename
        errorCode
        message
      }
      ... on NativeAuthStrategyError {
        __typename
        errorCode
        message
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
