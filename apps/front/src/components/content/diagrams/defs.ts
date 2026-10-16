import type { ContentLang } from '@/lib/content'

type L = Record<ContentLang, string>
const l = (fr: string, en: string): L => ({ fr, en })

export type Tone =
  | 'accent'
  | 'ai'
  | 'web'
  | 'infra'
  | 'data'
  | 'motion'
  | 'os'
  | 'mute'

export type DiagramBox = {
  x: number
  y: number
  w?: number
  h?: number
  title: L
  sub?: L
  tone?: Tone
}
export type DiagramFlow = {
  d: string
  kind?: 'main' | 'loop' | 'faint'
  tone?: Tone
}
export type DiagramFrame = {
  x: number
  y: number
  w: number
  h: number
  label: L
}
export type DiagramLabel = {
  x: number
  y: number
  text: L
  tone?: Tone
  anchor?: 'start' | 'middle' | 'end'
}

export type DiagramDef = {
  width: number
  height: number
  aria: L
  note?: L
  frames?: DiagramFrame[]
  flows: DiagramFlow[]
  boxes: DiagramBox[]
  labels?: DiagramLabel[]
}

export type DiagramName =
  | 'buddy'
  | 'agent'
  | 'studio'
  | 'platform'
  | 'sdk'
  | 'rag'

export const DIAGRAMS: Record<DiagramName, DiagramDef> = {
  buddy: {
    width: 1000,
    height: 400,
    aria: l(
      'Schéma : les sources sont découpées et indexées en recherche hybride ; l’agent interroge l’index, reçoit les passages reclassés et répond avec ses sources ; un jeu d’évaluations rejoue des questions de référence à chaque changement.',
      'Diagram: sources are chunked and indexed for hybrid search; the agent queries the index, gets reranked passages back and answers with its sources; an evaluation set replays reference questions on every change.'
    ),
    note: l(
      'Vue simplifiée. Les systèmes internes sont volontairement décrits de façon générique.',
      'Simplified view. Internal systems are deliberately described in generic terms.'
    ),
    flows: [
      { d: 'M180 90 H230' },
      { d: 'M390 90 H440' },
      { d: 'M610 90 H660' },
      { d: 'M500 240 V140' },
      { d: 'M740 140 V195 H570 V240' },
      { d: 'M180 290 H440' },
      { d: 'M610 290 H660' },
      { d: 'M820 290 H845' },
      { d: 'M915 340 V376 H525 V340', kind: 'loop', tone: 'data' }
    ],
    boxes: [
      {
        x: 20,
        y: 40,
        title: l('Sources', 'Sources'),
        sub: l('historique · docs', 'history · docs')
      },
      {
        x: 230,
        y: 40,
        title: l('Ingestion', 'Ingestion'),
        sub: l('découpage · métadonnées', 'chunking · metadata')
      },
      {
        x: 440,
        y: 40,
        w: 170,
        title: l('Index hybride', 'Hybrid index'),
        sub: l('sens + mots-clés', 'meaning + keywords'),
        tone: 'ai'
      },
      {
        x: 660,
        y: 40,
        title: l('Reclassement', 'Reranking'),
        sub: l('meilleurs passages', 'best passages')
      },
      {
        x: 20,
        y: 240,
        title: l('Question', 'Question'),
        sub: l('en langage courant', 'in plain language')
      },
      {
        x: 440,
        y: 240,
        w: 170,
        title: l('Agent', 'Agent'),
        sub: l('outils · recoupement', 'tools · cross-checks'),
        tone: 'accent'
      },
      {
        x: 660,
        y: 240,
        title: l('Réponse sourcée', 'Sourced answer'),
        sub: l('chaque phrase citée', 'every claim cited')
      },
      {
        x: 845,
        y: 240,
        w: 140,
        title: l('Évals', 'Evals'),
        sub: l('questions de réf.', 'reference set'),
        tone: 'data'
      }
    ],
    labels: [
      {
        x: 720,
        y: 394,
        text: l(
          'chaque changement est rejoué sur le jeu d’évals',
          'every change is replayed on the eval set'
        ),
        tone: 'data',
        anchor: 'middle'
      }
    ]
  },

  agent: {
    width: 1000,
    height: 520,
    aria: l(
      'Schéma : une boucle en six étapes, veille, idée, construction, tests, publication et mesure, autour d’un journal de bord ; une validation humaine contrôle le passage de l’idée à la construction.',
      'Diagram: a six-step loop, watch, idea, build, test, publish and measure, around a logbook; a human approval gates the step from idea to build.'
    ),
    flows: [
      { d: 'M585 80 Q655 82 673 135' },
      { d: 'M673 205 V315' },
      { d: 'M673 260 H770', kind: 'loop', tone: 'accent' },
      { d: 'M640 385 Q630 440 585 440' },
      { d: 'M415 440 Q370 440 360 385' },
      { d: 'M327 315 V205' },
      { d: 'M340 135 Q345 82 415 80' },
      { d: 'M500 115 V225', kind: 'faint' },
      { d: 'M500 295 V405', kind: 'faint' },
      { d: 'M415 260 H412 Q360 240 412 205', kind: 'faint' },
      { d: 'M585 260 Q620 240 588 205', kind: 'faint' }
    ],
    boxes: [
      {
        x: 415,
        y: 45,
        w: 170,
        h: 70,
        title: l('Veille', 'Watch'),
        sub: l('marché · demandes', 'market · requests')
      },
      {
        x: 588,
        y: 135,
        w: 170,
        h: 70,
        title: l('Idée', 'Idea'),
        sub: l('proposée par l’agent', 'proposed by the agent')
      },
      {
        x: 588,
        y: 315,
        w: 170,
        h: 70,
        title: l('Construction', 'Build'),
        sub: l('un petit outil', 'a small tool')
      },
      {
        x: 415,
        y: 405,
        w: 170,
        h: 70,
        title: l('Tests', 'Tests'),
        sub: l('avant toute publication', 'before any release')
      },
      {
        x: 242,
        y: 315,
        w: 170,
        h: 70,
        title: l('Publication', 'Publish'),
        sub: l('place de marché', 'marketplace')
      },
      {
        x: 242,
        y: 135,
        w: 170,
        h: 70,
        title: l('Mesure', 'Measure'),
        sub: l('usage · revenus', 'usage · revenue')
      },
      {
        x: 415,
        y: 225,
        w: 170,
        h: 70,
        title: l('Journal', 'Logbook'),
        sub: l('la mémoire de l’agent', 'the agent’s memory'),
        tone: 'ai'
      },
      {
        x: 770,
        y: 225,
        w: 200,
        h: 70,
        title: l('Humain', 'Human'),
        sub: l('valide chaque dépense', 'approves every spend'),
        tone: 'accent'
      }
    ]
  },

  studio: {
    width: 1000,
    height: 330,
    aria: l(
      'Schéma : une seule commande enchaîne questions, script, voix, scènes, rendu et publication, avec la charte graphique injectée dans les scènes, le tout sur un poste verrouillé.',
      'Diagram: a single command chains questions, script, voice, scenes, render and publish, with the brand kit fed into the scenes, all on a locked-down workstation.'
    ),
    frames: [
      {
        x: 8,
        y: 20,
        w: 984,
        h: 196,
        label: l(
          'poste verrouillé · sans droits administrateur',
          'locked-down workstation · no admin rights'
        )
      }
    ],
    flows: [
      { d: 'M160 110 H186' },
      { d: 'M326 110 H352' },
      { d: 'M492 110 H518' },
      { d: 'M658 110 H684' },
      { d: 'M824 110 H850' },
      { d: 'M588 270 V150', kind: 'loop', tone: 'motion' }
    ],
    boxes: [
      {
        x: 20,
        y: 70,
        w: 140,
        h: 80,
        title: l('Questions', 'Questions'),
        sub: l('posées par Claude', 'asked by Claude'),
        tone: 'accent'
      },
      {
        x: 186,
        y: 70,
        w: 140,
        h: 80,
        title: l('Script', 'Script'),
        sub: l('écrit et relu', 'written, reviewed')
      },
      {
        x: 352,
        y: 70,
        w: 140,
        h: 80,
        title: l('Voix', 'Voice'),
        sub: l('synthèse locale', 'local TTS')
      },
      {
        x: 518,
        y: 70,
        w: 140,
        h: 80,
        title: l('Scènes', 'Scenes'),
        sub: l('React · Remotion', 'React · Remotion'),
        tone: 'motion'
      },
      {
        x: 684,
        y: 70,
        w: 140,
        h: 80,
        title: l('Rendu', 'Render'),
        sub: l('vidéo + musique', 'video + music')
      },
      {
        x: 850,
        y: 70,
        w: 130,
        h: 80,
        title: l('Publication', 'Publish'),
        sub: l('partage interne', 'internal share')
      },
      {
        x: 488,
        y: 250,
        w: 200,
        h: 70,
        title: l('Charte graphique', 'Brand kit'),
        sub: l('couleurs · logos · polices', 'colors · logos · fonts')
      }
    ]
  },

  platform: {
    width: 1000,
    height: 420,
    aria: l(
      'Schéma : le site Next.js et les apps iOS et Android partagent une base de code et appellent une API NestJS, qui s’appuie sur Supabase et Algolia ; toute l’infrastructure est décrite en Terraform sur GCP, et la CI déploie le web et publie les apps.',
      'Diagram: the Next.js site and the iOS and Android apps share one codebase and call a NestJS API backed by Supabase and Algolia; the whole infrastructure is described in Terraform on GCP, and CI deploys the web and publishes the apps.'
    ),
    frames: [
      {
        x: 300,
        y: 16,
        w: 692,
        h: 300,
        label: l('GCP · Terraform + Terragrunt', 'GCP · Terraform + Terragrunt')
      }
    ],
    flows: [
      { d: 'M190 80 Q260 80 330 160' },
      { d: 'M190 190 H330' },
      { d: 'M190 300 Q260 300 330 220' },
      { d: 'M500 175 Q560 120 620 110' },
      { d: 'M500 205 Q560 250 620 250' },
      { d: 'M720 150 V210', kind: 'loop', tone: 'data' },
      { d: 'M905 300 V392 H105 V340', kind: 'loop', tone: 'accent' }
    ],
    boxes: [
      {
        x: 20,
        y: 40,
        w: 170,
        h: 80,
        title: l('Site web', 'Website'),
        sub: l('Next.js', 'Next.js'),
        tone: 'web'
      },
      {
        x: 20,
        y: 150,
        w: 170,
        h: 80,
        title: l('App iOS', 'iOS app'),
        sub: l('Capacitor', 'Capacitor'),
        tone: 'web'
      },
      {
        x: 20,
        y: 260,
        w: 170,
        h: 80,
        title: l('App Android', 'Android app'),
        sub: l('Capacitor', 'Capacitor'),
        tone: 'web'
      },
      {
        x: 330,
        y: 150,
        w: 170,
        h: 80,
        title: l('API', 'API'),
        sub: l('NestJS', 'NestJS'),
        tone: 'accent'
      },
      {
        x: 620,
        y: 70,
        w: 200,
        h: 80,
        title: l('Base de données', 'Database'),
        sub: l('Supabase · Postgres · auth', 'Supabase · Postgres · auth'),
        tone: 'data'
      },
      {
        x: 620,
        y: 210,
        w: 200,
        h: 80,
        title: l('Recherche', 'Search'),
        sub: l('Algolia · par lieu', 'Algolia · by location'),
        tone: 'data'
      },
      {
        x: 840,
        y: 220,
        w: 130,
        h: 80,
        title: l('CI', 'CI'),
        sub: l('e2e · stores', 'e2e · stores'),
        tone: 'infra'
      }
    ],
    labels: [
      {
        x: 500,
        y: 410,
        text: l(
          'chaque version est testée, déployée et publiée sur les stores',
          'every version is tested, deployed and published to the stores'
        ),
        tone: 'accent',
        anchor: 'middle'
      }
    ]
  },

  sdk: {
    width: 1000,
    height: 400,
    aria: l(
      'Schéma : une spec OpenAPI est vérifiée en CI contre l’API réelle, puis sert à générer deux SDK typés, publiés sur PyPI et npm ; le SDK Python alimente l’intégration Home Assistant.',
      'Diagram: an OpenAPI spec is checked in CI against the real API, then used to generate two typed SDKs published to PyPI and npm; the Python SDK powers the Home Assistant integration.'
    ),
    flows: [
      { d: 'M105 120 V230', kind: 'loop', tone: 'data' },
      { d: 'M190 270 H280' },
      { d: 'M450 255 Q500 160 540 150' },
      { d: 'M450 285 Q500 330 540 330' },
      { d: 'M710 150 H800' },
      { d: 'M710 330 H800' },
      { d: 'M625 110 V70 H800', kind: 'faint' }
    ],
    boxes: [
      {
        x: 20,
        y: 40,
        w: 170,
        h: 80,
        title: l('API réelle', 'Real API'),
        sub: l('réponses de prod', 'production responses')
      },
      {
        x: 20,
        y: 230,
        w: 170,
        h: 80,
        title: l('Spec OpenAPI', 'OpenAPI spec'),
        sub: l('la source de vérité', 'the source of truth'),
        tone: 'accent'
      },
      {
        x: 280,
        y: 230,
        w: 170,
        h: 80,
        title: l('Génération', 'Codegen'),
        sub: l('types · clients', 'types · clients')
      },
      {
        x: 540,
        y: 110,
        w: 170,
        h: 80,
        title: l('SDK Python', 'Python SDK'),
        sub: l('sync + async', 'sync + async'),
        tone: 'os'
      },
      {
        x: 540,
        y: 290,
        w: 170,
        h: 80,
        title: l('SDK TypeScript', 'TypeScript SDK'),
        sub: l('typé de bout en bout', 'typed end to end'),
        tone: 'os'
      },
      {
        x: 800,
        y: 110,
        w: 180,
        h: 80,
        title: l('PyPI', 'PyPI'),
        sub: l('publié à chaque release', 'published on release')
      },
      {
        x: 800,
        y: 290,
        w: 180,
        h: 80,
        title: l('npm', 'npm'),
        sub: l('publié à chaque release', 'published on release')
      },
      {
        x: 800,
        y: 20,
        w: 180,
        h: 70,
        title: l('Home Assistant', 'Home Assistant'),
        sub: l('intégration', 'integration'),
        tone: 'data'
      }
    ],
    labels: [
      {
        x: 118,
        y: 180,
        text: l('vérifiée en CI', 'checked in CI'),
        tone: 'data',
        anchor: 'start'
      }
    ]
  },

  rag: {
    width: 1000,
    height: 380,
    aria: l(
      'Schéma : les documents sont découpés, puis indexés deux fois, par le sens avec des embeddings et par les mots avec BM25 ; les deux classements sont fusionnés, reclassés, puis envoyés au modèle qui rédige une réponse avec ses sources.',
      'Diagram: documents are chunked, then indexed twice, by meaning with embeddings and by words with BM25; both rankings are fused, reranked, then sent to the model, which writes an answer with its sources.'
    ),
    flows: [
      { d: 'M160 190 H200' },
      { d: 'M340 175 Q380 100 420 95' },
      { d: 'M340 205 Q380 280 420 285' },
      { d: 'M580 95 Q620 100 650 170' },
      { d: 'M580 285 Q620 280 650 210' },
      { d: 'M790 190 H820' },
      { d: 'M900 230 V300' }
    ],
    boxes: [
      {
        x: 20,
        y: 150,
        w: 140,
        h: 80,
        title: l('Documents', 'Documents'),
        sub: l('pdf · pages · tickets', 'pdf · pages · tickets')
      },
      {
        x: 200,
        y: 150,
        w: 140,
        h: 80,
        title: l('Découpage', 'Chunking'),
        sub: l('passages', 'passages')
      },
      {
        x: 420,
        y: 55,
        w: 160,
        h: 80,
        title: l('Sens', 'Meaning'),
        sub: l('embeddings', 'embeddings'),
        tone: 'ai'
      },
      {
        x: 420,
        y: 245,
        w: 160,
        h: 80,
        title: l('Mots', 'Words'),
        sub: l('BM25', 'BM25'),
        tone: 'os'
      },
      {
        x: 650,
        y: 150,
        w: 140,
        h: 80,
        title: l('Fusion', 'Fusion'),
        sub: l('RRF', 'RRF'),
        tone: 'accent'
      },
      {
        x: 820,
        y: 150,
        w: 160,
        h: 80,
        title: l('Reclassement', 'Reranking'),
        sub: l('cross-encoder', 'cross-encoder')
      },
      {
        x: 820,
        y: 300,
        w: 160,
        h: 70,
        title: l('Réponse', 'Answer'),
        sub: l('avec ses sources', 'with its sources')
      }
    ]
  }
}
