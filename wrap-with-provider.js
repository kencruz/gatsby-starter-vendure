import {ApolloProvider} from '@apollo/react-hooks'
import 'cross-fetch/polyfill'
import ApolloClient, {InMemoryCache} from 'apollo-boost'

import React from 'react'
import AuthProvider from './src/components/Context/AuthProvider'
import CartProvider from './src/components/Context/CartProvider'

const cache = new InMemoryCache()
const client = new ApolloClient({
  cache,
  credentials: 'include',
  uri: process.env.VENDURE_SHOP_API,
  resolvers: {
    Mutation: {
      setActiveOrderId: (_, {id}, {cache: apolloCache}) => {
        apolloCache.writeData({
          data: {
            activeOrderId: id,
          },
        })
      },
    },
  },
})

cache.writeData({
  data: {
    activeOrderId: null,
  },
})

// eslint-disable-next-line import/prefer-default-export
export default ({element}) => (
  <ApolloProvider client={client}>
    <AuthProvider>
      <CartProvider>{element}</CartProvider>
    </AuthProvider>
  </ApolloProvider>
)
