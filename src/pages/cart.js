/* eslint-disable camelcase */
import React, {useState, useContext} from 'react'
import {useQuery, useMutation} from '@apollo/react-hooks'
import SEO from '../components/SEO'
import CartItemList from '../components/CartItemList'
import CartSummary from '../components/CartSummary'
import CartContext from '../components/Context/CartContext'
import Layout from '../components/Layout'

import {
  GET_ACTIVE_ORDER,
  REMOVE_ORDER_LINE,
} from '../components/Context/Cart.vendure'

const Moltin = require('../../lib/moltin')

const Cart = ({location}) => {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])
  const [completed, setCompleted] = useState(false)
  const [meta, setMeta] = useState({})
  const [cartId, setCartId] = useState({})
  const {updateCartCount} = useContext(CartContext)

  const parseData = data => {
    const itemsParsed = data.lines.map(i => {
      return {
        id: i.id,
        product_id: i.productVariant.product.id,
        name: i.productVariant.name,
        quantity: i.quantity,
        meta: (i.unitPrice / 100).toFixed(2),
        image: i.featuredAsset.preview,
      }
    })
    setItems(itemsParsed)
    setMeta({
      display_price: {
        with_tax: {
          amount: data.subTotalBeforeTax,
          currency: data.currencyCode,
          formatted: (data.subTotalBeforeTax / 100).toFixed(2),
        },
      },
    })
  }

  const [removeOrderLine, ..._] = useMutation(REMOVE_ORDER_LINE, {
    onCompleted: data => {
      parseData(data.removeOrderLine)
      updateCartCount(data.removeOrderLine.totalQuantity, cartId)
    },
  })

  useQuery(GET_ACTIVE_ORDER, {
    fetchPolicy: 'network-only',
    onCompleted: ({activeOrder}) => {
      if (activeOrder) {
        parseData(activeOrder)
      }
      setLoading(false)
    },
  })

  const handleCheckout = async data => {
    const cartId = await localStorage.getItem('mcart')
    const customerId = localStorage.getItem('mcustomer')

    const {
      id: token,
      email,
      card: {
        name,
        address_line1: line_1,
        address_city: city,
        address_country: country,
        address_state: county,
        address_zip: postcode,
      },
    } = data

    const customer = customerId || {name, email}

    const address = {
      first_name: name.split(' ')[0],
      last_name: name.split(' ')[1] || '',
      line_1,
      city,
      county: county || '',
      country,
      postcode,
    }

    try {
      const {
        data: {id},
      } = await Moltin.checkoutCart(cartId, customer, address)
      await Moltin.payForOrder(id, token, email)
      setCompleted(true)
      updateCartCount(0, cartId)
    } catch (e) {
      console.log(e)
    }
  }

  const handleRemoveFromCart = itemId => {
    removeOrderLine({variables: {id: itemId}})
  }

  const rest = {completed, items, loading, cartId}

  return (
    <Layout location={location}>
      <SEO title="Cart" />
      <CartItemList
        {...rest}
        removeFromCart={item => handleRemoveFromCart(item)}
      />
      {!loading && !completed && (
        <CartSummary {...meta} handleCheckout={handleCheckout} />
      )}
    </Layout>
  )
}

export default Cart
