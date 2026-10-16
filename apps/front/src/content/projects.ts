import { type Localized, type PT, builder } from './pt'

export type ProjectKind = 'pro' | 'personal' | 'openSource'
export type MockKind = 'chat' | 'dash' | 'video' | 'search' | 'packages'
export type TagKey =
  | 'agents'
  | 'rag'
  | 'evals'
  | 'automation'
  | 'claudeCode'
  | 'remotion'
  | 'tts'
  | 'product'
  | 'infra'
  | 'openSource'
  | 'python'
  | 'typescript'

export type Project = {
  slug: string
  order: number
  kind: ProjectKind
  year: string
  name: Localized<string>
  summary: Localized<string>
  tldr: Localized<string>
  /** keys of the `tags` messages namespace */
  tags: TagKey[]
  mock: MockKind
  stack: string[]
  meta: { _key: string; label: Localized<string>; value: Localized<string> }[]
  body: Localized<PT>
}

const meta = (rows: [string, string, string, string][]) =>
  rows.map(([lfr, len, vfr, ven], i) => ({
    _key: `m${i}`,
    label: { fr: lfr, en: len },
    value: { fr: vfr, en: ven }
  }))

const items = <T extends object>(list: T[]) =>
  list.map((x, i) => ({ _key: `i${i}`, ...x }))

/* ---------------- Buddy ---------------- */

const bf = builder('buddyfr')
const be = builder('buddyen')

const buddy: Project = {
  slug: 'buddy',
  order: 1,
  kind: 'pro',
  year: '2026',
  name: { fr: 'Buddy', en: 'Buddy' },
  summary: {
    fr: 'Un agent IA en production pour des équipes de maintenance : recherche hybride, outils, réponses sourcées, évaluations en continu.',
    en: 'An AI agent in production for maintenance teams: hybrid search, tools, sourced answers, continuous evaluation.'
  },
  tldr: {
    fr: 'Les équipes de maintenance perdaient du temps à chercher dans l’historique et la documentation. Buddy répond en langage courant, recoupe les sources et cite chaque affirmation. Je l’ai conçu, construit et mis en production seul.',
    en: 'Maintenance teams were losing time digging through history and documentation. Buddy answers in plain language, cross-checks its sources and cites every claim. I designed, built and shipped it on my own.'
  },
  tags: ['agents', 'rag', 'evals'],
  mock: 'chat',
  stack: [
    'Claude',
    'Qdrant',
    'Voyage AI',
    'Chainlit',
    'PostgreSQL',
    'Docker',
    'Terraform',
    'Ansible',
    'GitHub Actions'
  ],
  meta: meta([
    [
      'Rôle',
      'Role',
      'Conception, développement, mise en production',
      'Design, development, deployment'
    ],
    ['Équipe', 'Team', 'Seul', 'Solo'],
    ['Période', 'Period', '2026 →', '2026 →'],
    ['Pour', 'For', 'Équipes de maintenance', 'Maintenance teams']
  ]),
  body: {
    fr: [
      bf.h2('Le problème'),
      bf.p(
        'Dans un atelier, l’information existe presque toujours. Elle est simplement éclatée : historique des interventions, documentation technique, référentiels internes, chacun avec son outil et sa façon de chercher. Trouver la bonne réponse demande de savoir où regarder, et avec quels mots.'
      ),
      bf.p(
        'Un assistant qui invente est pire que pas d’assistant du tout. Une réponse sans source ne vaut guère mieux : personne ne valide une intervention sur la foi d’un paragraphe sorti de nulle part. Le cahier des charges tenait donc en une ligne : **chaque phrase doit pouvoir être vérifiée.**'
      ),
      bf.h2('L’architecture'),
      bf.obj('diagram', { name: 'buddy' }),
      bf.p(
        'Les documents sont découpés, enrichis de métadonnées et indexés deux fois : une fois par le sens, une fois par les mots exacts. L’agent interroge cet index avec ses propres outils, reçoit les meilleurs passages après reclassement, et ne répond qu’avec ce qu’il peut citer.'
      ),
      bf.h2('Trois décisions'),
      bf.obj('decisions', {
        items: items([
          {
            title: 'Hybride plutôt que tout vectoriel',
            text: 'Les références exactes se perdent en recherche sémantique pure. Combiner le sens et les mots-clés, puis reclasser, a réglé la plupart des ratés.'
          },
          {
            title: 'Un agent avec des outils',
            text: 'Plutôt qu’un prompt géant, l’agent choisit ses outils : chercher, recouper, résumer. Chaque étape est visible et testable séparément.'
          },
          {
            title: 'Des évals dans la CI',
            text: 'Un jeu de questions de référence tourne à chaque changement. On sait tout de suite si une modification améliore ou dégrade les réponses.'
          }
        ])
      }),
      bf.h2('À quoi ça ressemble'),
      bf.obj('buddyDemo'),
      bf.h2('Ce que je mesure'),
      bf.p(
        'Avant chaque mise en production, un jeu de questions de référence est rejoué automatiquement. Pour chacune, on sait quelle source doit sortir et ce que la réponse doit contenir. Si une modification fait baisser le score, elle ne part pas.'
      ),
      bf.p(
        'Ce jeu grossit avec l’usage : quand quelqu’un signale une mauvaise réponse, elle devient un nouveau cas de test. C’est la partie la moins visible du projet, et celle qui m’a fait gagner le plus de temps.'
      ),
      bf.callout(
        'note',
        'Pour comprendre pourquoi la recherche hybride change tout, j’ai écrit un article avec un terrain de jeu interactif : [La recherche hybride, expliquée en jouant](/blog/recherche-hybride).'
      ),
      bf.h2('Ce que j’en retiens'),
      bf.p(
        'Le modèle compte moins qu’on ne le croit. Ce qui fait la différence, c’est la qualité de la recherche et la discipline d’évaluation. Et la confiance vient des sources affichées, pas du ton assuré de la réponse.'
      )
    ],
    en: [
      be.h2('The problem'),
      be.p(
        'In a maintenance shop, the information almost always exists. It is just scattered: intervention history, technical documentation, internal references, each with its own tool and its own way of searching. Finding the right answer means knowing where to look, and which words to use.'
      ),
      be.p(
        'An assistant that makes things up is worse than no assistant. An answer without a source is not much better: nobody signs off on a job because of a paragraph that came from nowhere. So the spec fit on one line: **every sentence must be verifiable.**'
      ),
      be.h2('Architecture'),
      be.obj('diagram', { name: 'buddy' }),
      be.p(
        'Documents are chunked, enriched with metadata and indexed twice: once by meaning, once by exact words. The agent queries that index with its own tools, gets the best passages back after reranking, and only answers with what it can cite.'
      ),
      be.h2('Three decisions'),
      be.obj('decisions', {
        items: items([
          {
            title: 'Hybrid over pure vectors',
            text: 'Exact references get lost in pure semantic search. Combining meaning and keywords, then reranking, fixed most of the misses.'
          },
          {
            title: 'An agent with tools',
            text: 'Instead of one giant prompt, the agent picks its tools: search, cross-check, summarize. Every step is visible and can be tested on its own.'
          },
          {
            title: 'Evals in CI',
            text: 'A set of reference questions runs on every change. We know right away whether a change makes answers better or worse.'
          }
        ])
      }),
      be.h2('What it looks like'),
      be.obj('buddyDemo'),
      be.h2('What I measure'),
      be.p(
        'Before every release, a set of reference questions is replayed automatically. For each one, we know which source should come out and what the answer must contain. If a change lowers the score, it doesn’t ship.'
      ),
      be.p(
        'The set grows with usage: when someone flags a bad answer, it becomes a new test case. It is the least visible part of the project, and the one that saved me the most time.'
      ),
      be.callout(
        'note',
        'To see why hybrid search changes everything, I wrote an article with an interactive playground: [Hybrid search, explained by playing with it](/blog/recherche-hybride).'
      ),
      be.h2('What I took away'),
      be.p(
        'The model matters less than people think. What makes the difference is the quality of retrieval and the discipline of evaluation. And trust comes from the sources on screen, not from how confident the answer sounds.'
      )
    ]
  }
}

/* ---------------- Agent entrepreneur ---------------- */

const af = builder('agentfr')
const ae = builder('agenten')

const agent: Project = {
  slug: 'agent-entrepreneur',
  order: 2,
  kind: 'personal',
  year: '2026',
  name: { fr: 'Agent entrepreneur', en: 'Agent entrepreneur' },
  summary: {
    fr: 'Une expérience : un agent IA fait tourner une petite activité en ligne, et un humain garde la main sur chaque décision.',
    en: 'An experiment: an AI agent runs a small online business, and a human keeps the final say on every decision.'
  },
  tldr: {
    fr: 'Je voulais savoir jusqu’où un agent peut aller seul quand on lui confie une vraie petite activité. Il cherche des idées, construit de petits outils, les publie et surveille ce qui marche. Tout ce qui engage de l’argent passe par moi.',
    en: 'I wanted to see how far an agent can go on its own when you hand it a real, small business. It looks for ideas, builds small tools, publishes them and watches what works. Anything that costs money goes through me.'
  },
  tags: ['agents', 'automation'],
  mock: 'dash',
  stack: ['Python', 'Apify', 'n8n', 'pytest'],
  meta: meta([
    ['Rôle', 'Role', 'Tout', 'Everything'],
    ['Statut', 'Status', 'Expérience en cours', 'Ongoing experiment'],
    ['Garde-fou', 'Guardrail', 'Un humain valide', 'A human approves'],
    ['Stack', 'Stack', 'Python, Apify, n8n', 'Python, Apify, n8n']
  ]),
  body: {
    fr: [
      af.h2('L’idée'),
      af.p(
        'La plupart des démos d’agents s’arrêtent au moment où ça devient intéressant : quand il faut tenir dans la durée, encaisser des erreurs et rendre des comptes. J’ai donc donné à un agent un cadre réel, avec un budget, des outils et un journal de bord.'
      ),
      af.h2('La boucle'),
      af.obj('diagram', { name: 'agent' }),
      af.p(
        'Chaque jour, l’agent repart de son journal : ce qui a été publié, ce qui rapporte, ce qui casse. Il propose la suite. Les décisions qui coûtent quelque chose attendent ma validation, le reste avance seul.'
      ),
      af.h2('Ce qu’il a produit'),
      af.obj('stats', {
        items: items([
          { value: '7', label: 'outils publiés sur une place de marché' },
          { value: '117', label: 'tests automatisés' },
          { value: '1', label: 'contrôle de santé chaque jour' }
        ])
      }),
      af.p(
        'Des outils de collecte et d’automatisation, un pack de modèles pour un outil d’automatisation, et une veille de marché. Rien de spectaculaire côté chiffre d’affaires, et ce n’était pas le but : je voulais voir où l’autonomie casse.'
      ),
      af.h2('Les garde-fous'),
      af.p(
        'Un agent qui publie sans tests finit par publier n’importe quoi. Chaque outil a donc ses tests, un contrôle de santé tourne tous les matins, et une porte de décision bloque toute dépense sans mon accord.'
      ),
      af.h2('Ce que j’en retiens'),
      af.p(
        'L’autonomie se gagne par paliers. Plus le journal est précis, meilleures sont les décisions de l’agent. La vraie difficulté n’est pas de le faire agir, c’est de savoir quand l’arrêter.'
      )
    ],
    en: [
      ae.h2('The idea'),
      ae.p(
        'Most agent demos stop right where things get interesting: when you have to keep going over time, absorb mistakes and report back. So I gave an agent a real setting, with a budget, tools and a logbook.'
      ),
      ae.h2('The loop'),
      ae.obj('diagram', { name: 'agent' }),
      ae.p(
        'Every day, the agent starts from its logbook: what was published, what earns money, what breaks. It proposes what comes next. Decisions that cost something wait for my approval; the rest moves on its own.'
      ),
      ae.h2('What it produced'),
      ae.obj('stats', {
        items: items([
          { value: '7', label: 'tools published on a marketplace' },
          { value: '117', label: 'automated tests' },
          { value: '1', label: 'health check every day' }
        ])
      }),
      ae.p(
        'Scraping and automation tools, a template pack for an automation platform, and market monitoring. Nothing spectacular revenue-wise, and that was never the point: I wanted to see where autonomy breaks.'
      ),
      ae.h2('Guardrails'),
      ae.p(
        'An agent that publishes without tests ends up publishing anything. So every tool has its tests, a health check runs every morning, and a decision gate blocks any spending without my approval.'
      ),
      ae.h2('What I took away'),
      ae.p(
        'Autonomy is earned in steps. The more precise the logbook, the better the agent’s decisions. The hard part is not getting it to act, it’s knowing when to stop it.'
      )
    ]
  }
}

/* ---------------- Barfield Studio ---------------- */

const sf = builder('studiofr')
const se = builder('studioen')

const studio: Project = {
  slug: 'barfield-studio',
  order: 3,
  kind: 'pro',
  year: '2026',
  name: { fr: 'Barfield Studio', en: 'Barfield Studio' },
  summary: {
    fr: 'Un plugin Claude Code : des équipes non techniques créent vidéos et formations en répondant à quelques questions.',
    en: 'A Claude Code plugin: non-technical teams make videos and trainings by answering a few questions.'
  },
  tldr: {
    fr: 'Une vidéo de formation demandait des jours et un prestataire. Avec Barfield Studio, une équipe répond à quelques questions et obtient une vidéo montée, avec voix et musique, sur un poste sans droits administrateur.',
    en: 'A training video used to take days and an outside agency. With Barfield Studio, a team answers a few questions and gets an edited video, with voice and music, on a machine without admin rights.'
  },
  tags: ['claudeCode', 'remotion', 'tts'],
  mock: 'video',
  stack: ['Claude Code', 'Remotion', 'React', 'Vite', 'PowerShell', 'TTS'],
  meta: meta([
    ['Rôle', 'Role', 'Conception et développement', 'Design and development'],
    ['Pour', 'For', 'Équipes non techniques', 'Non-technical teams'],
    ['Format', 'Format', 'Plugin Claude Code', 'Claude Code plugin'],
    ['Stack', 'Stack', 'Remotion, TTS, Vite', 'Remotion, TTS, Vite']
  ]),
  body: {
    fr: [
      sf.h2('Le problème'),
      sf.p(
        'Les équipes avaient beaucoup de choses à transmettre et peu de moyens pour bien le faire. Une vidéo propre passait par un prestataire et plusieurs allers-retours. Et les postes de travail sont verrouillés : pas de droits administrateur, pas d’installation libre.'
      ),
      sf.h2('Le fonctionnement'),
      sf.obj('diagram', { name: 'studio' }),
      sf.p(
        'Tout passe par une seule commande. Claude pose les questions, écrit le script, génère la voix, compose les scènes en React avec Remotion, puis assemble la vidéo. La charte graphique est intégrée, donc chaque vidéo sort aux couleurs de l’entreprise sans que personne n’ouvre un logiciel de montage.'
      ),
      sf.h2('Les contraintes'),
      sf.p(
        'Le plus dur n’était pas la vidéo, c’était le poste de travail. L’outil s’installe sans droits administrateur, respecte un cadre de sécurité imposé, et la synthèse vocale peut tourner entièrement en local.'
      ),
      sf.p(
        'Le même socle produit aussi des formations interactives, bilingues, avec quiz et tableau de résultats.'
      ),
      sf.h2('Ce que j’en retiens'),
      sf.p(
        'Pour des personnes qui ne codent pas, la meilleure interface reste une conversation. Le travail d’ingénierie consiste à rendre tout le reste invisible.'
      )
    ],
    en: [
      se.h2('The problem'),
      se.p(
        'Teams had a lot to pass on and few ways to do it well. A clean video meant an outside agency and several rounds of feedback. And work machines are locked down: no admin rights, no free installs.'
      ),
      se.h2('How it works'),
      se.obj('diagram', { name: 'studio' }),
      se.p(
        'Everything goes through a single command. Claude asks the questions, writes the script, generates the voice, builds the scenes in React with Remotion, then renders the video. The brand guidelines are built in, so every video comes out on brand without anyone opening an editing tool.'
      ),
      se.h2('Constraints'),
      se.p(
        'The hardest part wasn’t the video, it was the workstation. The tool installs without admin rights, works within an enforced security policy, and the voice synthesis can run fully on the machine.'
      ),
      se.p(
        'The same foundation also produces interactive, bilingual trainings with quizzes and a results dashboard.'
      ),
      se.h2('What I took away'),
      se.p(
        'For people who don’t code, the best interface is still a conversation. The engineering work is making everything else disappear.'
      )
    ]
  }
}

/* ---------------- Course platform (shown without its name) ---------------- */

const cf = builder('platformfr')
const ce = builder('platformen')

const platform: Project = {
  slug: 'plateforme-de-cours',
  order: 4,
  kind: 'personal',
  year: '2024 →',
  name: { fr: 'Plateforme de cours', en: 'Course platform' },
  summary: {
    fr: 'Trouver et comparer des cours près de chez soi. Web, apps iOS et Android, plus de 1 000 commits, infra entière en code.',
    en: 'Find and compare classes near you. Web, iOS and Android apps, over 1,000 commits, the whole infrastructure as code.'
  },
  tldr: {
    fr: 'Une plateforme que je porte depuis 2024 avec une petite équipe : produit, backend, apps mobiles et infrastructure. Plus de mille commits de ma part.',
    en: 'A platform I have been carrying since 2024 with a small team: product, backend, mobile apps and infrastructure. Over a thousand commits from me.'
  },
  tags: ['product', 'infra'],
  mock: 'search',
  stack: [
    'Next.js',
    'Capacitor',
    'NestJS',
    'Supabase',
    'Algolia',
    'Terraform',
    'Terragrunt',
    'GCP',
    'Playwright'
  ],
  meta: meta([
    ['Rôle', 'Role', 'Produit, backend, infra', 'Product, backend, infra'],
    ['Volume', 'Volume', '1 000+ commits', '1,000+ commits'],
    ['Apps', 'Apps', 'Web, iOS, Android', 'Web, iOS, Android'],
    ['Stack', 'Stack', 'Next.js, NestJS, Supabase', 'Next.js, NestJS, Supabase']
  ]),
  body: {
    fr: [
      cf.h2('Le produit'),
      cf.p(
        'Les gens cherchent des cours près de chez eux, et l’information est dispersée entre des sites vieillissants, des réseaux sociaux et le bouche-à-oreille. La plateforme rassemble les établissements, leurs cours et leurs horaires, avec une recherche par lieu.'
      ),
      cf.h2('L’architecture'),
      cf.obj('diagram', { name: 'platform' }),
      cf.h2('Ce dont je suis fier'),
      cf.obj('decisions', {
        items: items([
          {
            title: 'Une seule base de code',
            text: 'Le site et les apps iOS et Android partagent l’essentiel de leur code. Une fonctionnalité s’écrit une fois.'
          },
          {
            title: 'L’infra entièrement en code',
            text: 'Terraform et Terragrunt décrivent tous les environnements. Recréer la plateforme de zéro tient en quelques commandes.'
          },
          {
            title: 'Des tests qui suivent',
            text: 'Des centaines de fichiers de tests et des tests de bout en bout tournent avant chaque mise en production, publications sur les stores comprises.'
          }
        ])
      }),
      cf.h2('Ce que j’en retiens'),
      cf.p(
        'Porter un produit dans la durée apprend autre chose que le code : prioriser, documenter, et rendre la contribution facile pour les autres.'
      )
    ],
    en: [
      ce.h2('The product'),
      ce.p(
        'People look for classes near them, and the information is scattered across aging websites, social media and word of mouth. The platform brings together venues, their classes and their schedules, with search by location.'
      ),
      ce.h2('Architecture'),
      ce.obj('diagram', { name: 'platform' }),
      ce.h2('What I’m proud of'),
      ce.obj('decisions', {
        items: items([
          {
            title: 'One codebase',
            text: 'The website and the iOS and Android apps share most of their code. A feature gets written once.'
          },
          {
            title: 'Infrastructure fully as code',
            text: 'Terraform and Terragrunt describe every environment. Rebuilding the platform from scratch takes a handful of commands.'
          },
          {
            title: 'Tests that keep up',
            text: 'Hundreds of test files and end-to-end tests run before every release, app store releases included.'
          }
        ])
      }),
      ce.h2('What I took away'),
      ce.p(
        'Carrying a product over time teaches things beyond code: prioritizing, documenting, and making it easy for others to contribute.'
      )
    ]
  }
}

/* ---------------- Open-source SDKs (shown without the platform name) ---------------- */

const kf = builder('sdkfr')
const ke = builder('sdken')

const sdk: Project = {
  slug: 'sdk-open-source',
  order: 5,
  kind: 'openSource',
  year: '2023 →',
  name: { fr: 'SDK open source', en: 'Open-source SDKs' },
  summary: {
    fr: 'Bibliothèques Python et TypeScript générées depuis une spec OpenAPI vérifiée en CI, et une intégration Home Assistant.',
    en: 'Python and TypeScript libraries generated from an OpenAPI spec checked in CI, plus a Home Assistant integration.'
  },
  tldr: {
    fr: 'Une plateforme publique avait une API, mais pas de bibliothèques officielles. J’ai écrit la spec, généré des SDK typés en Python et en TypeScript, et intégré le tout à Home Assistant.',
    en: 'A public platform had an API but no official libraries. I wrote the spec, generated typed SDKs in Python and TypeScript, and brought it all into Home Assistant.'
  },
  tags: ['openSource', 'python', 'typescript'],
  mock: 'packages',
  stack: [
    'Python',
    'TypeScript',
    'OpenAPI',
    'GitHub Actions',
    'PyPI',
    'npm',
    'Home Assistant'
  ],
  meta: meta([
    ['Rôle', 'Role', 'Auteur principal', 'Lead author'],
    ['Langages', 'Languages', 'Python, TypeScript', 'Python, TypeScript'],
    ['Publiés', 'Published', 'PyPI, npm', 'PyPI, npm'],
    ['Intégration', 'Integration', 'Home Assistant', 'Home Assistant']
  ]),
  body: {
    fr: [
      kf.h2('Partir de la spec'),
      kf.p(
        'Un SDK écrit à la main dérive de l’API au premier changement. J’ai donc commencé par décrire l’API dans une spec OpenAPI, puis vérifié cette spec en CI contre de vraies réponses. Si l’API change, le test casse avant les utilisateurs.'
      ),
      kf.obj('diagram', { name: 'sdk' }),
      kf.h2('Des bibliothèques agréables'),
      kf.p(
        'Le code généré est entièrement typé, en synchrone et en asynchrone côté Python. Chaque release publie automatiquement les paquets sur PyPI et npm, avec leur changelog.'
      ),
      kf.h2('L’intégration Home Assistant'),
      kf.p(
        'L’intégration permet d’utiliser les données de la plateforme dans une maison connectée. Elle existe en version communautaire, avec plusieurs releases, et une version a été proposée au cœur de Home Assistant.'
      ),
      kf.h2('Ce que j’en retiens'),
      kf.p(
        'Une bonne spec fait gagner plus de temps que n’importe quel générateur. Le reste, c’est de l’outillage pour que plus personne n’ait à y penser.'
      )
    ],
    en: [
      ke.h2('Start from the spec'),
      ke.p(
        'A hand-written SDK drifts away from the API at the first change. So I started by describing the API in an OpenAPI spec, then checked that spec in CI against real responses. If the API changes, the test breaks before users do.'
      ),
      ke.obj('diagram', { name: 'sdk' }),
      ke.h2('Libraries that are pleasant to use'),
      ke.p(
        'The generated code is fully typed, with both sync and async clients in Python. Every release publishes the packages to PyPI and npm automatically, with a changelog.'
      ),
      ke.h2('The Home Assistant integration'),
      ke.p(
        'The integration brings the platform’s data into a smart home. It exists as a community integration with several releases, and a version was submitted to Home Assistant core.'
      ),
      ke.h2('What I took away'),
      ke.p(
        'A good spec saves more time than any generator. The rest is tooling, so nobody has to think about it again.'
      )
    ]
  }
}

export const PROJECTS: Project[] = [buddy, agent, studio, platform, sdk]

export const getLocalProject = (slug: string) =>
  PROJECTS.find((p) => p.slug === slug)
