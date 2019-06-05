import React from 'react'
import { navigate } from 'gatsby'
import { handleLogin, isLoggedIn } from 'utils/authentication'

class Login extends React.Component {
  handleSubmit = () => handleLogin((/* user */) => {
    navigate('/app/profile')
  })

  render() {
    return (
      <>
        <h1>Log in</h1>
        {isLoggedIn ? (
          'Already logged in'
        ) : (
          <button onClick={this.handleSubmit}>log in</button>
        )}
      </>
    )
  }
}

export default Login
