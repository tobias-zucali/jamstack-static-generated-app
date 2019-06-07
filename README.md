[![Netlify Status](https://api.netlify.com/api/v1/badges/d2785c91-6438-42ba-847e-107c82fdb0df/deploy-status)](https://app.netlify.com/sites/jamstack-static-generated-app/deploys)

This is a proof of concept, design and solutions are just far enough to see if the approach could work.

Goals of this project:
- Realize a simple search based application
- The app has private and public areas
- The used tools and frameworks are reliable enough for a global scale project
- Application and marketing pages can be served from one project / with one deploy
- (Marketing-)text content can be changed without help of an engineer
- Serverless infrastructure as long as possible
- SEO is great ([sitemap.xml](https://jamstack-static-generated-app.netlify.com/sitemap.xml), meta tags etc.)
- Loading- and runtime-performance is great
- Accessibility is great

Used tools and libraries:
- [React](https://reactjs.org/) as basis for a stable web application
- [jest](https://jestjs.io/) for unit tests
- [GatsbyJS](https://www.gatsbyjs.org/) to generate static pages which load quick and can be indexed easily for SEO
- [Netlify CMS](https://www.netlifycms.org/) for editing the (marketing-)content, stores the data in your git-repository
- [Netlify Identity service](https://www.netlify.com/docs/identity/) as simple authentication as a service
- Database is faked up to now
- [GraphQL](https://graphql.org/) for an extendible api following reliable standards
- [Node.js](https://nodejs.org) for lambda functions
- [Serverless Lambda functions on Netlify](https://www.netlify.com/docs/functions/) to deploy lambda functions
  - for production use the api functions need a separate deploy process, but for the start it is easy to use the simple netlify deploy

Try it out on https://jamstack-static-generated-app.netlify.com/!

TODO:
- Research for alternatives based on angular
- Try the same approach with [vue](https://vuejs.org/)/[nuxt](https://nuxtjs.org/)
