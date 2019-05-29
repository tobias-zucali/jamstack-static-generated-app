import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import { isLoggedIn } from '../services/auth'

class PrivateRoute extends React.Component {
  componentDidMount = () => {
    const { location } = this.props
    if (!isLoggedIn() && location.pathname !== '/app/login') {
      // If the user is not logged in, redirect to the login page.
      navigate('/app/login')
      return null
    }
    return null
  }

  render() {
    const { component: Component, location, ...rest } = this.props
    return isLoggedIn() ? <Component {...rest} /> : null
  }
}

PrivateRoute.propTypes = {
  component: PropTypes.func,
  location: PropTypes.string,
}

export default PrivateRoute
