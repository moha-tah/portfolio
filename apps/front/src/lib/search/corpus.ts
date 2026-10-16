import type { ContentLang } from '@/lib/content'

/**
 * A tiny, fictional help center for an e-bike brand. Small enough to reason about,
 * varied enough to show where keyword search and semantic search each fail.
 */

export const CONCEPTS = [
  'battery',
  'charge',
  'range',
  'cold',
  'error',
  'sensor',
  'motor',
  'heat',
  'brake',
  'noise',
  'tire',
  'app',
  'warranty',
  'compat',
  'firmware'
] as const
export type Concept = (typeof CONCEPTS)[number]
export type Cluster = 'energy' | 'errors' | 'mechanics' | 'digital'

export type Doc = {
  id: number
  cluster: Cluster
  /** 2D position for the "embedding map", hand-placed so clusters read clearly */
  pos: [number, number]
  vec: Partial<Record<Concept, number>>
  title: Record<ContentLang, string>
  text: Record<ContentLang, string>
}

export const DOCS: Doc[] = [
  {
    id: 1,
    cluster: 'errors',
    pos: [0.74, 0.22],
    vec: { error: 1, sensor: 1, motor: 0.4 },
    title: {
      fr: 'Code erreur E-07 : capteur de vitesse',
      en: 'Error code E-07: speed sensor'
    },
    text: {
      fr: 'Le code E-07 signifie que le capteur de vitesse ne reçoit plus de signal. Vérifiez l’aimant fixé sur le rayon et le câble du capteur.',
      en: 'Code E-07 means the speed sensor no longer gets a signal. Check the magnet on the spoke and the sensor cable.'
    }
  },
  {
    id: 2,
    cluster: 'errors',
    pos: [0.83, 0.34],
    vec: { error: 1, motor: 0.8, heat: 0.5 },
    title: {
      fr: 'Code erreur E-03 : surchauffe du moteur',
      en: 'Error code E-03: motor overheating'
    },
    text: {
      fr: 'Le moteur coupe l’assistance pour refroidir. Laissez-le reposer une dizaine de minutes avant de repartir.',
      en: 'The motor cuts assistance to cool down. Let it rest for about ten minutes before riding again.'
    }
  },
  {
    id: 3,
    cluster: 'energy',
    pos: [0.2, 0.3],
    vec: { battery: 0.9, range: 1, cold: 1 },
    title: {
      fr: 'Autonomie réduite par temps froid',
      en: 'Shorter range in cold weather'
    },
    text: {
      fr: 'Sous 5 °C, la batterie délivre moins d’énergie : comptez 20 à 30 % d’autonomie en moins. Rangez-la à l’intérieur entre deux sorties.',
      en: 'Below 5 °C the battery delivers less energy: expect 20 to 30 % less range. Store it indoors between rides.'
    }
  },
  {
    id: 4,
    cluster: 'energy',
    pos: [0.3, 0.16],
    vec: { battery: 1, charge: 1 },
    title: {
      fr: 'Recharger la batterie correctement',
      en: 'Charging the battery properly'
    },
    text: {
      fr: 'Une charge complète prend environ quatre heures. Évitez de laisser la batterie à 0 % plusieurs jours de suite.',
      en: 'A full charge takes about four hours. Avoid leaving the battery at 0 % for several days in a row.'
    }
  },
  {
    id: 5,
    cluster: 'energy',
    pos: [0.4, 0.3],
    vec: { battery: 0.9, compat: 0.9 },
    title: {
      fr: 'Batterie BX-220 : compatibilité',
      en: 'BX-220 battery: compatibility'
    },
    text: {
      fr: 'La batterie BX-220 équipe les modèles City et Trek depuis 2023. Elle ne se monte pas sur les cadres d’avant 2021.',
      en: 'The BX-220 battery fits the City and Trek models since 2023. It does not mount on frames older than 2021.'
    }
  },
  {
    id: 6,
    cluster: 'mechanics',
    pos: [0.22, 0.74],
    vec: { brake: 1, noise: 1 },
    title: { fr: 'Freins qui couinent', en: 'Squeaky brakes' },
    text: {
      fr: 'Un sifflement au freinage vient souvent de plaquettes encrassées. Nettoyez le disque à l’alcool et rodez les plaquettes.',
      en: 'A squeal when braking usually comes from dirty pads. Clean the disc with alcohol and bed the pads in again.'
    }
  },
  {
    id: 7,
    cluster: 'mechanics',
    pos: [0.12, 0.86],
    vec: { tire: 1 },
    title: { fr: 'Réparer une crevaison', en: 'Fixing a flat tire' },
    text: {
      fr: 'Démontez la roue, repérez le trou, posez une rustine ou changez la chambre à air.',
      en: 'Take the wheel off, find the hole, patch it or replace the inner tube.'
    }
  },
  {
    id: 8,
    cluster: 'digital',
    pos: [0.78, 0.8],
    vec: { app: 1 },
    title: {
      fr: 'Connecter l’application en Bluetooth',
      en: 'Pairing the app over Bluetooth'
    },
    text: {
      fr: 'Activez le Bluetooth, ouvrez l’application et maintenez le bouton du guidon trois secondes.',
      en: 'Turn Bluetooth on, open the app and hold the handlebar button for three seconds.'
    }
  },
  {
    id: 9,
    cluster: 'energy',
    pos: [0.36, 0.44],
    vec: { battery: 0.7, warranty: 1, charge: 0.3 },
    title: { fr: 'Garantie de la batterie', en: 'Battery warranty' },
    text: {
      fr: 'La batterie est garantie deux ans ou 500 cycles de charge, au premier des deux termes atteint.',
      en: 'The battery is covered for two years or 500 charge cycles, whichever comes first.'
    }
  },
  {
    id: 10,
    cluster: 'mechanics',
    pos: [0.34, 0.82],
    vec: { noise: 1, motor: 0.3 },
    title: {
      fr: 'Cliquetis dans le pédalier',
      en: 'Clicking in the bottom bracket'
    },
    text: {
      fr: 'Un cliquetis à chaque tour de pédale vient souvent d’un boîtier de pédalier mal serré.',
      en: 'A click on every pedal stroke often comes from a loose bottom bracket.'
    }
  },
  {
    id: 11,
    cluster: 'digital',
    pos: [0.66, 0.66],
    vec: { app: 0.8, error: 0.4, firmware: 1 },
    title: { fr: 'Mettre à jour le firmware', en: 'Updating the firmware' },
    text: {
      fr: 'Les mises à jour corrigent souvent des codes d’erreur qui s’affichent sans raison. Elles se font depuis l’application.',
      en: 'Updates often fix error codes that show up for no reason. They are installed from the app.'
    }
  },
  {
    id: 12,
    cluster: 'energy',
    pos: [0.52, 0.42],
    vec: { battery: 0.6, motor: 0.7, cold: 0.3, range: 0.3 },
    title: {
      fr: 'L’assistance se coupe en montée',
      en: 'Assistance cuts out uphill'
    },
    text: {
      fr: 'Si l’assistance s’arrête en côte, la batterie est peut-être trop froide ou presque vide.',
      en: 'If assistance stops on a climb, the battery may be too cold or almost empty.'
    }
  }
]

/**
 * What the toy "embedding model" understands: word stems mapped to concepts.
 * It knows synonyms and paraphrases, but has never seen product codes, which is the point.
 */
export const LEXICON: Record<
  ContentLang,
  [string, Partial<Record<Concept, number>>][]
> = {
  fr: [
    ['batter', { battery: 1 }],
    ['autonom', { range: 1 }],
    ['tient', { range: 0.8 }],
    ['decharg', { battery: 0.6, range: 0.8 }],
    ['vide', { battery: 0.5, range: 0.5 }],
    ['charg', { charge: 1 }],
    ['recharg', { charge: 1, battery: 0.4 }],
    ['froid', { cold: 1 }],
    ['hiver', { cold: 1 }],
    ['gel', { cold: 0.9 }],
    ['temperatur', { cold: 0.6, heat: 0.4 }],
    ['code', { error: 0.9 }],
    ['erreur', { error: 1 }],
    ['affich', { error: 0.4 }],
    ['capteur', { sensor: 1 }],
    ['vitesse', { sensor: 0.6 }],
    ['moteur', { motor: 1 }],
    ['assistanc', { motor: 0.8 }],
    ['chauff', { heat: 1 }],
    ['surchauff', { heat: 1, motor: 0.4 }],
    ['coup', { motor: 0.4 }],
    ['arret', { motor: 0.4 }],
    ['frein', { brake: 1 }],
    ['bruit', { noise: 1 }],
    ['couin', { noise: 1 }],
    ['grinc', { noise: 1 }],
    ['sifl', { noise: 1 }],
    ['aigu', { noise: 0.6 }],
    ['clique', { noise: 1 }],
    ['crev', { tire: 1 }],
    ['pneu', { tire: 1 }],
    ['plat', { tire: 0.7 }],
    ['appli', { app: 1 }],
    ['bluetooth', { app: 1 }],
    ['telephon', { app: 0.8 }],
    ['connect', { app: 0.8 }],
    ['garant', { warranty: 1 }],
    ['remplac', { warranty: 0.5 }],
    ['compatib', { compat: 1 }],
    ['vieux', { compat: 0.4 }],
    ['ancien', { compat: 0.4 }],
    ['mise a jour', { firmware: 1 }],
    ['firmware', { firmware: 1 }],
    ['mont', { motor: 0.3, range: 0.2 }],
    ['cote', { motor: 0.3 }]
  ],
  en: [
    ['batter', { battery: 1 }],
    ['range', { range: 1 }],
    ['last', { range: 0.8 }],
    ['drain', { battery: 0.6, range: 0.8 }],
    ['empty', { battery: 0.5, range: 0.5 }],
    ['charg', { charge: 1 }],
    ['cold', { cold: 1 }],
    ['winter', { cold: 1 }],
    ['freez', { cold: 0.9 }],
    ['temperatur', { cold: 0.6, heat: 0.4 }],
    ['code', { error: 0.9 }],
    ['error', { error: 1 }],
    ['shows', { error: 0.4 }],
    ['sensor', { sensor: 1 }],
    ['speed', { sensor: 0.6 }],
    ['motor', { motor: 1 }],
    ['assist', { motor: 0.8 }],
    ['hot', { heat: 1 }],
    ['heat', { heat: 1 }],
    ['overheat', { heat: 1, motor: 0.4 }],
    ['cut', { motor: 0.4 }],
    ['stop', { motor: 0.4 }],
    ['brak', { brake: 1 }],
    ['nois', { noise: 1 }],
    ['squeak', { noise: 1 }],
    ['squeal', { noise: 1 }],
    ['high pitch', { noise: 0.8 }],
    ['click', { noise: 1 }],
    ['flat', { tire: 1 }],
    ['tire', { tire: 1 }],
    ['puncture', { tire: 1 }],
    ['app', { app: 1 }],
    ['bluetooth', { app: 1 }],
    ['phone', { app: 0.8 }],
    ['pair', { app: 0.8 }],
    ['connect', { app: 0.8 }],
    ['warrant', { warranty: 1 }],
    ['replace', { warranty: 0.5 }],
    ['compatib', { compat: 1 }],
    ['fit', { compat: 0.7 }],
    ['old', { compat: 0.4 }],
    ['updat', { firmware: 1 }],
    ['firmware', { firmware: 1 }],
    ['uphill', { motor: 0.3, range: 0.2 }],
    ['climb', { motor: 0.3 }]
  ]
}

export type Suggestion = {
  q: string
  expect: number
  why: 'words' | 'meaning' | 'both'
}

export const SUGGESTIONS: Record<ContentLang, Suggestion[]> = {
  fr: [
    { q: 'code E-07', expect: 1, why: 'words' },
    {
      q: 'ma batterie tient moins longtemps en hiver',
      expect: 3,
      why: 'meaning'
    },
    { q: 'référence BX-220', expect: 5, why: 'words' },
    { q: 'les freins font un bruit aigu', expect: 6, why: 'both' },
    { q: 'le moteur chauffe et s’arrête', expect: 2, why: 'both' }
  ],
  en: [
    { q: 'code E-07', expect: 1, why: 'words' },
    { q: 'my battery drains faster in winter', expect: 3, why: 'meaning' },
    { q: 'part BX-220', expect: 5, why: 'words' },
    { q: 'brakes make a high pitched noise', expect: 6, why: 'both' },
    { q: 'motor gets hot and stops', expect: 2, why: 'both' }
  ]
}

/** A paragraph long enough to show what chunk size does to a passage. */
export const CHUNK_TEXT: Record<
  ContentLang,
  { text: string; question: string; answer: string }
> = {
  fr: {
    question: 'Combien de temps faut-il laisser refroidir le moteur ?',
    answer:
      'Laissez-le reposer une dizaine de minutes, puis redémarrez sans forcer.',
    text: 'Le moteur est conçu pour fonctionner longtemps sans entretien. Il est étanche à la pluie mais pas à l’immersion, évitez donc les passages à gué. En usage normal, il reste tiède au toucher. Lors d’une longue montée avec un chargement lourd, il peut toutefois chauffer. Au-delà d’un certain seuil, l’écran affiche E-03 et l’assistance se coupe pour le protéger. Pas d’inquiétude : c’est un mécanisme de sécurité. Laissez-le reposer une dizaine de minutes, puis redémarrez sans forcer. Si le code revient plusieurs fois par semaine, contactez le service après-vente. Pensez aussi à vérifier la pression des pneus, qui influe sur l’effort demandé au moteur.'
  },
  en: {
    question: 'How long should the motor cool down?',
    answer: 'Let it rest for about ten minutes, then start again gently.',
    text: 'The motor is designed to run for a long time without maintenance. It is rainproof but not waterproof, so avoid fording streams. In normal use it stays lukewarm to the touch. On a long climb with a heavy load, it can still heat up. Past a certain threshold, the display shows E-03 and assistance cuts out to protect it. Nothing to worry about: it is a safety mechanism. Let it rest for about ten minutes, then start again gently. If the code comes back several times a week, contact customer service. Also check your tire pressure, which affects how hard the motor has to work.'
  }
}
