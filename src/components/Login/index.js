import React from 'react'
import { Link } from 'gatsby'

import useAuthentication from 'hooks/useAuthentication'


const buttonStyles = {
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  height: '1em',
  color: 'inherit',
  padding: '0 0.5em',
}
function Login() {
  const {
    isLoggedIn,
    login,
    logout,
    userName,
  } = useAuthentication()

  return isLoggedIn ? (
    <>
      {`Hello ${userName}!`}
      {' | '}
      <button
        onClick={logout}
        style={buttonStyles}
        title="Log out"
      >
        Log out
      </button>
      {' | '}
      <a
        href="/admin/"
        style={buttonStyles}
      >
        admin
      </a>
    </>
  ) : (
    <button
      onClick={login}
      style={buttonStyles}
    >
      Log in
    </button>
  )
}

export default Login
