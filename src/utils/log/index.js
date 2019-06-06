const isDevelopment = (process.env.NODE_ENV === 'development')


export default {
  dev: (...args) => {
    if (isDevelopment) {
      console.log(...args)
    }
  },
}
