import React, {useState, useContext} from 'react'
import {Dropdown, Input, Icon, Transition} from 'semantic-ui-react'
import {useMutation} from '@apollo/react-hooks'
import CartContext from '../Context/CartContext'
import {ADD_ITEM_TO_ORDER} from '../Context/Cart.vendure'

const Moltin = require('../../../lib/moltin')

const AddToCart = ({productId, variants}) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [visible, setVisible] = useState(false)
  const {addToCart} = useContext(CartContext)

  const toggleMessage = () => {
    setTimeout(() => {
      setVisible(false)
    }, 1000)
  }

  const [addItemToOrder, ...mutationStatus] = useMutation(ADD_ITEM_TO_ORDER, {
    onCompleted: async () => {
      const cartId = await localStorage.getItem('mcart')
      addToCart(quantity, cartId)
      setVisible(true)
      toggleMessage()
      setLoading(false)
    },
  })

  const varientOptions = variants.map(v => {
    return {
      key: v.id,
      text: v.name,
      value: v.id,
    }
  })

  const [variantId, setVariantId] = useState(varientOptions[0].value)

  const validate = quantity => {
    let error
    const re = /^[0-9\b]+$/

    if (!quantity) error = "Can't be blank"
    if (!re.test(quantity)) error = 'Please enter an integer for the quantity'

    return error
  }

  const handleSubmit = async () => {
    const cartId = await localStorage.getItem('mcart')

    const error = validate(quantity)
    setError(error)
    if (!error) {
      setLoading(true)
      addItemToOrder({
        variables: {productVariantId: variantId, quantity: Number(quantity)},
      })
    }
  }

  const handleQuantityChange = ({target: {value}}) => setQuantity(value)
  const handleVarientChange = (e, {value}) => setVariantId(value)

  return (
    <>
      <Dropdown
        onChange={handleVarientChange}
        placeholder="Select Varient"
        selection
        options={varientOptions}
        defaultValue={varientOptions[0].value}
      />

      <Input
        type="number"
        placeholder="Quantity"
        value={quantity}
        min={1}
        step={1}
        error={!!error}
        onChange={handleQuantityChange}
        action={{
          color: 'orange',
          content: 'Add to Cart',
          icon: 'plus cart',
          onClick: handleSubmit,
          loading,
          disabled: loading,
        }}
      />
      {error && <div style={{color: 'red', position: 'absolute'}}>{error}</div>}
      <Transition duration={{hide: 500, show: 500}} visible={visible}>
        <div style={{color: 'green', position: 'absolute'}}>
          <Icon name="check" />
          Added to cart
        </div>
      </Transition>
    </>
  )
}

export default AddToCart
