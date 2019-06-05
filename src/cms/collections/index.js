import {
  getMultilingualStringField,
  slugField,
  nameField,
  titleField,
  bodyField,
} from './fields'

export default [
  {
    name: 'productCategories',
    label: 'Product Categories',
    editor: { preview: true },
    folder: 'content/productCategories',
    identifier_field: 'slug',
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
    identifier_field: 'slug',
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
      {
        label: 'Categories',
        name: 'categories',
        file: 'content/pages/categories.md',
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
            name: 'author',
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
]
