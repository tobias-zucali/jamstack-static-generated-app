import CMS from 'netlify-cms-app'

import collections from './collections'

// register preview templates and custom widgets here.

// Manual init instead of config.yml in order to be able to create documents based on the database
CMS.init({
  config: {
    backend: {
      name: 'git-gateway',
      branch: 'master',
    },
    load_config_file: false,
    publish_mode: 'editorial_workflow',
    media_folder: 'static/assets',
    public_folder: 'static',
    display_url: 'https://jamstack-static-generated-app.netlify.com',
    show_preview_links: true,
    collections,
  },
})
