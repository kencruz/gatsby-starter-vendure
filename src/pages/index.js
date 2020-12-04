import React from 'react'
import {graphql, useStaticQuery} from 'gatsby'
import get from 'lodash/get'
import {Image, Header} from 'semantic-ui-react'
import ProductList from '../components/ProductList'
import SEO from '../components/SEO'
import logo from '../images/ill-short-dark.svg'
import Layout from '../components/Layout'

const StoreIndex = ({location}) => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
        }
      }
      vendure {
        search(input: {groupByProduct: true, take: 10}) {
          items {
            productId
            productName
            description
            slug
            currencyCode
            price {
              ... on Vendure_PriceRange {
                min
                max
              }
              ... on Vendure_SinglePrice {
                value
              }
            }
            productPreview
            productAsset {
              preview
              imageFile {
                childImageSharp {
                  sizes(maxWidth: 600, maxHeight: 600, fit: COVER) {
                    ...GatsbyImageSharpSizes
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  console.log(data)

  const siteTitle = get(data, 'site.siteMetadata.title')
  const products = get(data, 'vendure.search.items')
  const filterProductsWithoutImages = products.filter(v => v.productPreview)

  return (
    <Layout location={location}>
      <SEO title={siteTitle} />
      <Header
        as="h3"
        icon
        textAlign="center"
        style={{
          marginBottom: '2em',
        }}
      >
        <Header.Content
          style={{
            width: '60%',
            margin: '0 auto',
          }}
        >
          <Image src={logo} alt="logo" />
        </Header.Content>
      </Header>
      <ProductList products={filterProductsWithoutImages} />
    </Layout>
  )
}

export default StoreIndex
