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
export const getMultilingualStringField = ({ label, name }) => ({
  label,
  name,
  widget: 'object',
  fields: LANGUAGES.map((language) => ({
    label: language.label,
    name: language.key,
    widget: 'string',
  })),
})

export const slugField = {
  label: 'Slug',
  name: 'slug',
  widget: 'string',
}
export const nameField = {
  label: 'Name',
  name: 'name',
  widget: 'string',
}
export const titleField = {
  label: 'Title',
  name: 'title',
  widget: 'string',
}
export const bodyField = {
  label: 'Body',
  name: 'body',
  widget: 'markdown',
}
