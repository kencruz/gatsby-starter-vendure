/* eslint-disable camelcase */
import React from 'react'
import {Link} from 'gatsby'
import {Header, Loader, Message, Label, Segment} from 'semantic-ui-react'

export default ({orders, loading}) => {
  if (loading) return <Loader active inline="centered" />

  if (orders.length === 0) {
    return (
      <Message warning>
        <Message.Header>No recent orders</Message.Header>
        <p>
          When you place an order, they will appear here.
          <Link to="/"> Go shopping.</Link>
        </p>
      </Message>
    )
  }

  return (
    <div>
      <Header as="h1">My previous orders</Header>

      {orders.map(order => {
        const {
          id,
          billingAddress,
          shippingAddress,
          active,
          total,
          lines,
        } = order
        const completed = active === false
        const price = total

        return (
          <Segment.Group key={id}>
            <Segment>
              <Header as="h4">{price}</Header>
              <Label
                icon={completed ? 'check' : null}
                color={completed ? 'green' : null}
                content={active ? 'ACTIVE' : 'COMPLETED'}
              />
              <pre>{JSON.stringify(lines, '\t', 2)}</pre>
            </Segment>
            <Segment.Group horizontal>
              <Segment>
                <Header as="h4">Billing address:</Header>
                <p>
                  {billingAddress.streetLine1}
                  <br />
                  {billingAddress.streetLine2}
                  <br />
                  {billingAddress.city}
                  <br />
                  {billingAddress.postalCode}
                  <br />
                  {billingAddress.country}
                </p>
              </Segment>
              <Segment>
                <Header as="h4">Shipping address:</Header>
                <p>
                  {shippingAddress.streetLine1}
                  <br />
                  {shippingAddress.streetLine2}
                  <br />
                  {shippingAddress.city}
                  <br />
                  {shippingAddress.postalCode}
                  <br />
                  {shippingAddress.country}
                </p>
              </Segment>
            </Segment.Group>
          </Segment.Group>
        )
      })}
    </div>
  )
}
