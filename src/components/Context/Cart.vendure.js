import {gql} from 'apollo-boost'

export const ORDER_FRAGMENT = gql`
  fragment ActiveOrder on Order {
    id
    code
    state
    total
    subTotalBeforeTax
    totalQuantity
    currencyCode
    lines {
      id
      productVariant {
        id
        name
        currencyCode
        product {
          id
        }
      }
      unitPrice
      quantity
      totalPrice
      featuredAsset {
        id
        preview
      }
    }
  }
`

export const GET_ACTIVE_ORDER = gql`
  {
    activeOrder {
      ...ActiveOrder
    }
  }
  ${ORDER_FRAGMENT}
`
