import { defineArrayMember, defineField, defineType } from 'sanity'

const slug = defineField({
  name: 'slug',
  title: 'Slug',
  type: 'slug',
  options: { source: 'title.fr' },
  validation: (r) => r.required()
})

export const post = defineType({
  name: 'post',
  title: 'Article',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'localeString',
      validation: (r) => r.required()
    }),
    slug,
    defineField({
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
      validation: (r) => r.required()
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          { title: 'IA', value: 'ai' },
          { title: 'Produit', value: 'product' },
          { title: 'Infra', value: 'infra' },
          { title: 'Data', value: 'data' },
          { title: 'Motion', value: 'motion' }
        ]
      },
      validation: (r) => r.required()
    }),
    defineField({
      name: 'excerpt',
      title: 'Chapô',
      type: 'localeText',
      validation: (r) => r.required()
    }),
    defineField({ name: 'body', title: 'Contenu', type: 'localeRichText' })
  ],
  orderings: [
    {
      title: 'Plus récents',
      name: 'recent',
      by: [{ field: 'publishedAt', direction: 'desc' }]
    }
  ],
  preview: { select: { title: 'title.fr', subtitle: 'publishedAt' } }
})

export const project = defineType({
  name: 'project',
  title: 'Projet',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom affiché',
      type: 'localeString',
      validation: (r) => r.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name.fr' },
      validation: (r) => r.required()
    }),
    defineField({
      name: 'order',
      title: 'Ordre',
      type: 'number',
      validation: (r) => r.required().integer().min(1)
    }),
    defineField({
      name: 'kind',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Pro', value: 'pro' },
          { title: 'Perso', value: 'personal' },
          { title: 'Open source', value: 'openSource' }
        ],
        layout: 'radio'
      }
    }),
    defineField({
      name: 'year',
      title: 'Années',
      type: 'string',
      description: 'Par exemple « 2024 → »'
    }),
    defineField({
      name: 'summary',
      title: 'Résumé (carte)',
      type: 'localeText'
    }),
    defineField({
      name: 'tldr',
      title: 'En une phrase (étude de cas)',
      type: 'localeText'
    }),
    defineField({
      name: 'tags',
      title: 'Étiquettes',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: {
        list: [
          'agents',
          'rag',
          'evals',
          'automation',
          'claudeCode',
          'remotion',
          'tts',
          'product',
          'infra',
          'openSource',
          'python',
          'typescript'
        ]
      }
    }),
    defineField({
      name: 'mock',
      title: 'Visuel',
      type: 'string',
      options: {
        list: [
          { title: 'Conversation', value: 'chat' },
          { title: 'Tableau de bord', value: 'dash' },
          { title: 'Vidéo', value: 'video' },
          { title: 'Recherche + carte', value: 'search' },
          { title: 'Paquets', value: 'packages' }
        ]
      }
    }),
    defineField({
      name: 'stack',
      title: 'Stack',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' }
    }),
    defineField({
      name: 'meta',
      title: 'Fiche (rôle, période…)',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Libellé',
              type: 'localeString'
            }),
            defineField({
              name: 'value',
              title: 'Valeur',
              type: 'localeString'
            })
          ],
          preview: { select: { title: 'label.fr', subtitle: 'value.fr' } }
        })
      ]
    }),
    defineField({ name: 'body', title: 'Étude de cas', type: 'localeRichText' })
  ],
  orderings: [
    {
      title: 'Ordre',
      name: 'order',
      by: [{ field: 'order', direction: 'asc' }]
    }
  ],
  preview: { select: { title: 'name.fr', subtitle: 'year' } }
})
