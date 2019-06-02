const { author, description } = require('./package.json')

module.exports = {
  name: 'JAMstack static generated app',
  short_name: 'jamstack-static-generated-app',
  author,
  description,
  start_url: '/',
  background_color: '#663399',
  theme_color: '#663399',
  display: 'minimal-ui',
  icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
}
