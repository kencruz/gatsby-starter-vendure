/* eslint-disable camelcase */
import React from 'react'
import {Link} from 'gatsby'
import {Item, Button, Loader, Message, Responsive} from 'semantic-ui-react'

export default ({items, removeFromCart, loading, completed}) => {
  if (loading) return <Loader active inline="centered" />

  if (completed)
    return (
      <Message success>
        <Message.Header>Your placed!</Message.Header>
        <p>Congratulations. Your order and payment has been accepted.</p>
      </Message>
    )

  if (items.length === 0)
    return (
      <Message warning>
        <Message.Header>Your cart is empty</Message.Header>
        <p>
          You will need to add some items to the cart before you can checkout.
        </p>
      </Message>
    )
  const mapCartItemsToItems = items =>
    items.map(({id, product_id, name, quantity, meta, image}) => {
      const price = meta
      const imageUrl = `${image}?w=400&h=400&mode=crop`

      const DesktopItemImage = () => (
        <Item.Image
          src={imageUrl}
          alt={name}
          size="small"
          style={{background: '#f2f2f2'}}
        />
      )
      const MobileItemImage = () => (
        <Item.Image
          src={imageUrl}
          alt={name}
          size="small"
          style={{background: 'none'}}
        />
      )

      return {
        childKey: id,
        header: (
          <Item.Header>
            <Link to={`/product/${product_id}/`}>{name}</Link>
          </Item.Header>
        ),
        image: (
          <>
            <Responsive as={MobileItemImage} {...Responsive.onlyMobile} />
            <Responsive
              as={DesktopItemImage}
              minWidth={Responsive.onlyTablet.minWidth}
            />
          </>
        ),
        meta: `${quantity}x ${price}`,
        description: 'Some more information goes here....',
        extra: (
          <Button
            basic
            icon="remove"
            floated="right"
            onClick={() => removeFromCart(id)}
          />
        ),
      }
    })
  return <Item.Group divided items={mapCartItemsToItems(items)} />
}
