/* eslint-disable camelcase */
import React from 'react'
import {Header, Divider, Table} from 'semantic-ui-react'

export default ({description, material, max_watt, bulb_qty, finish, bulb}) => (
  <div>
    <Header as="h3">About this product</Header>
    <p>{description}</p>
  </div>
)
