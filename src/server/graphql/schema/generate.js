import fs from 'fs'
import path from 'path'
import { printSchema } from 'graphql/utilities'

import schema from './index'


const SCHEMA_FILE = path.join(__dirname, './generated/schema.graphql')

export function getSchemaString() {
  return printSchema(schema)
}

export function getSchemaStringFromFile() {
  return fs.readFileSync(
    SCHEMA_FILE,
    { encoding: 'utf8' }
  )
}

export function updateSchemaFile() {
  fs.writeFileSync(
    SCHEMA_FILE,
    getSchemaString(),
    { encoding: 'utf8' }
  )
}
