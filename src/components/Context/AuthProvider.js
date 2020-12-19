import React, {useState, useEffect} from 'react'
import {useMutation} from '@apollo/react-hooks'
import AuthContext from './AuthContext'
import {LOGOUT_USER} from './Auth.vendure'

const AuthProvider = ({children}) => {
  const [token, setToken] = useState(null)

  const updateToken = () => setToken(localStorage.getItem('customerToken'))

  const [signOut, ..._] = useMutation(LOGOUT_USER, {
    onCompleted: ({logout}) => {
      if (logout.success) {
        localStorage.removeItem('customerToken')
        setToken('')
      }
    },
  })

  useEffect(() => {
    const token = localStorage.getItem('customerToken')
    setToken(token)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        token,
        updateToken,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
