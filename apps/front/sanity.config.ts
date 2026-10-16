'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

import { SANITY_DATASET, SANITY_PROJECT_ID } from './src/sanity/env'
import { schemaTypes } from './src/sanity/schema'

export default defineConfig({
  name: 'portfolio',
  title: 'Mohamed Tahiri',
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  basePath: '/studio',
  plugins: [structureTool()],
  schema: { types: schemaTypes }
})
