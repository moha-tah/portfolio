import { defineArrayMember, defineField, defineType } from 'sanity'

import { INTERACTIVE_LABELS } from './labels'

/** The rich text used by articles and case studies: text plus the site's custom blocks. */
export const richText = defineType({
  name: 'richText',
  title: 'Texte riche',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Paragraphe', value: 'normal' },
        { title: 'Titre 2', value: 'h2' },
        { title: 'Titre 3', value: 'h3' },
        { title: 'Citation', value: 'blockquote' }
      ],
      lists: [
        { title: 'Puces', value: 'bullet' },
        { title: 'Numérotée', value: 'number' }
      ],
      marks: {
        decorators: [
          { title: 'Gras', value: 'strong' },
          { title: 'Italique', value: 'em' },
          { title: 'Code', value: 'code' }
        ],
        annotations: [
          defineArrayMember({
            name: 'link',
            title: 'Lien',
            type: 'object',
            fields: [
              defineField({
                name: 'href',
                title: 'URL ou chemin (/blog/…)',
                type: 'string',
                validation: (r) => r.required()
              })
            ]
          })
        ]
      }
    }),
    defineArrayMember({ type: 'diagram' }),
    defineArrayMember({ type: 'interactive' }),
    defineArrayMember({ type: 'buddyDemo' }),
    defineArrayMember({ type: 'decisions' }),
    defineArrayMember({ type: 'stats' }),
    defineArrayMember({ type: 'callout' }),
    defineArrayMember({ type: 'codeBlock' })
  ]
})

export const diagram = defineType({
  name: 'diagram',
  title: 'Schéma',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Schéma',
      type: 'string',
      options: {
        list: [
          { title: 'Architecture de Buddy', value: 'buddy' },
          { title: 'Boucle de l’agent', value: 'agent' },
          { title: 'Pipeline Studio', value: 'studio' },
          { title: 'Plateforme de cours', value: 'platform' },
          { title: 'SDK et spec', value: 'sdk' },
          { title: 'Pipeline RAG', value: 'rag' }
        ]
      },
      validation: (r) => r.required()
    })
  ],
  preview: {
    select: { title: 'name' },
    prepare: ({ title }) => ({ title: `Schéma · ${title}` })
  }
})

export const interactive = defineType({
  name: 'interactive',
  title: 'Simulation interactive',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Simulation',
      type: 'string',
      options: {
        list: Object.entries(INTERACTIVE_LABELS).map(([value, title]) => ({
          title,
          value
        }))
      },
      validation: (r) => r.required()
    })
  ],
  preview: {
    select: { title: 'name' },
    prepare: ({ title }) => ({
      title: `Simulation · ${INTERACTIVE_LABELS[title as keyof typeof INTERACTIVE_LABELS] ?? title}`
    })
  }
})

export const buddyDemo = defineType({
  name: 'buddyDemo',
  title: 'Démo Buddy',
  type: 'object',
  // Sanity objects need a field; this one only documents what the block renders
  fields: [
    defineField({
      name: 'note',
      title: 'Note interne',
      type: 'string',
      initialValue: 'Conversation fictive et générique'
    })
  ],
  preview: { prepare: () => ({ title: 'Démo Buddy (conversation fictive)' }) }
})

export const decisions = defineType({
  name: 'decisions',
  title: 'Décisions',
  type: 'object',
  fields: [
    defineField({
      name: 'items',
      title: 'Cartes',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Titre', type: 'string' }),
            defineField({ name: 'text', title: 'Texte', type: 'text', rows: 3 })
          ]
        })
      ],
      validation: (r) => r.min(1).max(4)
    })
  ],
  preview: {
    select: { items: 'items' },
    prepare: ({ items }) => ({ title: `Décisions · ${items?.length ?? 0}` })
  }
})

export const stats = defineType({
  name: 'stats',
  title: 'Chiffres',
  type: 'object',
  fields: [
    defineField({
      name: 'items',
      title: 'Chiffres',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'value', title: 'Valeur', type: 'string' }),
            defineField({ name: 'label', title: 'Légende', type: 'string' })
          ]
        })
      ],
      validation: (r) => r.min(1).max(4)
    })
  ],
  preview: {
    select: { items: 'items' },
    prepare: ({ items }) => ({
      title: `Chiffres · ${items?.map((i: { value: string }) => i.value).join(' / ') ?? ''}`
    })
  }
})

export const callout = defineType({
  name: 'callout',
  title: 'Encadré',
  type: 'object',
  fields: [
    defineField({
      name: 'tone',
      title: 'Ton',
      type: 'string',
      options: { list: ['note', 'tip', 'warn'], layout: 'radio' },
      initialValue: 'note'
    }),
    defineField({
      name: 'body',
      title: 'Texte',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [{ title: 'Paragraphe', value: 'normal' }],
          lists: []
        })
      ]
    })
  ],
  preview: {
    select: { tone: 'tone' },
    prepare: ({ tone }) => ({ title: `Encadré · ${tone}` })
  }
})

export const codeBlock = defineType({
  name: 'codeBlock',
  title: 'Code',
  type: 'object',
  fields: [
    defineField({ name: 'filename', title: 'Nom de fichier', type: 'string' }),
    defineField({
      name: 'language',
      title: 'Langage',
      type: 'string',
      options: {
        list: ['python', 'typescript', 'javascript', 'bash', 'json', 'sql']
      }
    }),
    defineField({
      name: 'code',
      title: 'Code',
      type: 'text',
      rows: 12,
      validation: (r) => r.required()
    })
  ],
  preview: { select: { title: 'filename', subtitle: 'language' } }
})

export const localeString = defineType({
  name: 'localeString',
  title: 'Texte FR / EN',
  type: 'object',
  fields: [
    defineField({ name: 'fr', title: 'Français', type: 'string' }),
    defineField({ name: 'en', title: 'English', type: 'string' })
  ]
})

export const localeText = defineType({
  name: 'localeText',
  title: 'Paragraphe FR / EN',
  type: 'object',
  fields: [
    defineField({ name: 'fr', title: 'Français', type: 'text', rows: 3 }),
    defineField({ name: 'en', title: 'English', type: 'text', rows: 3 })
  ]
})

export const localeRichText = defineType({
  name: 'localeRichText',
  title: 'Contenu FR / EN',
  type: 'object',
  fields: [
    defineField({ name: 'fr', title: 'Français', type: 'richText' }),
    defineField({ name: 'en', title: 'English', type: 'richText' })
  ]
})
