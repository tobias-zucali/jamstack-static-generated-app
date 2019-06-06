import { useCallback, useState } from 'react'
import netlifyIdentity from 'netlify-identity-widget'

import isBrowser from 'utils/isBrowser'
import log from 'utils/log'


let isInit = false

const initAuth = () => {
  if (!isInit && isBrowser()) {
    // You must run this once before trying to interact with the widget
    netlifyIdentity.init()
    isInit = true
  }
}

const getUser = () => (isBrowser() && netlifyIdentity.currentUser()) || null

const login = async () => {
  log.dev('logging in...')
  return new Promise((resolve) => {
    netlifyIdentity.on(
      'login',
      (user) => {
        log.dev('logged in!', { user })
        resolve(user)
      }
    )
    netlifyIdentity.open()
  })
}

const logout = () => new Promise((resolve) => {
  netlifyIdentity.on(
    'logout',
    resolve
  )
  netlifyIdentity.logout()
})

const getUserName = (user) => {
  if (!user) {
    return null
  }
  return (user.user_metadata && user.user_metadata.full_name) || user.email || null
}


export default function useAuthentication() {
  initAuth()
  const [user, setUser] = useState(getUser)

  return {
    isLoggedIn: !!user,
    login: useCallback(
      async () => {
        if (user) {
          return user
        }
        const newUser = await login()
        setUser(newUser)
        return newUser
      },
      [setUser, user]
    ),
    logout: useCallback(
      async () => {
        await logout()
        setUser(null)
      },
      [setUser]
    ),
    user,
    userName: getUserName(user),
  }
}
