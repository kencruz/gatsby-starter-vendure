/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-use-before-define */

import React, {useState} from 'react'
import {Header, Form, Input, Button, Segment, Message} from 'semantic-ui-react'
import {useMutation} from '@apollo/react-hooks'
import SEO from '../components/SEO'
import {REGISTER_USER} from '../components/Context/Auth.vendure'
import Layout from '../components/Layout'
import useForm from '../components/Hooks/useForm'

const Register = ({location}) => {
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState([])
  const [apiSuccess, setApiSuccess] = useState(false)

  const [registerUser, ..._] = useMutation(REGISTER_USER, {
    onCompleted: () => {
      setApiSuccess(true)
    },
    onError: e => {
      const errors = {
        key: e.registerCustomerAccount.errorCode,
        title: e.registerCustomerAccount.__typename,
        detail: e.registerCustomerAccount.message,
      }
      setApiError(errors)
    },
  })

  const formRegister = () => {
    setLoading(true)
    registerUser({
      variables: {
        emailAddress: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        password: values.password,
      },
    })
    setLoading(false)
  }

  const {values, handleChange, handleSubmit, errors} = useForm(
    formRegister,
    validate,
  )

  const handleErrors = errors => {
    if (!Array.isArray(errors) && !errors.length > 0) {
      return (
        <Message error header="Sorry" content="Cannot register at this time." />
      )
    }
    return errors.map(e => (
      <Message error header={e.title} content={e.detail} key={e.status} />
    ))
  }

  const handleSuccess = () => {
    return (
      <Message
        positive
        header="Success!"
        content="Account is registered. Please verify by clicking the activation link sent to your email."
      />
    )
  }

  return (
    <Layout location={location}>
      <SEO title="Register" />
      <Header as="h1">Create an account</Header>
      <Form onSubmit={handleSubmit} loading={loading} error={!!errors}>
        {apiError.length !== 0 ? handleErrors(apiError) : null}
        {apiSuccess ? handleSuccess() : null}
        <Segment>
          <Form.Field>
            <label htmlFor="firstName">First name</label>
            <Input
              id="firstName"
              disabled={apiSuccess}
              fluid
              name="firstName"
              autoFocus
              onChange={handleChange}
              value={values.firstName || ''}
            />
          </Form.Field>
          {errors.firstName && <p style={{color: 'red'}}>{errors.firstName}</p>}

          <Form.Field>
            <label htmlFor="name">Last name</label>
            <Input
              id="lastName"
              disabled={apiSuccess}
              fluid
              name="lastName"
              autoFocus
              onChange={handleChange}
              value={values.lastName || ''}
            />
          </Form.Field>
          {errors.name && <p style={{color: 'red'}}>{errors.name}</p>}

          <Form.Field>
            <label htmlFor="email">Email</label>
            <Input
              id="email"
              disabled={apiSuccess}
              fluid
              name="email"
              type="email"
              onChange={handleChange}
              value={values.email || ''}
            />
          </Form.Field>
          {errors.email && <p style={{color: 'red'}}>{errors.email}</p>}
          <Form.Field>
            <label htmlFor="password">Password</label>
            <Input
              id="password"
              disabled={apiSuccess}
              fluid
              name="password"
              type="password"
              onChange={handleChange}
              value={values.password || ''}
            />
          </Form.Field>
          {errors.password && <p style={{color: 'red'}}>{errors.password}</p>}
          <Button disabled={apiSuccess} type="submit" color="orange">
            Register
          </Button>
        </Segment>
      </Form>
    </Layout>
  )
}

export default Register

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
  if (!values.firstName) {
    errors.firstName = 'A first name is required'
  }
  if (!values.lastName) {
    errors.lastName = 'A name is required'
  }
  return errors
}
