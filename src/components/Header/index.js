import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import Login from 'components/Login'


function Header({ title }) {
  return (
    <div
      style={{
      }}
    >
      <div
        style={{
          display: 'flex',
        }}
      >
        <h1
          style={{
            margin: 0,
            flex: 1,
          }}
        >
          <Link
            to="/"
            style={{
              color: 'rebeccapurple',
              textDecoration: 'none',
            }}
          >
            {title}
          </Link>
        </h1>
        <Login />
      </div>
    </div>
  )
}

Header.propTypes = {
  title: PropTypes.string,
}

Header.defaultProps = {
  title: '',
}

export default Header
