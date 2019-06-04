Special folders in `src`:

- `src/pages` Gatsby will turn into static pages. `src/pages/app.js` skips the static generation process because of `gatsby-plugin-create-client-paths` configured in `gatsby-config.js`
- `src/images` contains images that are ingested by `gatsby-source-filesystem` in `gatsby-config.js` and processed by `gatsby-transformer-sharp` and `gatsby-plugin-sharp`
