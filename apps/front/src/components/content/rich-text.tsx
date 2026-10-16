import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { highlight } from 'sugar-high'

import type { PT, PTTextBlock } from '@/content/pt'
import { Link } from '@/i18n/navigation'
import type { ContentLang } from '@/lib/content'

import { BuddyDemo } from './buddy-demo'
import type { DiagramName } from './diagrams/defs'
import { FlowDiagram } from './diagrams/flow-diagram'
import { Interactive, type InteractiveName } from './interactive'
import styles from './rich-text.module.css'

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

const textOf = (b: PTTextBlock) => b.children.map((c) => c.text).join('')

/** Table of contents from the h2 blocks, with the same ids the renderer gives them. */
export const headingsOf = (body: PT) =>
  body
    .filter(
      (b): b is PTTextBlock =>
        b._type === 'block' && (b as PTTextBlock).style === 'h2'
    )
    .map((b) => ({ id: slugify(textOf(b)), text: textOf(b) }))

type Item = {
  _key: string
  title?: string
  text?: string
  value?: string
  label?: string
}

const components = (lang: ContentLang): PortableTextComponents => ({
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h2: ({ children, value }) => (
      <h2 id={slugify(textOf(value as PTTextBlock))}>{children}</h2>
    ),
    h3: ({ children }) => <h3>{children}</h3>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>
  },
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
    number: ({ children }) => <ol>{children}</ol>
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => (
      <code className={styles.inlineCode}>{children}</code>
    ),
    link: ({ children, value }) => {
      const href: string = value?.href ?? '#'
      return href.startsWith('/') ? (
        <Link href={href}>{children}</Link>
      ) : (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      )
    }
  },
  types: {
    diagram: ({ value }) => (
      <div className={styles.wide}>
        <FlowDiagram name={value.name as DiagramName} lang={lang} />
      </div>
    ),
    buddyDemo: () => (
      <div className={styles.media}>
        <BuddyDemo lang={lang} />
      </div>
    ),
    interactive: ({ value }) => (
      <div className={styles.wide}>
        <Interactive name={value.name as InteractiveName} lang={lang} />
      </div>
    ),
    decisions: ({ value }) => (
      <div className={styles.cards}>
        {(value.items as Item[]).map((it) => (
          <div key={it._key}>
            <b>{it.title}</b>
            <p>{it.text}</p>
          </div>
        ))}
      </div>
    ),
    stats: ({ value }) => (
      <dl className={styles.stats}>
        {(value.items as Item[]).map((it) => (
          <div key={it._key}>
            <dt>{it.label}</dt>
            <dd>{it.value}</dd>
          </div>
        ))}
      </dl>
    ),
    callout: ({ value }) => (
      <aside className={styles.callout} data-tone={value.tone}>
        <PortableText value={value.body} components={components(lang)} />
      </aside>
    ),
    codeBlock: ({ value }) => (
      <figure className={styles.code}>
        {value.filename && (
          <figcaption className="mono dim">{value.filename}</figcaption>
        )}
        <pre>
          <code
            dangerouslySetInnerHTML={{ __html: highlight(value.code ?? '') }}
          />
        </pre>
      </figure>
    )
  }
})

export function RichText({ value, lang }: { value: PT; lang: ContentLang }) {
  return (
    <div className={styles.prose} lang={lang}>
      <PortableText value={value as never} components={components(lang)} />
    </div>
  )
}
