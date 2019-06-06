[![Netlify Status](https://api.netlify.com/api/v1/badges/d2785c91-6438-42ba-847e-107c82fdb0df/deploy-status)](https://app.netlify.com/sites/jamstack-static-generated-app/deploys)

This is a proof of concept, design and solutions are just far enough to see if the approach could work.

Goals of this project (and the solutions chosen for this spike):
- Realize a simple search based application which can be extended to a full-blown web application including private and public areas
- Application and marketing pages can be served from one project / with one deploy
- Text content is managed by a headless cms and can be changed without help of an engineer ([netlify-cms](https://www.netlifycms.org/))
- Backend needs no complicated infrastructure, at least for an easy start (lambda functions)
- The frameworks used are stable, extensible and well known [react](https://reactjs.org/))
- SEO is great
  - due to the static page generator [Gatsby](https://www.gatsbyjs.org/), [sitemap.xml](https://jamstack-static-generated-app.netlify.com/sitemap.xml) and relevant meta informations it can indexed perfectly by the search engines
- Performance is great
  - due to the static page generator content is there right from the begin and extends to a full blown web application with the react framework

What is not solved in this Proof of concept:
- Database (using a fake by now)
- Backend performance issues (lambda functions do not have persistent state)
- …

Try it out on https://jamstack-static-generated-app.netlify.com/!
