const { initAuth } = require('./src/utils/authentication')


exports.onClientEntry = () => {
  console.log('Initialize auth')
  initAuth()
}
