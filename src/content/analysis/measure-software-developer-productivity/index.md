---
title: "Measuring Developer Productivity in the Generative AI Era: What's Still Unsolved"
description: >-
  The software developer productivity used to be a measurable with DORA or similar methodology per McKinsey's artcile "Yes, you can measure software developer productivity". It is not longer holds. Existing frameworks least equipped to measure return on investements for generative AI, AI tooling and AI agentic engineering.
kicker: Analyzed document · Engineering
genre: Engineering
publishDate: 2026-08-22
status: published

source:
  title: Yes, you can measure software developer productivity
  type: Industry report
  publisher: McKinsey & Company
  url: https://www.mckinsey.com/industries/technology-media-and-telecommunications/our-insights/yes-you-can-measure-software-developer-productivity
  analyzedDate: 2026-08-22

# Straight from the dossier index of the run below.
glance:
  hypotheses:
    total: 11
    novel: 0
    segments:
      - standing: supported
        count: 7
      - standing: contested
        count: 4
  problems:
    total: 4
    openGap: 4
    segments:
      - friction: gap
        count: 4

# The problem the article's own title promises to solve — quoted verbatim,
# with the evidence and analysis bands copied from the run — problem 3,
# third band.
standout:
  heading: The question the paper's title asks, still open two years later
  verdict: gap
  verdictLabel: Critical gap — unresolved two years after the original 2023 piece
  claim: >-
    Absence of reliable productivity metrics prevents confident validation
    of remote work policies and AI tooling investments.
  evidence: >-
    GetInt.io lists DORA, SPACE, and flow frameworks but "does not claim one
    is definitive." Jellyfish "acknowledges multiple frameworks coexist,
    implying none is universally sufficient." Wikipedia - Software Metric:
    "attempts at complete measurement create unintended negative side
    effects."
  analysis: >-
    The Brief confirms this directly. DORA, SPACE, and other frameworks are
    partial tools. The Brief's own summary states: "Multiple competing
    frameworks exist, but none is described as eliminating the core opacity
    problem."

findings:
  - title: Unstable Measurement Model in Changing Software Development
    summary: >-
      A critical gap — no tool in the brief bridges individual, team, and
      organizational measurement into one stable model that also accounts
      for unmeasured GenAI impact.
    verdict: gap
  - title: Hidden Drivers of Deployment Frequency
    summary: >-
      A critical gap — no mature tool automates the causal link between
      work metrics and deployment frequency changes, and causal software
      engineering tooling remains an unfinished roadmap, not a shipping
      product.
    verdict: gap
  - title: Context-Dependent Productivity Defeats Uniform Measurement
    summary: >-
      A critical gap — no off-the-shelf tool resolves cross-context
      productivity measurement, and the closest workarounds (Emerald hybrid
      principles, OECD research projects) remain fragmented and
      research-phase.
    verdict: gap
  - title: Simple Metrics Create Unintended Consequences
    summary: >-
      Metric gaming when a measure becomes a target is a fully established
      mechanism under Goodhart's Law since the 1970s, with no contradicting
      evidence found, making the software-context framing the only element
      not already named in prior literature.
    verdict: supported
  - title: Inner-Outer Loop Time Allocation
    summary: >-
      A fully established mechanism for developer productivity and
      satisfaction, but the claim's unqualified form is contested because
      narrowly maximizing inner-loop time can harm system-level delivery
      outcomes, a condition the claim does not state.
    verdict: contested
  - title: Capability Mapping Targets Talent Development
    summary: >-
      Assessing skills against benchmarks and using personalized learning to
      advance developer proficiency is fully established, but the specific
      claim that 30% of developers will advance one level in six months has
      no direct empirical support in the evidence.
    verdict: contested
  - title: …plus 8 more hypotheses, all 30 recorded entities, and every citation, in the full dossier
    summary: >-
      Including the assumption lists behind each hypothesis and the fourth
      open problem not covered above.
    more: true

methodology:
  claims: 15
  sources: 74
  note: >-
    All four problems the run extracted resolved to a critical gap, not a
    solved one. The opacity gap tied to remote work and AI tooling
    investment is the one the article's own title promises to close, and it
    is still open: two years on, the run found no source — including
    McKinsey's own later coverage — that closes it.

# Dropped in exactly as the app exported them — the filenames are the app's,
# not ours, and the exports cross-link each other by those names. Each is
# published at a clean URL (one-pager.html / full-report.html) and aliased
# under its export name so those internal links still resolve.
reports:
  onePager: Measuring-What-Matters-The-Limits-of-Developer-Productivity-Frameworks-one-pager.html
  full: Measuring-What-Matters-The-Limits-of-Developer-Productivity-Frameworks-full-report.html
---

In 2023, McKinsey published an article that's still cited in every debate about "can software developer productivity be measured at all". It emphasis a multi-level hierarchy of system, engineering team and individual metrics like DORA, backed by the promise that the old "software is a black box" excuse no longer holds.

Two years in, and with AI agentic engineering impacting on developers ways of working faster than any measurment approach can track and adapt to it, that promise is worth checking against what has actually shipped.

We ran the full article through https://app.assay.it. Eleven hypotheses and four problems extracted, each verified independently against public sources. Seven hypotheses came back supported, four contested — and all four problems the run surfaced remain open.

The metric hierarchy and methodology itself holds true. It is established practice, not a new insight. None of the article claims came back contradicted. But the harder question of the article, the one the article's title asks, cannot be resolved. Measuring whether remote work and AI tooling investment are actually paying off is still, per every source the run could find, an unsolved problem if we look on this holistically from the organization perspective.

Causal releation between day-to-day work signals and delivery outcomes is still "a vision and roadmap," not a shipping tool. Existing frameworks such as DORA and SPACE remain partial. And the fastest-moving part of the picture is generative AI's and its actual effect on the businesses. Existing litirature is least equipped with an answer how to measure the return on investements.

Two years since publication, the field has better vocabulary for the problem than it had in 2023. It still does not have a common answer.
