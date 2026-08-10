// The verdict color grammar — one source of truth shared by the in-app
// product previews (DossierIndexPreview / DossierEntryPreview, fed from
// dossier-demo.js) and the published /analysis pages.
//
// This is deliberately shared rather than duplicated: the per-example
// landing page previews the product UI, so a reader who clicks through to
// app.assay.it should meet the same colors, labels and stamps they just
// read. Change a color here and both move together.
//
// Two verdict vocabularies, one grammar:
//
//   standing  — is a hypothesis true?  supported | contested |
//               contradicted | unverifiable
//   friction  — is a problem open?     solved | gap | unverified
//
// Both collapse onto the same four colors so the "at a glance" heat map
// reads as a single strip: green = holds, amber = contested, brick =
// fails, gray = unknown. Novelty (prior art) is kept out of that grammar
// entirely — it's a hallmark-gold "find" flag, not a risk signal.

export const standingMeta = {
	supported: { label: "Supported", color: "var(--color-verdict-supported)" },
	contested: { label: "Contested", color: "var(--color-verdict-context)" },
	contradicted: {
		label: "Contradicted",
		color: "var(--color-verdict-contradicted)",
	},
	unverifiable: {
		label: "Unverifiable",
		color: "var(--color-verdict-unverifiable)",
	},
};

export const frictionMeta = {
	solved: { label: "Solved problem", color: "var(--color-verdict-supported)" },
	gap: { label: "Critical gap", color: "var(--color-verdict-contradicted)" },
	unverified: {
		label: "Unverified",
		color: "var(--color-verdict-unverifiable)",
	},
};

export const classMeta = {
	established: {
		label: "Established",
		stamp: "A",
		color: "var(--color-verdict-supported)",
	},
	extended: { label: "Extended", stamp: "E", color: "var(--color-primary)" },
	novel: { label: "Novel", stamp: "N", color: "var(--color-hallmark)" },
	contested: {
		label: "Contested",
		stamp: "C",
		color: "var(--color-verdict-context)",
	},
};

// The verdict a standout finding / findings row can carry: either
// vocabulary, since a landing page's headline finding is as often an open
// problem as a contradicted hypothesis. Stamps are the glyphs the app
// prints in the verdict head.
export const verdictMeta = {
	supported: { ...standingMeta.supported, stamp: "✓", kind: "standing" },
	contested: { ...standingMeta.contested, stamp: "?", kind: "standing" },
	contradicted: { ...standingMeta.contradicted, stamp: "✕", kind: "standing" },
	unverifiable: { ...standingMeta.unverifiable, stamp: "–", kind: "standing" },
	solved: { ...frictionMeta.solved, stamp: "✓", kind: "friction" },
	gap: { ...frictionMeta.gap, stamp: "!", kind: "friction" },
	unverified: { ...frictionMeta.unverified, stamp: "–", kind: "friction" },
};

// The heat-map legend, in reading order. Shared by the at-a-glance card
// on the landing page and the product preview.
export const legend = [
	{
		color: "var(--color-verdict-supported)",
		label: "Holds — supported / solved",
	},
	{ color: "var(--color-verdict-context)", label: "Contested" },
	{
		color: "var(--color-verdict-contradicted)",
		label: "Fails — contradicted / open gap",
	},
	{ color: "var(--color-verdict-unverifiable)", label: "Unverifiable" },
];

// Raw hex for the same tokens, for contexts that cannot resolve CSS
// custom properties — currently the build-time OG image renderer, which
// rasterizes outside the browser. Keep in step with the
// `--color-verdict-*` tokens in src/styles/global.css.
export const verdictHex = {
	supported: "#2f7a4d",
	contested: "#9a6a14",
	contradicted: "#a63a2b",
	unverifiable: "#6e6c60",
	solved: "#2f7a4d",
	gap: "#a63a2b",
	unverified: "#6e6c60",
};
