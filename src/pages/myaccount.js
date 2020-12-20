import React, {useState, useEffect, useContext} from 'react'
import {useQuery} from '@apollo/react-hooks'
import {navigate} from 'gatsby'
import SEO from '../components/SEO'
import OrderItemList from '../components/OrderItemList'
import Layout from '../components/Layout'
import AuthContext from '../components/Context/AuthContext'

import {GET_CUSTOMER_ORDERS} from '../components/Context/Auth.vendure'

const MyAccount = ({location}) => {
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState([])
  const {token} = useContext(AuthContext)

  useQuery(GET_CUSTOMER_ORDERS, {
    onCompleted: ({activeCustomer}) => {
      if (activeCustomer) {
        setOrders(activeCustomer.orders.items)
      }
      setLoading(false)
    },
  })

  useEffect(() => {
    if (!token) {
      navigate('/login/')
    }
  }, [token])

  return (
    <Layout location={location}>
      <SEO title="My Account" />
      <OrderItemList orders={orders} loading={loading} />
    </Layout>
  )
}
export default MyAccount
