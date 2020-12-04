/* eslint-disable camelcase */
import React from 'react'
import {Card, Image} from 'semantic-ui-react'
import Img from 'gatsby-image'
import {Link} from 'gatsby'

const mapProductsToItems = products =>
  products.map(({productName, productId, price, productAsset}) => {
    const priceFormatted = (price.min / 100).toFixed(2) || null

    return {
      as: Link,
      to: `/product/${productId}/`,
      childKey: productId,

      image: (
        <Image>
          <Img
            sizes={productAsset.imageFile.childImageSharp.sizes}
            alt={productName}
          />
        </Image>
      ),
      header: productName,
      meta: (
        <Card.Meta style={{color: 'dimgray'}}>from ${priceFormatted}</Card.Meta>
      ),
    }
  })

export default ({products}) => (
  <Card.Group items={mapProductsToItems(products)} itemsPerRow={2} stackable />
)
