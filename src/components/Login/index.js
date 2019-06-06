import React from 'react'

import useAuthentication from 'hooks/useAuthentication'


const buttonStyles = {
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
}
function Login() {
  const {
    isLoggedIn,
    login,
    logout,
    userName,
  } = useAuthentication()

  return isLoggedIn ? (
    <button
      onClick={logout}
      style={buttonStyles}
      title="Log out"
    >
      {`Hello ${userName}!`}
    </button>
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
