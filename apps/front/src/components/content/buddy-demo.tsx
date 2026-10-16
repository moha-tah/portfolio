'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import type { ContentLang } from '@/lib/content'

import styles from './buddy-demo.module.css'

type Step = [tool: string, arg: string, result: string]
type Scenario = {
  ask: string
  q: string
  steps: Step[]
  a: string
  foot: string
}

// fictional and deliberately generic: no part numbers, manuals or internal references
const SCENARIOS: Record<ContentLang, Scenario[]> = {
  fr: [
    {
      ask: 'Panne récurrente ?',
      q: 'Cette pompe revient encore pour une fuite. C’est un problème récurrent ?',
      steps: [
        [
          'search_history',
          '« fuite pompe »',
          'interventions similaires · recherche hybride + rerank'
        ],
        [
          'check_recurrence',
          'cette pièce · 12 mois',
          '4 retours, dont 3 sur le même joint'
        ],
        [
          'search_docs',
          'documentation · « remplacement du joint »',
          '2 passages pertinents'
        ]
      ],
      a: 'Oui. La pièce est revenue 4 fois en 12 mois, dont 3 fois pour le même joint [Int. 213] [Int. 377] [Int. 502]. La documentation recommande de changer le joint et la bague ensemble [Doc. §4]. Je vous liste les interventions ?',
      foot: 'sources citées'
    },
    {
      ask: 'Historique de la pièce',
      q: 'Résume-moi ce qui a été fait sur cette pièce cette année.',
      steps: [
        ['search_history', 'cette pièce · 12 mois', '6 interventions trouvées'],
        [
          'group_by_type',
          '6 interventions',
          '3 remplacements, 2 contrôles, 1 réparation'
        ]
      ],
      a: 'Six interventions cette année. Trois remplacements du même joint [Int. 213] [Int. 377] [Int. 502], deux contrôles sans anomalie, et une réparation de connecteur [Int. 618]. Le joint est le point à surveiller.',
      foot: 'résumé sourcé'
    },
    {
      ask: 'Valider la remise en service',
      q: 'Tu peux valider la remise en service ?',
      steps: [
        [
          'check_scope',
          'demande · « remise en service »',
          'hors périmètre · réservé à une personne habilitée'
        ],
        ['search_history', 'interventions ouvertes', '1 encore ouverte']
      ],
      a: 'Non. Cette décision revient à une personne habilitée, pas à un assistant. Une intervention est encore ouverte [Int. 502]. Je prépare le récapitulatif pour la personne qui valide ?',
      foot: 'refus expliqué'
    }
  ],
  en: [
    {
      ask: 'Recurring failure?',
      q: 'This pump is back again for a leak. Is it a recurring problem?',
      steps: [
        [
          'search_history',
          '"pump leak"',
          'similar interventions · hybrid search + rerank'
        ],
        [
          'check_recurrence',
          'this part · 12 months',
          '4 returns, 3 of them on the same seal'
        ],
        [
          'search_docs',
          'documentation · "seal replacement"',
          '2 relevant passages'
        ]
      ],
      a: 'Yes. The part came back 4 times in 12 months, 3 times for the same seal [Int. 213] [Int. 377] [Int. 502]. The documentation recommends replacing the seal and the ring together [Doc. §4]. Want me to list the interventions?',
      foot: 'sources cited'
    },
    {
      ask: 'Part history',
      q: 'Summarize what was done on this part this year.',
      steps: [
        ['search_history', 'this part · 12 months', '6 interventions found'],
        [
          'group_by_type',
          '6 interventions',
          '3 replacements, 2 inspections, 1 repair'
        ]
      ],
      a: 'Six interventions this year. Three replacements of the same seal [Int. 213] [Int. 377] [Int. 502], two inspections with nothing found, and one connector repair [Int. 618]. The seal is the thing to watch.',
      foot: 'sourced summary'
    },
    {
      ask: 'Sign off the aircraft',
      q: 'Can you sign off the return to service?',
      steps: [
        [
          'check_scope',
          'request · "return to service"',
          'out of scope · reserved for a certified person'
        ],
        ['search_history', 'open interventions', '1 still open']
      ],
      a: 'No. That decision belongs to a certified person, not to an assistant. One intervention is still open [Int. 502]. Shall I prepare the summary for whoever signs?',
      foot: 'refusal explained'
    }
  ]
}

const UI = {
  fr: {
    title: 'Buddy',
    badge: 'Démo · données fictives',
    thinking: 'Réflexion…',
    tools: 'outils',
    replay: 'Rejouer',
    other: 'Posez une autre question'
  },
  en: {
    title: 'Buddy',
    badge: 'Demo · fictional data',
    thinking: 'Thinking…',
    tools: 'tools',
    replay: 'Replay',
    other: 'Ask something else'
  }
}

type Line = { tool: string; arg: string; result?: string }

export function BuddyDemo({ lang }: { lang: ContentLang }) {
  const list = SCENARIOS[lang]
  const ui = UI[lang]
  const box = useRef<HTMLDivElement>(null)
  const run = useRef(0)
  const [cur, setCur] = useState(0)
  const [lines, setLines] = useState<Line[]>([])
  const [answer, setAnswer] = useState<{ text: string; done: boolean }>({
    text: '',
    done: false
  })
  const [status, setStatus] = useState('—')

  const play = useCallback(
    async (i: number) => {
      const id = ++run.current
      const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
      const wait = (ms: number) =>
        new Promise((r) => setTimeout(r, reduce ? 0 : ms))
      const s = list[i]
      const t0 = performance.now()
      setLines([])
      setAnswer({ text: '', done: false })
      setStatus(ui.thinking)
      for (const [tool, arg, result] of s.steps) {
        setLines((l) => [...l, { tool, arg }])
        await wait(800)
        if (id !== run.current) return
        setLines((l) =>
          l.map((x, k) => (k === l.length - 1 ? { ...x, result } : x))
        )
        await wait(220)
      }
      for (let n = 0; n <= s.a.length; n += 3) {
        if (id !== run.current) return
        setAnswer({ text: s.a.slice(0, n), done: false })
        await wait(16)
      }
      setAnswer({ text: s.a, done: true })
      setStatus(
        `${s.steps.length} ${ui.tools} · ${((performance.now() - t0) / 1000).toFixed(1)} s · ${s.foot}`
      )
    },
    [list, ui]
  )

  // starts the first scenario once the demo is actually on screen
  useEffect(() => {
    const el = box.current
    const runs = run
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          play(0)
          io.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => {
      io.disconnect()
      // bumping the run id stops a typing animation that outlives the component
      runs.current++
    }
  }, [play])

  const renderAnswer = (text: string) =>
    text.split(/(\[[^\]]+\]?)/).map((part, k) =>
      part.startsWith('[') ? (
        <span key={k} className={styles.cite}>
          {part.replace(/[[\]]/g, '')}
        </span>
      ) : (
        part
      )
    )

  return (
    <div ref={box} className={styles.chat}>
      <div className={styles.top}>
        <span className="mono">{ui.title}</span>
        <span className="mono dim">{ui.badge}</span>
      </div>
      <div className={styles.body} aria-live="polite">
        <div className={styles.q}>{list[cur].q}</div>
        <div className={styles.trace}>
          {lines.map((l, k) => (
            <div key={k} className={styles.step}>
              <span className={styles.st}>{l.result ? '✓' : '◌'}</span>
              <b>{l.tool}</b> {l.arg}
              <span className={styles.r}>
                {l.result ? `↳ ${l.result}` : '…'}
              </span>
            </div>
          ))}
        </div>
        <div className={styles.a}>
          {renderAnswer(answer.text)}
          {!answer.done && answer.text && <span className={styles.caret} />}
        </div>
      </div>
      <div className={styles.asks}>
        <span className="mono dim">{ui.other}</span>
        {list.map((s, i) => (
          <button
            key={s.ask}
            aria-pressed={i === cur}
            onClick={() => {
              setCur(i)
              play(i)
            }}
          >
            {s.ask}
          </button>
        ))}
      </div>
      <div className={styles.foot}>
        <span className="mono dim">{status}</span>
        <button className="mono" onClick={() => play(cur)}>
          {ui.replay}
        </button>
      </div>
    </div>
  )
}
