# Analysis Gallery (Examples)

Sources:

- `src/content.config.js` — the `analysis` collection schema
- `src/content/analysis/<slug>/index.md` — one folder per analyzed document
- `src/pages/analysis/index.astro` — the gallery
- `src/pages/analysis/[slug]/index.astro` — the per-example landing page
- `src/pages/analysis/[slug]/one-pager.html.ts`, `full-report.html.ts` — report passthrough
- `src/pages/analysis/[slug]/og.png.ts` — per-entry share card
- `src/pages/analysis/rss.xml.js` — feed
- `src/collections/verdicts.js` — the shared verdict colour grammar
- `src/utils/analysis.js`, `src/utils/og-card.js`, `src/utils/reports.js`

## What This Is For

Two pages, both aimed at organic and social traffic rather than at people
who already know what Assay is:

- `/analysis/` — the gallery: a shelf of at-a-glance cards, each carrying
  its headline finding.
- `/analysis/<slug>/` — the per-example landing page. This is the important
  one.

When posting to Hacker News or LinkedIn, **link the example page, never the
homepage**. The finding is the hook; the product is what gets discovered.

## The Central Architectural Choice

**The per-example page is an editorial article wrapping the dossier — not
the dossier itself.** The dossier is what the app exports; the landing page
is a search-optimised article that quotes it.

Structure, top to bottom:

1. Search-intent `<h1>`
2. Lede (the markdown body of `index.md`)
3. **At-a-glance card** — the same card the app prints, deliberately. The
   article previews the product UI, so clicking through to app.assay.it
   reads as continuity rather than a context switch.
4. **The standout finding** — one claim, as the full stamped triple:
   verdict head, claim in quotes, evidence band, analysis band.
5. All-findings rows
6. Methodology strip
7. CTA band
8. Related links + gallery backlink

### The standout finding rule

It must be the **most-cited claim of the source document**, not the most
damning verdict in the run. "The claim everyone quotes, checked" is the
hook; "we found the worst thing" is clickbait.

If the run produced no verdict on the claim the document is famous for,
say so in `methodology.note` and feature the closest claim it *did* grade —
do not stamp a verdict the pipeline never issued. The Prime Video entry
does exactly this: the 90% figure itself got no verdict, and the note says
so.

### Placeholder discipline

Everything inside `glance`, `standout`, `findings` and `methodology` is
copied from real pipeline output. Nothing on these pages is written by hand
except the editorial frame: `title`, `kicker`, `description` and the lede.

Never invent an evidence or analysis band. If it isn't in the run, it
doesn't ship.

## Authoring Workflow

1. Find a document worth showing as an example.
2. Run it through the app at <https://app.assay.it>.
3. Create `src/content/analysis/<slug>/index.md` (copy an existing entry as
   a starting point). Pick the standout claim by the rule above and paste
   its claim / evidence / analysis verbatim.
4. Export the one-pager and/or the full report from the app and drop the
   HTML files into the same folder. Reference them by filename under
   `reports:`. Nothing needs copying into `public/`.
5. `pnpm build` and publish. The OG image, the RSS item, the sitemap entry
   and the gallery card are all generated from the frontmatter.

To shelve an entry that is still running, set `status: soon` and give it a
`teaser`. It gets a "coming soon" card on the shelf and no landing page.

`pnpm build` fails if a `status: published` entry is missing `glance`,
`standout` or `source.analyzedDate`. That is deliberate — it is what stops
a half-filled draft from shipping as a page that looks like real output.

## Frontmatter

```yaml
title: string              # search-intent H1
description: string        # meta description; also the gallery card's headline finding
kicker: string?            # e.g. "Analyzed document · Engineering"
genre: string              # gallery filter facet; defaults to "Engineering"
publishDate: date
featured: boolean?         # the entry that site-wide "see a real analysis" CTAs point at
status: published | soon   # defaults to published
teaser: string?            # shown on a coming-soon card instead of a finding

source:
  title: string            # the analyzed document's own title
  type: string             # "Blog post", "Whitepaper", "Industry report", …
  author: string?
  publisher: string?
  url: string?             # omit rather than link somewhere wrong
  analyzedDate: date       # required once published

glance:                    # the dossier index heat map
  hypotheses:
    total: number
    novel: number          # hallmark-gold "find" flag, outside the risk colours
    segments: [{ standing: verdict, count: number }]
  problems:
    total: number
    openGap: number
    segments: [{ friction: verdict, count: number }]

standout:
  heading: string?
  verdict: verdict
  verdictLabel: string?    # e.g. "Supported — established prior art, not a new finding"
  claim: string            # verbatim from the document
  evidence: string         # verbatim from the run
  analysis: string         # verbatim from the run

findings:                  # compact rows
  - title: string
    summary: string?
    verdict: verdict?
    more: boolean?         # a row with no verdict that links on to the full dossier

methodology:
  claims: number?
  sources: number?
  duration: string?
  note: string?            # honest caveats about the run belong here

reports:
  onePager: string?        # filename inside this folder
  full: string?

related: [slug]            # optional; backfilled with the newest others
```

`verdict` is one of `supported`, `contested`, `contradicted`,
`unverifiable` (hypothesis standing) or `solved`, `gap`, `unverified`
(problem friction).

## The Verdict Colour Grammar

`src/collections/verdicts.js` is the single source of truth, shared by
these pages and by the in-app previews (`DossierIndexPreview.astro`,
`DossierEntryPreview.astro`, fed from `dossier-demo.js`). Both vocabularies
collapse onto four colours so the heat map reads as one strip:

- green — holds (supported / solved)
- amber — contested
- brick — fails (contradicted / open gap)
- gray — unknown (unverifiable / unverified)

Novelty is deliberately outside that grammar: it is a hallmark-gold find
flag, not a risk signal.

`verdictHex` mirrors the `--color-verdict-*` tokens as raw hex for the OG
renderer, which rasterises outside the browser and cannot resolve CSS
custom properties. Keep the two in step.

## OG Images

`/analysis/<slug>/og.png` — 1200×630, generated at build time: title, heat
bars and verdict counts on the paper background. The heat bar is the
ownable share-card visual.

`satori` lays the card out and converts glyphs to outline paths; `sharp`
then rasterises pure vectors. This matters: `sharp`'s SVG input is backed
by librsvg, which resolves fonts through fontconfig and **ignores embedded
`@font-face`**, so text drawn as `<text>` would silently fall back to
whatever the build machine has installed. Outlines make the card identical
on a laptop and in CI.

The fonts in `src/assets/fonts/` exist only for this. They are vendored
rather than fetched during the build so the output is deterministic and the
build does not depend on a third-party host.

## Reports

The exported HTML sits next to `index.md` and is served verbatim at
`/analysis/<slug>/one-pager.html` and `/analysis/<slug>/full-report.html`.
Content collections only load the markdown, so `src/utils/reports.js` reads
the sibling files at build time and emits them as their own routes. It
rejects any `reports:` value that resolves outside the analysis's own
folder.

**Leave the exported filenames alone.** The exports cross-link each other by
filename — the full report's "← Back to Summary" points at the one-pager's
export name — so each report is also published under that name as an alias.
Renaming the file on disk breaks that link, since the name inside the HTML
does not change with it. Drop the download in as-is, name it in `reports:`,
and the clean URL and the alias are both generated.

Only the clean canonical URL is ever linked from the site.
