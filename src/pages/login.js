/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-use-before-define */

import React, {useState, useContext} from 'react'
import {navigate} from 'gatsby'
import {Header, Form, Input, Button, Segment, Message} from 'semantic-ui-react'
import {useMutation} from '@apollo/react-hooks'
import SEO from '../components/SEO'
import AuthContext from '../components/Context/AuthContext'
import Layout from '../components/Layout'
import useForm from '../components/Hooks/useForm'

import {AUTHENTICATE_USER} from '../components/Context/Auth.vendure'

const LoginPage = ({location}) => {
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState([])
  const {updateToken} = useContext(AuthContext)

  const [authenticateUser, ..._] = useMutation(AUTHENTICATE_USER, {
    onCompleted: ({login}) => {
      if (login.errorCode) {
        setApiError(login.message || login.errorCode)
      } else {
        localStorage.setItem('customerToken', login.id)
        localStorage.setItem('mcustomer', login.id)
        updateToken()
        navigate('/myaccount/')
      }
      setLoading(false)
    },
  })

  const formLogin = () => {
    setLoading(true)
    authenticateUser({
      variables: {username: values.email, password: values.password},
    })
  }
  const {values, handleChange, handleSubmit, errors} = useForm(
    formLogin,
    validate,
  )

  const handleErrors = errors => {
    if (!Array.isArray(errors) && !errors.length > 0) {
      return (
        <Message
          error
          header="Sorry"
          content="A verified email and/or password does not match our records. Please check your login details and try again."
        />
      )
    }
    return errors.map(e => (
      <Message error header={e.title} content={e.detail} key={e.status} />
    ))
  }
  return (
    <Layout location={location}>
      <SEO title="Login" />
      <Header as="h1">Log in to your account</Header>
      <Form
        onSubmit={handleSubmit}
        loading={loading}
        error={apiError.length !== 0 || Object.entries(errors).length !== 0}
      >
        {apiError.length !== 0 ? handleErrors(errors) : null}
        <Segment>
          <Form.Field>
            <label htmlFor="email">Email</label>
            <Input
              id="email"
              fluid
              name="email"
              type="email"
              autoFocus
              onChange={handleChange}
              value={values.email || ''}
            />
          </Form.Field>
          {errors.email && (
            <p data-testid="error" style={{color: 'red'}}>
              {errors.email}
            </p>
          )}
          <Form.Field>
            <label htmlFor="password">Password</label>
            <Input
              id="password"
              fluid
              name="password"
              type="password"
              value={values.password || ''}
              onChange={handleChange}
            />
          </Form.Field>
          {errors.password && <p style={{color: 'red'}}>{errors.password}</p>}
          <Button type="submit" color="orange">
            Login
          </Button>
        </Segment>
      </Form>
    </Layout>
  )
}

export default LoginPage

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Email address is required'
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid'
  }
  if (!values.password) {
    errors.password = 'Password is required'
  }
  return errors
}
