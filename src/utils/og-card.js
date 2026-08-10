// Build-time renderer for the per-analysis share card (1200×630).
//
// satori lays out the card and converts every glyph to an outline path, so
// sharp only ever rasterizes vectors. That matters because librsvg — which
// backs sharp's SVG input — resolves fonts through fontconfig and ignores
// embedded @font-face, so text drawn as <text> would silently fall back to
// whatever the build machine happens to have installed. Outlines make the
// card byte-identical on a laptop and in CI.
//
// The layout is the gallery card, redrawn: kicker, title, the analyzed
// document, both heat bars with their verdict counts, and the wordmark.

import fs from "node:fs/promises";
import path from "node:path";
import { barSegments, formatDate } from "@/utils/analysis.js";
import satori from "satori";
import sharp from "sharp";

const WIDTH = 1200;
const HEIGHT = 630;

// Paper-and-ink tokens, mirroring src/styles/global.css. Kept as literals
// because there is no browser here to resolve custom properties.
const INK = "#23221c";
const INK_MUTED = "#5d5b4f";
const INK_FAINT = "#8b8672";
const PAPER = "#fcfcf9";
const PAPER_EDGE = "#e4e2d7";
const HALLMARK = "#a07a2c";
const PRIMARY = "#22506f";
const TROUGH = "#e4e2d7";

const FONT_DIR = "src/assets/fonts";
const FONT_FILES = {
	serif: "InstrumentSerif-Regular.ttf",
	sans: "Inter-Regular.ttf",
	sansBold: "Inter-SemiBold.ttf",
};

// Read once per build rather than once per card.
let fontsPromise;
function loadFonts() {
	fontsPromise ??= (async () => {
		const [serif, sans, sansBold] = await Promise.all(
			Object.values(FONT_FILES).map((f) =>
				fs.readFile(path.resolve(FONT_DIR, f)),
			),
		);
		return [
			{ name: "Instrument Serif", data: serif, weight: 400, style: "normal" },
			{ name: "Inter", data: sans, weight: 400, style: "normal" },
			{ name: "Inter", data: sansBold, weight: 600, style: "normal" },
		];
	})();
	return fontsPromise;
}

// satori accepts React-element-shaped plain objects, so the card is built
// without pulling React into the build.
const el = (type, style, children) => ({
	type,
	props: { style, ...(children != null ? { children } : {}) },
});
const text = (content, style) => el("div", style, content);

/** One heat-bar row: label, the segmented bar, and the count breakdown. */
function barRow(label, track) {
	const segments = barSegments(track);
	const total = track?.total ?? 0;

	return el(
		"div",
		{ display: "flex", alignItems: "center", gap: 20, width: "100%" },
		[
			text(`${label} · ${total}`, {
				fontFamily: "Inter",
				fontSize: 22,
				fontWeight: 600,
				color: INK_MUTED,
				width: 190,
				flexShrink: 0,
			}),
			el(
				"div",
				{
					display: "flex",
					height: 26,
					flex: 1,
					borderRadius: 13,
					overflow: "hidden",
					background: TROUGH,
				},
				segments.length
					? segments.map((s) =>
							el("div", { width: `${s.pct}%`, background: s.hex }),
						)
					: [],
			),
		],
	);
}

/** The verdict counts under the bars, colored by the same grammar. */
function verdictCounts(glance) {
	const all = [
		...barSegments(glance?.hypotheses),
		...barSegments(glance?.problems),
	];

	// Collapse the two vocabularies onto their shared labels so the strip
	// reads "3 supported · 2 contested" rather than repeating a verdict.
	const merged = new Map();
	for (const s of all) {
		const prev = merged.get(s.label);
		merged.set(s.label, {
			hex: s.hex,
			count: (prev?.count ?? 0) + s.count,
		});
	}

	// Verdict labels are either bare adjectives ("supported", "contested")
	// or noun phrases ("critical gap", "solved problem"). Only the latter
	// take a plural, and only those contain a space — so that is the test.
	const countLabel = (label, count) => {
		const lower = label.toLowerCase();
		const plural = count === 1 || !lower.includes(" ") ? lower : `${lower}s`;
		return `${count} ${plural}`;
	};

	return el(
		"div",
		{
			display: "flex",
			gap: 26,
			flexWrap: "wrap",
			alignItems: "center",
			marginTop: 12,
		},
		[...merged.entries()].map(([label, { hex, count }]) =>
			el("div", { display: "flex", alignItems: "center", gap: 9 }, [
				el("div", {
					display: "flex",
					width: 13,
					height: 13,
					borderRadius: 3,
					background: hex,
				}),
				text(countLabel(label, count), {
					fontFamily: "Inter",
					fontSize: 21,
					color: INK_MUTED,
				}),
			]),
		),
	);
}

/**
 * Renders one analysis entry's frontmatter into a PNG buffer.
 * @param {object} data the entry's `data` object
 * @returns {Promise<Buffer>}
 */
export async function renderOgCard(data) {
	const fonts = await loadFonts();

	const byline = [
		data.source.type,
		data.source.author,
		data.source.publisher,
		data.source.analyzedDate
			? `analyzed ${formatDate(data.source.analyzedDate)}`
			: null,
	]
		.filter(Boolean)
		.join("  ·  ");

	const card = el(
		"div",
		{
			display: "flex",
			flexDirection: "column",
			width: "100%",
			height: "100%",
			background: PAPER,
			// A hallmark-gold hairline down the left edge — the same accent the
			// site uses for the kicker and the abstract rule.
			borderLeft: `14px solid ${HALLMARK}`,
			padding: "56px 64px 48px 58px",
		},
		[
			// Kicker
			text(data.genre.toUpperCase(), {
				fontFamily: "Inter",
				fontSize: 20,
				fontWeight: 600,
				letterSpacing: 2.2,
				color: HALLMARK,
			}),

			// Title — clamped so a long headline cannot push the bars off-card.
			text(data.title, {
				fontFamily: "Instrument Serif",
				fontSize: data.title.length > 78 ? 60 : 70,
				lineHeight: 1.13,
				color: INK,
				marginTop: 22,
				display: "block",
				lineClamp: 3,
			}),

			// The analyzed document
			text(byline, {
				fontFamily: "Inter",
				fontSize: 21,
				color: INK_FAINT,
				marginTop: 20,
				display: "block",
				lineClamp: 1,
			}),

			// Heat bars, pinned to the bottom of the card
			el(
				"div",
				{
					display: "flex",
					flexDirection: "column",
					gap: 16,
					marginTop: "auto",
					paddingTop: 34,
				},
				[
					barRow("Hypotheses", data.glance?.hypotheses),
					barRow("Problems", data.glance?.problems),
					verdictCounts(data.glance),
				],
			),

			// Footer rule + wordmark
			el(
				"div",
				{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					marginTop: 30,
					paddingTop: 22,
					borderTop: `1px solid ${PAPER_EDGE}`,
				},
				[
					text("assay.it", {
						fontFamily: "Instrument Serif",
						fontSize: 30,
						color: PRIMARY,
					}),
					text(
						data.methodology?.sources != null
							? `${data.methodology.sources} public sources checked`
							: "Every claim checked against public sources",
						{ fontFamily: "Inter", fontSize: 20, color: INK_FAINT },
					),
				],
			),
		],
	);

	const svg = await satori(card, { width: WIDTH, height: HEIGHT, fonts });
	return sharp(Buffer.from(svg)).png().toBuffer();
}
