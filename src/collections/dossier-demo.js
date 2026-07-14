// Example dossier content shown in the product-preview BrowserFrames
// across the site (Hero, homepage "Inside a dossier" section, etc).
//
// This is illustrative placeholder content transcribed from the product
// wireframes in /poc — NOT a real Assay-generated analysis. Swap it out
// for a real compiled example once one exists; every component that
// renders a dossier preview reads from this file, so editing it here
// updates every preview at once.
//
// Verdict values must be one of: "established" | "contested" | "refuted" | "unverifiable"
// Entry type values must be one of: "Hypothesis" | "Aporia"

export const verdictMeta = {
	established: {
		label: "Established",
		stamp: "A",
		gloss: "prior art fully covers this mechanism",
		color: "var(--color-verdict-supported)",
	},
	contested: {
		label: "Contested",
		stamp: "C",
		gloss: "evidence is mixed or context-dependent",
		color: "var(--color-verdict-context)",
	},
	refuted: {
		label: "Refuted",
		stamp: "R",
		gloss: "current evidence contradicts this",
		color: "var(--color-verdict-contradicted)",
	},
	unverifiable: {
		label: "Unverifiable",
		stamp: "U",
		gloss: "no independent source exists",
		color: "var(--color-verdict-unverifiable)",
	},
};

// The dossier overview — what you see after a document finishes analysis.
export const dossier = {
	title: "Do things that don't scale",
	type: "Essay",
	author: "Paul Graham",
	source: "paulgraham.com",
	sourceUrl: "#",
	analyzedDate: "12 Jul 2026",
	entryCount: 11,
	synthesis:
		"The essay's core mechanisms are well grounded — 6 of 11 extracted claims are established in prior literature. The load-bearing risks are two contested scaling assumptions and one claim about founder time allocation that current evidence contradicts.",
	// Counts must add up to entryCount; used to draw the verdict spectrum bar.
	breakdown: [
		{ verdict: "established", count: 6 },
		{ verdict: "contested", count: 2 },
		{ verdict: "refuted", count: 1 },
		{ verdict: "unverifiable", count: 2 },
	],
	entries: [
		{
			num: 4,
			title: "Manual-first automation sequencing",
			type: "Hypothesis",
			thesis:
				"Solving user problems manually before automating lets founders launch faster and avoid automating the wrong thing.",
			confidence: "high (0.92)",
			sources: 3,
			linkedEntries: 2,
			verdict: "established",
		},
		{
			num: 2,
			title: "Founder-led recruitment as growth engine",
			type: "Hypothesis",
			thesis:
				"Manually recruiting early users one by one outperforms broad launch tactics for early-stage traction.",
			confidence: "high (0.88)",
			sources: 4,
			linkedEntries: 1,
			verdict: "established",
		},
		{
			num: 7,
			title: "Delight compounding into retention",
			type: "Hypothesis",
			novel: true,
			thesis:
				"Extraordinary early attention converts users into durable evangelists whose value outlasts the manual effort invested.",
			confidence: "moderate (0.61)",
			sources: 5,
			linkedEntries: 3,
			verdict: "contested",
		},
		{
			num: 9,
			title: "Service quality degradation at scale",
			type: "Aporia",
			thesis:
				"Unresolved tension: practices that create early delight structurally cannot survive the transition to scale.",
			confidence: "moderate (0.57)",
			sources: 4,
			linkedEntries: 2,
			verdict: "contested",
		},
		{
			num: 10,
			title: "Founder time as the cheapest resource",
			type: "Hypothesis",
			thesis:
				"Founder hours spent on manual delivery cost less than the capital alternatives available at early stage.",
			confidence: "high (0.84)",
			sources: 6,
			linkedEntries: 1,
			verdict: "refuted",
		},
		{
			num: 11,
			title: "Early-stage outcome opacity",
			type: "Aporia",
			thesis:
				"Whether early manual traction predicts scalable demand cannot be determined from within the early stage itself.",
			confidence: "low (0.34)",
			sources: 1,
			linkedEntries: 2,
			verdict: "unverifiable",
		},
	],
};

// A single entry, expanded — what you see after clicking into one
// hypothesis or aporia from the dossier overview above. Matches entry
// #4 ("Manual-first automation sequencing") from the dossier entries list.
export const featuredEntry = {
	breadcrumbDossier: dossier.title,
	position: "Hypothesis 4 of 11",
	verdict: "established",
	confidenceLabel: "high (0.92)",
	sourceCount: 3,
	verifiedDate: dossier.analyzedDate,
	novelty: "Not novel",
	title: "Manual-first automation sequencing",
	type: "Hypothesis",
	thesis:
		"Solving user problems manually before automating lets founders launch faster, build accurate automation, and avoid automating solutions that don't address real user needs.",
	assumptions: [
		"User problems can be solved manually at small scale without prohibitive cost",
		"The manual process reveals essential requirements for later automation",
		"Founders learn more from manual execution than from specification documents",
		"Early user satisfaction justifies the founders' time investment",
	],
	linkedEntries: [
		{ rel: "in tension with", title: "Early-stage outcome opacity in startup scaling" },
		{ rel: "in tension with", title: "Service quality degradation at scale" },
	],
	evaluation:
		"The mechanism is comprehensively covered by existing literature: the build–measure–learn loop, Wizard of Oz prototyping, and manual-MVP sequencing all describe the same core loop under different names, and tacit knowledge research confirms that manual execution generates learning unavailable from documentation.",
	evaluationMore:
		"The only potentially new element is the label and its framing around founder muscle memory — coining a term does not constitute novelty…",
	references: [
		{ title: "Lean startup methodology guide", src: "foundor.ai · 2011", stance: "supports" },
		{ title: "Wizard of Oz experiment", src: "early.tools", stance: "supports" },
		{ title: "From manual MVP to market validation", src: "ksofttechnologies.com · 2026", stance: "supports" },
	],
	backlinks: {
		count: 2,
		dossiers: ["European sovereign cloud strategy", "Platform team staffing models"],
	},
	pager: {
		prev: "3. Early users tolerate imperfect products",
		next: "5. Founder-led sales as learning channel",
	},
};
