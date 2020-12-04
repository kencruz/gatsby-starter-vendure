/* eslint-disable */
import React from 'react'
import {graphql} from 'gatsby'
import SEO from '../components/SEO'
import get from 'lodash/get'
import ProductSummary from '../components/ProductSummary'
import ProductAttributes from '../components/ProductAttributes'
import Layout from '../components/Layout'

class ProductPageTemplate extends React.PureComponent {
  render() {
    const productInfo = get(this, 'props.data.vendure')
    const data = productInfo.product
    const slug = data.slug
    const image = get(data, 'featuredAsset.preview')
    const sizes = get(data, 'featuredAsset.imageFile.childImageSharp.sizes')
    const product = {
      ...data,
      id: data.id,
      image,
      mainImage: data.featuredAsset.imageFile,
      header: data.name,
      meta: {
        display_price: {
          with_tax: {
            amount: data.variants[0].price,
            currency: data.variants[0].currencyCode,
            formatted: (data.variants[0].price / 100).toFixed(2),
          },
        },
      },
      sku: data.variants[0].sku,
    }

    if (!sizes) return null

    return (
      <Layout location={this.props.location}>
        <SEO title={slug} />
        <ProductSummary {...product} />
        <ProductAttributes {...product} />
      </Layout>
    )
  }
}

export default ProductPageTemplate

export const query = graphql`
  query($id: ID!) {
    vendure {
      product(id: $id) {
        id
        name
        slug
        description
        featuredAsset {
          id
          preview
          imageFile {
            childImageSharp {
              sizes(maxWidth: 400, maxHeight: 400) {
                ...GatsbyImageSharpSizes
              }
            }
          }
        }
        variants {
          id
          name
          sku
          price
          currencyCode
        }
      }
    }
  }
`
