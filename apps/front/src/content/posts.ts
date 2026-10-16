import { type Localized, type PT, builder } from './pt'

export type PostCategory = 'ai' | 'product' | 'infra' | 'data' | 'motion'

export type Post = {
  slug: string
  publishedAt: string
  category: PostCategory
  title: Localized<string>
  excerpt: Localized<string>
  body: Localized<PT>
}

const RRF_CODE = `def rrf(rankings, k=60):
    """Fuse ranked lists of document ids with Reciprocal Rank Fusion."""
    scores = {}
    for ranking in rankings:
        for rank, doc_id in enumerate(ranking, start=1):
            scores[doc_id] = scores.get(doc_id, 0) + 1 / (k + rank)
    return sorted(scores, key=scores.get, reverse=True)

fused = rrf([bm25_ids, embedding_ids])`

const f = builder('hybridfr')
const e = builder('hybriden')

const hybrid: Post = {
  slug: 'recherche-hybride',
  publishedAt: '2026-10-16T09:00:00.000Z',
  category: 'ai',
  title: {
    fr: 'La recherche hybride, expliquée en jouant',
    en: 'Hybrid search, explained by playing with it'
  },
  excerpt: {
    fr: 'Pourquoi un assistant IA rate parfois des réponses évidentes, et comment combiner le sens et les mots pour qu’il les trouve. Avec un terrain de jeu interactif.',
    en: 'Why an AI assistant sometimes misses obvious answers, and how combining meaning and words fixes it. With an interactive playground.'
  },
  body: {
    fr: [
      f.p(
        'Tapez « code E-07 » dans l’aide en ligne d’un vélo électrique. Vous attendez la fiche du code E-07. Un assistant construit sur des embeddings, la technique à la mode, vous sert volontiers celle du code E-03. Il a bien compris que vous parliez d’un code d’erreur. Il n’a pas compris lequel.'
      ),
      f.p(
        'J’ai vu ce bug des dizaines de fois en construisant un assistant pour des équipes de maintenance. Références de pièces, codes de panne, numéros de documents : tout ce qui compte vraiment dans un métier technique est précisément ce que la recherche « par le sens » gère le plus mal. La solution porte un nom un peu technique, la **recherche hybride**, mais l’idée tient en une phrase : chercher de deux façons, puis combiner.'
      ),
      f.p(
        'Cet article la démonte pièce par pièce, avec de petites simulations à manipuler. Tout tourne dans votre navigateur, sur douze fiches d’aide fictives.'
      ),
      f.obj('diagram', { name: 'rag' }),
      f.h2('Deux façons de chercher'),
      f.p(
        'La première est vieille comme les moteurs de recherche : on compte les mots. Une fiche qui contient les mots de la question remonte, d’autant plus que ces mots sont rares dans le reste du corpus. L’algorithme de référence s’appelle **BM25**. Il est rapide, prévisible, et il adore les mots exacts. Il ignore en revanche que « hiver » et « froid » parlent de la même chose.'
      ),
      f.p(
        'La seconde transforme chaque texte en une liste de nombres, un **embedding**, calculée par un modèle qui a lu énormément de texte. Deux phrases qui veulent dire la même chose obtiennent des nombres proches, même sans un mot en commun. C’est ce qui donne l’impression que la machine comprend.'
      ),
      f.p(
        'On peut se représenter ces nombres comme des coordonnées. Chaque fiche devient un point, et une question devient un point de plus, qui atterrit près des fiches qui lui ressemblent. Essayez :'
      ),
      f.obj('interactive', { name: 'embeddingMap' }),
      f.p(
        'Tapez maintenant « référence BX-220 » : le point ne bouge pas. Pour le modèle, un code produit est une suite de caractères sans signification. Il n’a aucune raison de le rapprocher de quoi que ce soit.'
      ),
      f.h2('Chacune a ses angles morts'),
      f.p(
        'Les deux méthodes se trompent, mais jamais au même endroit. La recherche par mots rate les paraphrases : « ma batterie tient moins longtemps en hiver » ne contient presque aucun des mots de la fiche qui y répond. La recherche par le sens rate les identifiants : codes d’erreur, références, numéros de version, noms propres rares.'
      ),
      f.p(
        'Voici les deux côte à côte, puis leur combinaison. Les suggestions montrent chaque cas, mais vous pouvez taper ce que vous voulez.'
      ),
      f.obj('interactive', { name: 'hybridPlayground' }),
      f.callout(
        'tip',
        'Regardez la colonne du milieu sur « code E-07 » : la bonne fiche n’arrive que deuxième, derrière celle de l’E-03. Puis la colonne de gauche sur la question de l’hiver : la bonne réponse tombe à la cinquième place. La colonne hybride, elle, la met en tête dans les deux cas.'
      ),
      f.h2('Fusionner deux classements'),
      f.p(
        'On a donc deux listes ordonnées, avec des scores qui ne se comparent pas : BM25 produit des nombres sans plafond, la similarité entre embeddings reste entre -1 et 1. Additionner les scores n’a pas de sens. La méthode la plus robuste, et de loin la plus simple, ignore les scores et ne garde que les rangs.'
      ),
      f.p(
        'Elle s’appelle **Reciprocal Rank Fusion**, ou RRF. Chaque liste donne à chaque document un vote de `1 / (k + rang)`. Premier dans une liste, il reçoit un gros vote. Dixième, un petit. On additionne les votes, on trie, c’est fini.'
      ),
      f.obj('codeBlock', {
        language: 'python',
        filename: 'rrf.py',
        code: RRF_CODE
      }),
      f.p(
        'La constante k amortit l’écart entre les premières places. Avec un k petit, être premier quelque part suffit à gagner. Avec un k grand, mieux vaut être correctement classé partout. La valeur 60, proposée dans l’article qui a introduit la méthode, marche étonnamment bien : je n’ai presque jamais eu besoin d’y toucher.'
      ),
      f.obj('interactive', { name: 'rrfExplorer' }),
      f.h2('Reclasser les meilleurs candidats'),
      f.p(
        'La fusion ramène presque toujours la bonne fiche dans le haut de la liste, mais pas forcément en tête. Pour ordonner finement les premiers résultats, on ajoute un **reclasseur**, souvent un cross-encoder : un modèle qui lit la question et chaque candidat ensemble, mot à mot, au lieu de comparer deux résumés chiffrés.'
      ),
      f.p(
        'Il est bien plus précis, et bien plus lent. Impossible de lui faire lire tout le corpus à chaque question. D’où l’architecture en deux temps : une recherche large et rapide pour trouver une cinquantaine de candidats, puis un reclassement lent et précis sur ces cinquante-là.'
      ),
      f.p(
        'Activez « Reclasser le top 5 » dans le terrain de jeu : sur les questions ambiguës, c’est souvent là que la bonne fiche passe de la deuxième à la première place.'
      ),
      f.h2('Avant tout ça : bien découper'),
      f.p(
        'Tout ce qui précède suppose que la réponse se trouve dans un passage indexé. Or on n’indexe jamais un document entier : on le découpe en morceaux de quelques dizaines à quelques centaines de mots. Et la taille de ces morceaux décide de beaucoup de choses.'
      ),
      f.p(
        'Trop petits, ils coupent les réponses en deux. Trop grands, ils noient la phrase utile dans du bruit, et le modèle qui rédige la réponse finale doit la retrouver lui-même. Jouez avec la taille et le chevauchement :'
      ),
      f.obj('interactive', { name: 'chunkingDemo' }),
      f.p(
        'Le chevauchement est une assurance bon marché : chaque morceau reprend la fin du précédent, ce qui limite les réponses coupées net. En pratique, je découpe d’abord en suivant la structure du document, titres et paragraphes, et je n’utilise une taille fixe qu’en dernier recours.'
      ),
      f.h2('Ce que je retiens en production'),
      f.li(
        '**Mesurer avant de régler.** Une centaine de questions avec leur bonne réponse vaut plus que toutes les intuitions. On regarde d’abord si la bonne fiche apparaît dans les cinq premiers résultats.'
      ),
      f.li(
        '**Garder les identifiants intacts.** Un découpage en mots qui transforme « E-07 » en « e » et « 07 » détruit exactement ce que BM25 sait bien faire.'
      ),
      f.li(
        '**Ne pas sur-régler k.** 60 par défaut, et on passe à autre chose : les gains sont presque toujours ailleurs.'
      ),
      f.li(
        '**Transformer chaque échec en test.** Quand quelqu’un signale une mauvaise réponse, la question rejoint le jeu d’évaluation. Le système ne peut plus régresser dessus sans qu’on le voie.'
      ),
      f.p(
        'C’est ce que j’ai mis en place pour [Buddy](/projects/buddy), un assistant pour des équipes de maintenance. La recherche hybride n’y est pas une option : dans un métier où tout repose sur des références exactes, c’est la condition pour être utile.'
      ),
      f.p(
        '*Le corpus, les embeddings et le reclasseur de cet article sont des simulations simplifiées. BM25 et RRF, eux, sont implémentés pour de vrai.*'
      )
    ],
    en: [
      e.p(
        'Type “code E-07” into an e-bike’s help center. You expect the article about code E-07. An assistant built on embeddings, today’s favorite technique, will happily hand you the one about code E-03. It understood you were asking about an error code. It did not understand which one.'
      ),
      e.p(
        'I saw this bug dozens of times while building an assistant for maintenance teams. Part numbers, fault codes, document references: everything that really matters in a technical job is exactly what search “by meaning” handles worst. The fix has a slightly technical name, **hybrid search**, but the idea fits in one sentence: search two ways, then combine.'
      ),
      e.p(
        'This article takes it apart piece by piece, with small simulations you can play with. Everything runs in your browser, on twelve fictional help articles.'
      ),
      e.obj('diagram', { name: 'rag' }),
      e.h2('Two ways to search'),
      e.p(
        'The first is as old as search engines: count words. An article that contains the words of the question ranks higher, all the more if those words are rare in the rest of the corpus. The reference algorithm is called **BM25**. It is fast, predictable, and it loves exact words. It has no idea, however, that “winter” and “cold” are about the same thing.'
      ),
      e.p(
        'The second turns every text into a list of numbers, an **embedding**, computed by a model that has read an enormous amount of text. Two sentences that mean the same thing get close numbers, even without a word in common. That is what makes the machine feel like it understands.'
      ),
      e.p(
        'Think of those numbers as coordinates. Every article becomes a point, and a question becomes one more point that lands near the articles it resembles. Try it:'
      ),
      e.obj('interactive', { name: 'embeddingMap' }),
      e.p(
        'Now type “part BX-220”: the point doesn’t move. To the model, a product code is a meaningless string of characters. It has no reason to bring it close to anything.'
      ),
      e.h2('Each one has blind spots'),
      e.p(
        'Both methods make mistakes, but never in the same place. Keyword search misses paraphrases: “my battery drains faster in winter” shares almost none of the words of the article that answers it. Meaning search misses identifiers: error codes, part numbers, version numbers, rare proper names.'
      ),
      e.p(
        'Here they are side by side, then combined. The suggestions show each case, but you can type anything you like.'
      ),
      e.obj('interactive', { name: 'hybridPlayground' }),
      e.callout(
        'tip',
        'Look at the middle column on “code E-07”: the right article only comes second, behind the E-03 one. Then the left column on the winter question: the right answer drops to fifth place. Now turn on reranking and watch the winter question again.'
      ),
      e.h2('Fusing two rankings'),
      e.p(
        'So we have two ordered lists whose scores don’t compare: BM25 produces unbounded numbers, embedding similarity stays between -1 and 1. Adding the scores makes no sense. The most robust method, and by far the simplest, ignores scores and keeps only ranks.'
      ),
      e.p(
        'It is called **Reciprocal Rank Fusion**, or RRF. Each list gives each document a vote of `1 / (k + rank)`. First in a list, it gets a big vote. Tenth, a small one. Add up the votes, sort, done.'
      ),
      e.obj('codeBlock', {
        language: 'python',
        filename: 'rrf.py',
        code: RRF_CODE
      }),
      e.p(
        'The constant k softens the gap between the top spots. With a small k, being first somewhere is enough to win. With a large k, it pays to be ranked decently everywhere. The value 60, suggested in the paper that introduced the method, works surprisingly well: I have almost never needed to touch it.'
      ),
      e.obj('interactive', { name: 'rrfExplorer' }),
      e.h2('Reranking the best candidates'),
      e.p(
        'Fusion almost always brings the right article near the top, but not necessarily first. To order the first results precisely, you add a **reranker**, often a cross-encoder: a model that reads the question and each candidate together, word by word, instead of comparing two numeric summaries.'
      ),
      e.p(
        'It is far more accurate, and far slower. You can’t have it read the whole corpus for every question. Hence the two-stage architecture: a broad, fast search to find fifty or so candidates, then a slow, careful rerank of those fifty.'
      ),
      e.p(
        'Turn on “Rerank the top 5” in the playground: on ambiguous questions, that is often where the right article moves from second to first place.'
      ),
      e.h2('Before all that: chunk well'),
      e.p(
        'Everything above assumes the answer sits in an indexed passage. But you never index a whole document: you cut it into chunks of a few dozen to a few hundred words. And the size of those chunks decides a lot.'
      ),
      e.p(
        'Too small, and they cut answers in half. Too large, and they drown the useful sentence in noise, leaving the model that writes the final answer to dig it out. Play with size and overlap:'
      ),
      e.obj('interactive', { name: 'chunkingDemo' }),
      e.p(
        'Overlap is cheap insurance: each chunk repeats the end of the previous one, which limits answers cut off mid-sentence. In practice I chunk along the document’s structure first, headings and paragraphs, and only fall back to a fixed size as a last resort.'
      ),
      e.h2('What I keep in mind in production'),
      e.li(
        '**Measure before tuning.** A hundred questions with their right answer beat every intuition. Start by checking whether the right article shows up in the top five results.'
      ),
      e.li(
        '**Keep identifiers intact.** A tokenizer that turns “E-07” into “e” and “07” destroys exactly what BM25 is good at.'
      ),
      e.li(
        '**Don’t over-tune k.** 60 by default, then move on: the gains are almost always elsewhere.'
      ),
      e.li(
        '**Turn every failure into a test.** When someone flags a bad answer, the question joins the evaluation set. The system can’t regress on it again without anyone noticing.'
      ),
      e.p(
        'This is what I built into [Buddy](/projects/buddy), an assistant for maintenance teams. Hybrid search isn’t optional there: in a trade where everything relies on exact references, it is the condition for being useful at all.'
      ),
      e.p(
        '*The corpus, embeddings and reranker in this article are simplified simulations. BM25 and RRF are implemented for real.*'
      )
    ]
  }
}

export const POSTS: Post[] = [hybrid]
