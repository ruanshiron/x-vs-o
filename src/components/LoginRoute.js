import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { UserContext } from '../contexts/UserContextProvider'

export default function LoginRoute({ children, ...rest }) {
  const { signedInUser } = useContext(UserContext)

  return (
    <Route
      {...rest}
      render={({ location }) =>
        !signedInUser ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location }
              }}
            />
          )
      }
    />
  )
}