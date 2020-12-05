import React, {useState, useEffect} from 'react'
import {useQuery} from '@apollo/react-hooks'
import CartContext from './CartContext'
import {GET_ACTIVE_ORDER} from './Cart.vendure'

const CartProvider = ({children}) => {
  const [cartId, setCartId] = useState(null)
  const [cartCount, setCartCount] = useState(0)
  const {data, error, loading} = useQuery(GET_ACTIVE_ORDER, {
    onCompleted: () =>
      setCartCount(data.activeOrder ? data.activeOrder.totalQuantity : 0),
  })

  const addToCart = (quantity, cartId) => {
    const cartCountResult = Number(cartCount) + Number(quantity)
    localStorage.setItem(
      'mdata',
      JSON.stringify({cartId, cartCount: cartCountResult}),
    )
    setCartCount(cartCountResult)
  }

  const updateCartCount = (cartCount, cartId) => {
    localStorage.setItem('mdata', JSON.stringify({cartId, cartCount}))
    setCartCount(cartCount)
  }

  useEffect(() => {
    const cartId = localStorage.getItem('mcart')

    // Note: Instead of localStorage you can use moltin api & Moltin.getCartItems(cartId) instead
    const mdata = localStorage.getItem('mdata')

    if ((cartId && !mdata) || !cartId) {
      const cartId = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[x]/g, () =>
        // eslint-disable-next-line no-bitwise
        ((Math.random() * 16) | 0).toString(16),
      )
      localStorage.setItem('mcart', cartId)
      localStorage.setItem('mdata', JSON.stringify({cartId, cartCount: 0}))
      setCartId(cartId)
    }
  }, [])

  return (
    <CartContext.Provider
      value={{
        cartId,
        cartCount,
        addToCart,
        updateCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
