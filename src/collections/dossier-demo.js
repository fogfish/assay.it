// Example dossier content shown in the product-preview BrowserFrames
// across the site — this is illustrative placeholder content in the style
// of the product wireframes in /poc, NOT real Assay-generated analyses.
//
// Two independent, named example sets are used around the site:
//
//   examples.realAnalysis — Hero (index only) and homepage "See a real
//                           analysis" (index + entry). Both use the same
//                           dossier so the Hero preview is exactly what you
//                           see again in the "See a real analysis" section
//                           further down the page.
//   examples.features     — Features page (index + entry, sliced per module)
//
// Replace any of these with a real compiled example once one exists —
// DossierIndexPreview.astro and DossierEntryPreview.astro both accept the
// dossier/entry data as props, so you can point a component at a new
// object here (or a fourth one you add) without touching component code.
//
// Schema notes (see /poc/2026-07-19 for the annotated mockups this models):
//
//   - Hypotheses carry two independent verdicts: `priorArt` (established |
//     extended | novel — is this idea new relative to prior art?) and
//     `standing` (supported | contested | contradicted | unverifiable — is
//     it true?). The index heat map and row chips read `standing`; `priorArt`
//     only surfaces in the row's meta line and, for the single opened entry,
//     the critique banner (`class`/`classConfidence`/`classSummary`).
//   - Problems (Aporias) carry one verdict, `friction`: gap (critical,
//     unsolved — the finding worth paying for) | solved | unverified.
//   - Standing and friction share one color grammar so the "at a glance"
//     heat map reads as a single strip: green = holds, amber = contested,
//     brick = fails, gray = unknown. Novelty (priorArt: "novel") is kept out
//     of that grammar entirely — it's a hallmark-gold "find" flag, not a
//     risk signal.

// The verdict vocabularies and their shared color grammar now live in
// src/collections/verdicts.js, so the published /analysis pages and these
// in-app previews cannot drift apart. Re-exported here because the
// preview components have always imported them from this module.
export {
  classMeta,
  frictionMeta,
  legend,
  standingMeta,
} from "@/collections/verdicts.js";

export const examples = {
  // ── Hero (index only) + Homepage "See a real analysis" (index + entry) ──
  heroPrimeVideo: {
    title: "Scaling up the Prime Video audio/video monitoring service and reducing costs by 90%",
    type: "Blog",
    author: "Marcin Kolny",
    source: "",
    sourceUrl: "#",
    analyzedDate: "14 Jun 2026",
    counts: { hypotheses: 5, problems: 3, entities: 31 },
    abstract: "Automated quality monitoring can be embedded directly into live video delivery pipelines, where detectors flag perceptual defects as they occur, and results are split across fast alert channels and durable storage to meet both real-time and audit needs. Keeping processing stages inside a single container with shared memory cuts inter-stage latency to near zero, and this trade-off between efficiency and scalability is well understood...",
    glance: {
      hypotheses: {
        total: 4, novel: 0, segments: [
          { standing: "supported", count: 2 },
          { standing: "contested", count: 2 },
        ]
      },
      problems: {
        total: 3, openGap: 2, segments: [
          { friction: "gap", count: 2 },
          { friction: "solved", count: 1 },
        ]
      },
    },
    hypotheses: [
      {
        num: 1,
        title: "Real-Time Quality Detection via Continuous Stream Inspection",
        facet: "general",
        claim:
          "Deploying automated perceptual quality analysis on every customer stream enables real-time defect detection and remediation... assurance from reactive testing to proactive continuous monitoring... Continuous in-stream perceptual defect detection for block corruption and audio-video sync is a well-deployed but the claim that detection enables real-time remediation is unsubstantiated by any cited source...",
        priorArt: "established",
        confidence: "high",
        citations: 5,
        addresses: 0,
        standing: "contested",
      },
    ],
    problems: [],
  },

  realPrimeVideoHypothesis: {
    breadcrumbDossier: "Scaling up the Prime Video audio/video monitoring service and reducing costs by 90%",
    position: "Hypothesis 1 of 4",
    class: "contested",
    classConfidence: "high",
    classSummary:
      "The claim is that embedding automated perceptual quality detectors (block corruption, audio/video sync, video freezes) directly into the streaming delivery pipeline enables continuous, proactive defect remediation rather than reactive post-delivery testing. This mechanism is extensively documented in existing literature and commercial deployments...",
    title: "Real-Time Quality Detection via Continuous Stream Inspection",
    facets: { scope: "domain", mechanism: "explanatory" },
    thesis:
      "Deploying automated perceptual quality analysis on every customer stream enables real-time defect detection and remediation...",
    about:
      "Rather than discovering quality issues through post-delivery testing or customer reports, streaming services can embed quality analysis into the delivery pipeline itself. By processing each stream through defect detectors that look for specific perceptual issues—such as block corruption, audio/video sync problems...",
    assumptions: [
      "Perceptual quality defects can be detected algorithmically in real-time on audio/video frames and buffers.",
      "Real-time detection enables faster remediation than post-delivery quality assurance.",
      "The computational cost of continuous detection is justified by the improvement in customer experience and reduction in undetected quality issues.",
    ],
    aporias: [],
    analysis: [
      {
        claim: "Deploying automated perceptual quality analysis on every customer stream enables real-time defect detection ... that look for specific perceptual issues—such as block corruption, audio/video sync problems, and video freezes",
        evidence:
          "The Amazon Science Prime Video blog explicitly states that detectors for block corruption, audio artifacts, and audio-video synchronization errors are deployed as quality assurance tools on live streams, directly naming the same defect categories the claim enumerates.",
        analysis:
          "The evidence describes the identical mechanism under an operational implementation rather than a theoretical framing; the claim is not novel but is a restatement of an already-deployed industrial practice confirmed by a primary industry source.",
      },
    ],
    citations: [
      { title: "How Prime Video uses machine learning to ensure video quality", src: "Amazon Science · 2022" },
      { title: "Performance analysis of collaborative real-time video quality", src: "Springer · 2024" },
      { title: "Stream-First Data Quality Monitoring: A Real-Time Approach", src: "Estuary · 2026" },
      { title: "The Economics of Streaming - Balancing Infrastructure Costs and Viewer Experience", src: "CacheFly · 2025" },
      { title: "BATON LipSync", src: "Interra Systems · 2024" },
    ],
    pager: {
      prev: "Library",
      next: "2. Monolithic Container Efficiency for Tightly Coupled Workflows",
    },
  },


  realAnalysis: {
    dossier: {
      title: "Do things that don't scale",
      type: "Essay",
      author: "Paul Graham",
      source: "paulgraham.com",
      sourceUrl: "#",
      analyzedDate: "12 Jul 2026",
      counts: { hypotheses: 5, problems: 3, entities: 12 },
      abstract:
        "The essay argues that startup survival depends on founder-performed, deliberately unscalable work in the early stage. Its core mechanisms hold up against prior literature; its lasting contribution is the framing of manual work as a temporary engine rather than a compromise. One claim is contradicted by current evidence, and the hardest problem it raises remains open.",
      glance: {
        hypotheses: {
          total: 5,
          novel: 1,
          segments: [
            { standing: "supported", count: 3 },
            { standing: "contested", count: 1 },
            { standing: "contradicted", count: 1 },
          ],
        },
        problems: {
          total: 3,
          openGap: 1,
          segments: [
            { friction: "solved", count: 1 },
            { friction: "gap", count: 1 },
            { friction: "unverified", count: 1 },
          ],
        },
      },
      hypotheses: [
        {
          num: 1,
          title: "Manual-first automation sequencing",
          facet: "general",
          claim:
            "Solving user problems manually before automating lets founders launch faster and avoid automating the wrong thing.",
          priorArt: "established",
          confidence: "high",
          citations: 3,
          addresses: 2,
          standing: "supported",
        },
        {
          num: 2,
          title: "Founder-led recruitment as engine",
          facet: "general",
          claim:
            "Manually recruiting early users one by one outperforms broad launch tactics for early-stage traction.",
          priorArt: "established",
          confidence: "high",
          citations: 4,
          addresses: 1,
          standing: "supported",
        },
        {
          num: 3,
          title: "Delight compounding into retention",
          facet: "domain",
          claim:
            "Extraordinary early attention converts users into durable evangelists whose value outlasts the manual effort invested.",
          priorArt: "extended",
          confidence: "medium",
          citations: 5,
          addresses: 2,
          standing: "contested",
        },
        {
          num: 4,
          title: "Unscalability as temporary engine",
          facet: "general",
          novel: true,
          claim:
            "Deliberately unscalable work is not a compromise but a distinct, expiring growth mechanism with its own lifecycle.",
          priorArt: "novel",
          confidence: "medium",
          citations: 2,
          addresses: 1,
          standing: "supported",
        },
        {
          num: 5,
          title: "Founder time as cheapest resource",
          facet: "local",
          claim:
            "Founder hours spent on manual delivery cost less than the capital alternatives available at early stage.",
          priorArt: "established",
          confidence: "high",
          citations: 6,
          addresses: 1,
          standing: "contradicted",
        },
      ],
      problems: [
        {
          num: 1,
          title: "Service quality degradation at scale",
          facet: "structural",
          claim:
            "Practices that create early delight structurally cannot survive the transition to scale, and no reliable handoff pattern exists.",
          confidence: "high",
          issues: 4,
          solutions: 2,
          friction: "gap",
        },
        {
          num: 2,
          title: "Manual effort accounting",
          facet: "observability",
          claim:
            "Founders cannot see whether manual work is investment or waste while performing it; modern cohort tooling largely resolves this.",
          confidence: "medium",
          issues: 3,
          solutions: 3,
          friction: "solved",
        },
        {
          num: 3,
          title: "Early-stage outcome opacity",
          facet: "predictability",
          claim:
            "Whether early manual traction predicts scalable demand cannot be determined from within the early stage itself.",
          confidence: "low",
          issues: 2,
          solutions: 0,
          friction: "unverified",
        },
      ],
    },
    featuredEntry: {
      breadcrumbDossier: "Do things that don't scale",
      position: "Hypothesis 1 of 5",
      class: "established",
      classConfidence: "high",
      classSummary:
        "The mechanism is comprehensively covered by existing literature: build–measure–learn, Wizard of Oz prototyping, and manual-MVP sequencing describe the same core loop under different names. The label and the founder-muscle-memory framing are new; the underlying mechanism is not.",
      title: "Manual-first automation sequencing",
      facets: { scope: "general", mechanism: "explanatory" },
      thesis:
        "Solving user problems manually before automating lets founders launch faster, build accurate automation, and avoid automating solutions that don't address real user needs.",
      about:
        "Starting with manual service delivery lets founders validate that a problem is worth solving and understand its exact contours before investing in automation. By the time automation is built, founders possess operational knowledge that eliminates guesswork about what to automate and how.",
      assumptions: [
        "User problems can be solved manually at small scale without prohibitive cost",
        "The manual process reveals essential requirements for later automation",
        "Founders learn more from manual execution than from specification documents",
        "Early user satisfaction justifies the founders' time investment",
      ],
      aporias: [
        { rel: "addresses", title: "Early-stage outcome opacity" },
        { rel: "addresses", title: "Service quality degradation at scale" },
      ],
      analysis: [
        {
          claim: "Manual delivery compresses time-to-launch.",
          evidence:
            "Lean Startup documents MVP cycles reaching market in weeks by substituting founder labor for unbuilt features; Wizard of Oz studies report the same compression pattern across domains.",
          analysis:
            "Directly supported. The essay's claim restates a mechanism measured repeatedly since 2011; no counter-evidence found.",
        },
        {
          claim:
            "Manual execution produces knowledge unavailable from specification documents.",
          evidence:
            "Tacit-knowledge research (Polanyi tradition; later organizational-learning studies) distinguishes knowledge acquired by doing from codified documentation.",
          analysis:
            "Supported in principle; the essay extends it to founders specifically, which the cited literature does not test directly — hence high confidence on mechanism, not on the founder-specific framing.",
        },
      ],
      citations: [
        { title: "The Lean Startup", src: "Eric Ries · 2011" },
        { title: "Wizard of Oz experiment", src: "early.tools" },
        {
          title: "From manual MVP to market validation",
          src: "ksofttechnologies.com · 2026",
        },
      ],
      pager: {
        prev: "Dossier index",
        next: "2. Founder-led recruitment as engine",
      },
    },
  },

  // ── Features page — index + entry, sliced per feature module ───────
  features: {
    dossier: {
      title: "European sovereign cloud strategy",
      type: "RFC",
      author: "Cloud Platform Team",
      source: "RFC-114 · internal",
      sourceUrl: "#",
      analyzedDate: "5 Jul 2026",
      counts: { hypotheses: 5, problems: 1, entities: 9 },
      abstract:
        "The case for a sovereign-region deployment is strong on compliance grounds but weaker on cost: the savings claim relies on reserved-instance pricing that isn't yet published for the target region, and the migration-timeline claim doesn't hold up against current team capacity.",
      glance: {
        hypotheses: {
          total: 5,
          novel: 0,
          segments: [
            { standing: "supported", count: 3 },
            { standing: "contested", count: 1 },
            { standing: "contradicted", count: 1 },
          ],
        },
        problems: {
          total: 1,
          openGap: 0,
          segments: [{ friction: "unverified", count: 1 }],
        },
      },
      hypotheses: [
        {
          num: 1,
          title: "GDPR data residency requires in-region storage",
          facet: "compliance",
          claim:
            "Regulatory guidance requires customer data to remain within EU borders for this workload class.",
          priorArt: "established",
          confidence: "high",
          citations: 4,
          addresses: 1,
          standing: "supported",
        },
        {
          num: 2,
          title: "Sovereign region avoids US CLOUD Act exposure",
          facet: "compliance",
          claim:
            "Deploying in an EU-sovereign region removes exposure to US CLOUD Act data requests.",
          priorArt: "established",
          confidence: "high",
          citations: 3,
          addresses: 1,
          standing: "supported",
        },
        {
          num: 3,
          title: "Reserved pricing offsets sovereign premium",
          facet: "cost",
          claim:
            "Reserved-instance discounts offset the price premium of sovereign-region infrastructure over standard on-demand pricing.",
          priorArt: "extended",
          confidence: "medium",
          citations: 2,
          addresses: 1,
          standing: "contested",
        },
        {
          num: 4,
          title: "Migration completes within one quarter",
          facet: "delivery",
          claim:
            "The proposed migration timeline of one quarter is achievable given current team capacity.",
          priorArt: "established",
          confidence: "low",
          citations: 3,
          addresses: 1,
          standing: "contradicted",
        },
        {
          num: 5,
          title: "Existing workloads are region-portable",
          facet: "delivery",
          claim:
            "Current workloads use infrastructure-as-code that is portable across regions without rearchitecture.",
          priorArt: "established",
          confidence: "high",
          citations: 3,
          addresses: 0,
          standing: "supported",
        },
      ],
      problems: [
        {
          num: 1,
          title: "Vendor lock-in risk is unchanged",
          facet: "legal",
          claim:
            "Whether sovereign-region adoption changes long-term vendor lock-in risk cannot be determined from current contract terms.",
          confidence: "low",
          issues: 2,
          solutions: 0,
          friction: "unverified",
        },
      ],
    },
    featuredEntry: {
      breadcrumbDossier: "European sovereign cloud strategy",
      position: "Hypothesis 3 of 5",
      class: "extended",
      classConfidence: "medium",
      classSummary:
        "Reserved-instance pricing mechanics are well documented for standard regions; this claim extends the same framework to a sovereign region whose discount tier hasn't been published yet — the mechanism is known, the specific numbers aren't confirmed.",
      title: "Reserved pricing offsets sovereign premium",
      facets: { scope: "cost", mechanism: "quantitative" },
      thesis:
        "Reserved-instance discounts offset the price premium of sovereign-region infrastructure over standard on-demand pricing in the target market.",
      about:
        "The savings case depends on the sovereign region eventually publishing reserved-instance pricing in line with adjacent regions. Until then, the offset can only be estimated by extrapolation, not confirmed against a published rate card.",
      assumptions: [
        "Reserved-instance capacity is available in the target sovereign region at the assumed discount tier",
        "Current workload utilization is stable enough to commit to 1-year reservations",
        "The sovereign-region premium itself is correctly estimated at current list prices",
      ],
      aporias: [
        { rel: "depends on", title: "Existing workloads are region-portable" },
      ],
      analysis: [
        {
          claim:
            "Reserved-instance capacity is available in the target sovereign region at the assumed discount tier.",
          evidence:
            "The vendor's regional pricing page lists only on-demand rates for the target region; no reserved-tier page has been published.",
          analysis:
            "Not confirmed. Plausible by extrapolation from adjacent-region reserved discount schedules, but the region-specific number doesn't exist yet.",
        },
        {
          claim:
            "The sovereign-region premium is correctly estimated at current list prices.",
          evidence:
            "Adjacent-region reserved discount schedules show a consistent 15–20% premium band for sovereign infrastructure.",
          analysis:
            "Supported within that band; if the target region's premium falls outside it, the cost case changes.",
        },
      ],
      citations: [
        { title: "Regional pricing page", src: "cloudvendor.com · pricing" },
        {
          title: "Adjacent-region reserved discount schedule",
          src: "cloudvendor.com · docs",
        },
      ],
      pager: {
        prev: "2. Sovereign region avoids US CLOUD Act exposure",
        next: "4. Migration completes within one quarter",
      },
    },
  },
};
