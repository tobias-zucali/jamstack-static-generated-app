const { initAuth } = require('./src/app/services/auth')


exports.onClientEntry = () => {
  console.log('Initialize auth')
  initAuth()
}
