import CMS from 'netlify-cms-app'

// register preview templates and custom widgets here.


const LANGUAGES = [
  {
    label: 'Deutsch',
    key: 'de',
  },
  {
    label: 'English',
    key: 'en',
  },
]

// TODO: use multilingual fields everywhere!
const getMultilingualStringField = ({ label, name }) => ({
  label,
  name,
  widget: 'object',
  fields: LANGUAGES.map((language) => ({
    label: language.label,
    name: language.key,
    widget: 'string',
  })),
})

const slugField = {
  label: 'Slug',
  name: 'slug',
  widget: 'string',
}
const nameField = {
  label: 'Name',
  name: 'name',
  widget: 'string',
}
const titleField = {
  label: 'Title',
  name: 'title',
  widget: 'string',
}
const bodyField = {
  label: 'Body',
  name: 'body',
  widget: 'markdown',
}

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
    collections: [
      {
        name: 'productCategories',
        label: 'Product Categories',
        editor: { preview: true },
        folder: 'content/productCategories',
        slug: '{{slug}}',
        create: true,
        fields: [
          slugField,
          nameField,
          {
            label: 'Featured Image',
            name: 'featuredImage',
            widget: 'image',
            required: false,
          },
          bodyField,
        ],
      },
      {
        name: 'products',
        label: 'Products',
        editor: { preview: true },
        folder: 'content/products',
        create: true,
        fields: [
          slugField,
          nameField,
          {
            label: 'Featured Image',
            name: 'featuredImage',
            widget: 'image',
            required: false,
          },
          bodyField,
        ],
      },
      {
        label: 'Pages',
        name: 'pages',
        files: [
          {
            label: 'Home',
            name: 'home',
            file: 'content/pages/home.md',
            fields: [
              titleField,
              bodyField,
            ],
          },
        ],
      },
      {
        name: 'settings',
        label: 'Settings',
        delete: false,
        editor: { preview: false },
        files: [
          {
            file: 'settings/siteMetadata.json',
            label: 'Site Metadata',
            name: 'siteMetadata',
            fields: [
              getMultilingualStringField({ label: 'Site Title', name: 'title' }),
              {
                label: 'Site Url',
                name: 'siteUrl',
                widget: 'string',
              },
              {
                label: 'Site Description',
                name: 'description',
                widget: 'text',
              },
              {
                label: 'Site Creator',
                name: 'siteCreator',
                widget: 'text',
              },
              {
                label: 'Social Media Card',
                name: 'socialMediaCard',
                widget: 'object',
                fields: [
                  {
                    label: 'Image',
                    name: 'image',
                    widget: 'image',
                    required: false,
                  },
                ],
              },
              {
                label: 'Google Analytics Tracking Id',
                name: 'googleTrackingId',
                widget: 'string',
                required: false,
              },
            ],
          },
        ],
      },
    ],
  },
})
