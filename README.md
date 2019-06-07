[![Netlify Status](https://api.netlify.com/api/v1/badges/d2785c91-6438-42ba-847e-107c82fdb0df/deploy-status)](https://app.netlify.com/sites/jamstack-static-generated-app/deploys)

# A static generated (demo) app following the **JAM**Stack principles

> Modern web development architecture based on client-side JavaScript, reusable APIs, and prebuilt Markup.
> 
> _[https://jamstack.org](https://jamstack.org/)_

This is a proof of concept, design and solutions are just far enough to see if the approach could work.

---

__👉 Try it out on https://jamstack-static-generated-app.netlify.com/!__

---

## 🎯 Goals of this project:
- Realize a simple search based application
- The app has private and public areas
- The used tools and frameworks are reliable enough for a global scale project
- Application and marketing pages can be served from one project / with one deploy
- (Marketing-)text content can be changed without the help of an engineer
- Serverless infrastructure as long as possible
- SEO is great ([sitemap.xml](https://jamstack-static-generated-app.netlify.com/sitemap.xml), web crawler friendly, meta tags, ...)
- Loading- and runtime-performance is great
- Accessibility is great

## 🛠 Used tools and libraries:
- [React](https://reactjs.org/) as a basis for a stable web application
- [Babel](https://babeljs.io) for ECMAScript 2015+ syntax
- [jest](https://jestjs.io/) for unit tests
- [ESLint](https://eslint.org/) to detect errors in advance and for strict code styles
- [GatsbyJS](https://www.gatsbyjs.org/) to generate static pages which load quickly and can be indexed easily for SEO
- [Netlify](https://www.netlify.com/) for automatic deploys and continuous integration
- [Netlify CMS](https://www.netlifycms.org/) for editing the (marketing-)content, stores the data in your git-repository
- [Netlify Identity service](https://www.netlify.com/docs/identity/) as simple authentication as a service
- [GraphQL](https://graphql.org/) for an extendible API following reliable standards
- [Netlify Functions](https://www.netlify.com/docs/functions/) to deploy serverless lambda functions
- [Node.js](https://nodejs.org) as the language for the lambda functions
- The database is faked up to now

## 🤓 Learnings
- [React](https://reactjs.org/)
  - improved dramatically with the newly introduced [Hooks](https://reactjs.org/docs/hooks-intro.html). Code gets easier to read and can be organized modular and reusable.
  - [Angular](https://angular.io) would be an alternative, but I don't know enough about static page generation with [Angular](https://angular.io) yet
- [Babel](https://babeljs.io)
  - the current version supports [TypeScript](https://www.typescriptlang.org) which could be a good (because typed) alternative to standard Javascript
  - switching to another syntax with lots of existing code could be hard
- [jest](https://jestjs.io/)
  - is interchangeable with other testing frameworks
  - tests are a "must have" right from the beginning
    - they help during development
    - it is a pain to write for the existing code you do not plan to change
    - automated tests are absolutely necessary for a stable product
  - pull requests with failed texts must not be merged to master
- [ESLint](https://eslint.org/)
  - is interchangeable with other linting frameworks
  - the rule set for linting is always open for discussion, but it must be consistent in the project
- [GatsbyJS](https://www.gatsbyjs.org/)
  - has a steep learning curve if you are not familiar with GraphQL but it worked perfectly as soon as I overcome this hurdle
  - works best if you can query your data from a GraphQL service
  - works best if you have regular update cycles for new information (e. g. daily)
    - you could overcome this limitation by updating the data after loading the page and/or adding client routes for missing static pages. But this complicates things a lot.
    - if this limitation is not acceptable the next step would be server-side rendering instead of generating static pages (e. g. with [Next.js](https://nextjs.org/)), which makes server infrastructure much more complicated and introduces the danger of server-side runtime errors during rendering.
- [Netlify](https://www.netlify.com/)
  - works like a charm for building and deploying static content
  - the tight connection with [GitHub](https://guides.github.com) allows preview builds and running tests and linters before merging a [pull request](https://help.github.com/en/articles/about-pull-requests)
  - the same tasks could be done with a CI/CD tool like [CodeShip](http://codeship.com/) in combination with a storage solution like [Amazon S3](https://aws.amazon.com/s3/)
    - as setup and maintenance is so much easier with Netlify  I would stick with it as long as possible
    - switching to other tools is possible anytime
  - the service is a [cost factor](https://www.netlify.com/pricing/#features)
- [Netlify CMS](https://www.netlifycms.org/)
  - is a static page including an npm package directly on your server
  - stores the contents as markdown files in your git repository
  - offers a lot of possibilities to be extended and modified
  - is open source
  - the dependencies to Netlify services are [Identity](https://www.netlify.com/docs/identity/) and [Git Gateway ](https://www.netlify.com/docs/git-gateway/). Both are optional and can be replaced with other solutions easily.
  - switching to another solution is possible as the contents are not hidden in a database
- [Netlify Identity service](https://www.netlify.com/docs/identity/)
  - the easiest to use identity service I tried out yet
  - uses new standards like [Json Web Tokens](https://jwt.io)
  - not sure if it fulfills all requirements for a large scale app, but I like the idea to have a stand-alone identity server instead of being tightly tied to other parts of the application.
  - switching to another solution and migrating lots of existing users could be really hard
  - the service is a [cost factor](https://www.netlify.com/pricing/#identity)
- [GraphQL](https://graphql.org/)
  - after developing so many self-made APIs this deep dive into GraphQL was mind blowing
  - there is almost no situation I can think of which does not have a solid solution with that specification
    - the only task which can get more complicated is uploading contents. But (heavyweight) libraries like [Apollo](https://www.apollographql.com) or [Relay](https://relay.dev) have cool solutions for it, or you can simply offer a REST service next to (or wrapped inside) your GraphQL route
  - the overhead when initially creating the [Schema](https://graphql.org/learn/schema/) pays off as soon as you want to extend the functionality
  - I used the light-weight client-side library [urql](https://formidable.com/open-source/urql/) which worked fine up to now and is easily exchangeable
    - interesting alternatives with lots more features are [Relay](https://relay.dev) or [Apollo](https://www.apollographql.com)
  - I only used the [GraphQL.js](https://github.com/graphql/graphql-js) reference implementation on the server side, but there are problems e.g. with the preflight response
    - alternatives like [Apollo Server Lambda](https://github.com/apollographql/apollo-server/tree/master/packages/apollo-server-lambda) should be evaluated
- functions as a service via [Netlify Functions](https://www.netlify.com/docs/functions/)
  - lambda functions are great as you do not need to take care for a server
    - there are limitations to the runtime
    - there is no shared state between two calls, you will have to store/read from a database if you need it
  - the most simple way to develop and deploy lambda functions I know, at least if Netlify is in use anyway
  - for production use, the API functions need a separate deploy process
    - the build process needs access to the API
  - I would recommend to use a platform independent framework like [Serverless](https://serverless.com) to be independent of a specific service provider
  - there are endless alternative providers, e.g. [AWS Lambda](https://aws.amazon.com/lambda/features/), [Google Cloud Functions](https://cloud.google.com/functions/), [Azure Functions](https://aws.amazon.com/lambda/features/)
  - the service is a [cost factor](https://www.netlify.com/pricing/#functions)
- [Node.js](https://nodejs.org)
  - it is just comfortable to write server- and clientside code in the same language
  - limitations like lack of multi-threading are not relevant for lambda functions as each of them is invoked in its own process
  - there are great libraries for GraphQL available for Node.js
  - the language for the server side code needs to be chosen after the full requirements of the backend are available

## 🤔 TODO:
- build a similar project with [Angular](https://angular.io) using [Angular Universal](https://angular.io/guide/universal)
  - I am still not sure if it is possible to serve the build as static pages or if it is only possible to run it on a node server for server-side rendering
- build a similar project with [vue](https://vuejs.org/) using [nuxt](https://nuxtjs.org/)
  - I would not use this combination for a big project as React and Angular are much more mature
