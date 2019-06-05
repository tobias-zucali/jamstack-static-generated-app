import React from 'react'
import { navigate } from 'gatsby'
import { getUser, handleLogin, isLoggedIn } from 'utils/authentication'


class Login extends React.Component {
  handleSubmit = () => handleLogin((/* user */) => {
    navigate('/app/profile')
  })

  render() {
    const user = getUser()
    console.log(user)

    return isLoggedIn ? (
      (user.user_metadata && user.user_metadata.full_name) || 'logged in'
    ) : (
      <button onClick={this.handleSubmit}>log in</button>
    )
  }
}

export default Login
