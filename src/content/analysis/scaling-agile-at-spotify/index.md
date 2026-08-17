---
title: "The Spotify model: which parts of Squads, Tribes, Chapters and Guilds hold up"
description: >-
  The two-dimensional structure everyone copies holds up as a design — but it
  is a matrix organization plus communities of practice under new names, and
  four of its five open problems are still unsolved.
kicker: Analyzed document · Product Development
genre: Product Development
publishDate: 2026-08-12
status: published

source:
  title: Scaling Agile @ Spotify with Tribes, Squads, Chapters & Guilds
  type: Whitepaper
  author: Henrik Kniberg & Anders Ivarsson
  publisher: Crisp
  url: https://blog.crisp.se/wp-content/uploads/2012/11/SpotifyScaling.pdf
  analyzedDate: 2026-08-12

# Straight from the dossier index of the run below.
glance:
  hypotheses:
    total: 12
    novel: 0
    segments:
      - standing: supported
        count: 2
      - standing: contested
        count: 10
  problems:
    total: 5
    openGap: 4
    segments:
      - friction: gap
        count: 4
      - friction: unverified
        count: 1

# The claim the whole industry copied this paper for — the vertical/horizontal
# structure — quoted verbatim, with the evidence and analysis bands copied from
# the run: hypothesis 2, first band.
standout:
  heading: The structural claim everyone copies this paper for
  verdict: contested
  verdictLabel: Contested — a matrix organization and communities of practice, renamed
  claim: >-
    Combining vertical Squad alignment with horizontal Chapter and Guild
    structures preserves local autonomy while enabling knowledge sharing and
    cross-team coordination across large organizations.
  evidence: >-
    Matrix organization literature describes overlaying two or more dimensions
    of accountability onto teams so that people work across multiple parts of
    the organization at once. Sources covering matrix design explicitly state
    that this structure enables large institutions to manage scale without
    sacrificing strategic alignment or operational flexibility.
  analysis: >-
    The claim describes a two-dimensional organizational structure. Matrix
    organization theory covers exactly this mechanism under a different name.
    The vertical-plus-horizontal design is not new — it is the defining feature
    of matrix structures documented in multiple sources.

findings:
  - title: Squad-Based Mini-Startup Model
    summary: >-
      Organizing product development around small, self-contained teams with
      full technical autonomy and end-to-end responsibility encourages agile
      practices and reduces coordination overhead at organizational scale.
    verdict: contested
  - title: Dependency Mapping Enables Strategic Reorganization
    summary: >-
      Regularly surveying and visualizing which squads depend on each other
      reveals blocking dependencies that can be resolved through prioritization,
      reorganization, or architectural changes.
    verdict: supported
  - title: Demand-Driven Coordination Over Standing Meetings
    summary: >-
      Large projects need temporary daily coordination only during periods of
      high interdependence, not permanent standing structures.
    verdict: supported
  - title: Dunbar-Limited Groups Avoid Bureaucratic Overhead
    summary: >-
      Keeping organizational groups below the Dunbar limit of about 100 people
      prevents the emergence of restrictive rules, bureaucracy, politics, and
      management layers.
    verdict: contested
  - title: Measurement-Driven Organizational Improvement at Scale
    summary: >-
      Regular surveys measuring squad autonomy and support reveal patterns
      across teams, allowing focused improvement efforts rather than blanket
      changes.
    verdict: contested
  - title: Autonomy Collapse at Organizational Scale
    summary: >-
      Organizational complexity prevents full squad autonomy and direct
      stakeholder engagement.
    verdict: gap
  - title: Organizational Scaling Beyond Stable Group Limits
    summary: >-
      Absence of context-specific coordination models prevents accurate
      prediction of team effectiveness at organizational scale.
    verdict: gap
  - title: Autonomy-Efficiency Cost Tradeoff
    summary: >-
      Absence of clarity on autonomy-cost tradeoffs prevents optimal decisions
      about system independence.
    verdict: gap
  - title: Loss of Architectural Integrity in Distributed Systems
    summary: >-
      Missing unified system-wide accountability prevents early detection of
      architectural degradation.
    verdict: gap
  - title: …plus 25 recorded entities and every citation, in the full dossier
    summary: >-
      Including the assumption lists behind each hypothesis — the conditions
      that decide whether any of this transfers to your organization.
    more: true

methodology:
  claims: 17
  sources: 81
  note: >-
    Nothing in the paper came back flagged as novel: nine of the twelve
    hypotheses map onto established prior art under a different name, and the
    three that extend it do so at the margins. Assay grades the claims this
    document actually makes — not the "adopt the Spotify model" advice the
    industry later built on top of it.

# Dropped in exactly as the app exported them — the filenames are the app's,
# not ours, and the exports cross-link each other by those names. Each is
# published at a clean URL (one-pager.html / full-report.html) and aliased
# under its export name so those internal links still resolve.
reports:
  onePager: scaling-agile-at-spotify-short.html
  full: scaling-agile-at-spotify-full.html

related:
  - prime-video-90-percent-cost-reduction
---

In 2012 two coaches at Spotify published a paper describing how the company organized its engineering: autonomous Squads grouped into Tribes, cut horizontally by Chapters and Guilds. It became the most copied org chart in software. The authors opened it with a warning that this was a snapshot of a company and still figuring things out. However, the industry cited it as a grond truth blueprint.

We ran the full document through https://app.assay.it. Twelve hypotheses and five problems extracted, each verified independently against public sources. Two hypotheses came back supported, ten contested, and none novel.

The structure itself is reasonable and not a new. Vertical teams crossed with horizontal communities is a matrix organization plus communities of practice. It is documented since the mid-20th century. What the paper contributes is the honesty of its open problems, and four of the five it names remain critical gaps today: (i) autonomy erodes into hidden dependencies as team count grows, (ii) no scaling framework has been shown to improve team effectiveness, (iii) the cost of independence is still unquantified, and (iv) distributed ownership still leaves nobody accountable for the architecture as a whole.

The paper the industry copied for its answers is more valuable for the questions it left open.
