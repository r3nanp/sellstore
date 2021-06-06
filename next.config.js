const withPWA = require('next-pwa')

const isDev = process.env.NODE_ENV !== 'production'

module.exports = withPWA({
  pwa: {
    dest: 'public',
    disable: isDev
  }
})
