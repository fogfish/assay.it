// Helpers shared by the analysis gallery (/analysis) and the per-analysis
// landing pages. URL shapes live here so the gallery card, the landing
// page, the OG image endpoint and the RSS feed cannot disagree about
// where an analysis lives.

import { verdictHex, verdictMeta } from "@/collections/verdicts.js";

export const ANALYSIS_BASE = "/analysis";

/** Landing page for an analysis, keyed by its collection entry id. */
export const analysisPath = (id) => `${ANALYSIS_BASE}/${id}/`;

/** The app-exported report HTML served alongside the landing page. */
export const reportPath = (id, kind) =>
	`${ANALYSIS_BASE}/${id}/${
		kind === "full" ? "full-report" : "one-pager"
	}.html`;

/** Build-time generated share card. */
export const ogPath = (id) => `${ANALYSIS_BASE}/${id}/og.png`;

/** A "soon" entry is shelved: it gets a gallery card but no landing page. */
export const isPublished = (entry) => entry.data.status !== "soon";

/**
 * Turns one at-a-glance track (hypotheses or problems) into renderable
 * bar segments. Accepts either vocabulary — segments carry `standing`
 * (hypotheses) or `friction` (problems) — and resolves both through the
 * one shared verdict grammar.
 *
 * Widths are derived from the declared `total` rather than the segment
 * sum, so a track whose segments do not account for every claim renders
 * an honest short bar instead of silently rescaling to full width.
 */
export function barSegments(track) {
	if (!track?.segments?.length) return [];
	const total = track.total || track.segments.reduce((a, s) => a + s.count, 0);
	return track.segments.map((s) => {
		const key = s.standing ?? s.friction;
		const meta = verdictMeta[key] ?? verdictMeta.unverifiable;
		return {
			key,
			count: s.count,
			label: meta.label,
			color: meta.color,
			hex: verdictHex[key] ?? verdictHex.unverifiable,
			pct: total ? (s.count / total) * 100 : 0,
		};
	});
}

/** Published first, newest first; shelved ("soon") entries last. */
export function sortAnalyses(entries) {
	return [...entries].sort((a, b) => {
		const shelved = Number(!isPublished(a)) - Number(!isPublished(b));
		if (shelved !== 0) return shelved;
		return b.data.publishDate.valueOf() - a.data.publishDate.valueOf();
	});
}

/**
 * The "more analyzed documents" links. Honours an explicit `related`
 * list, then backfills with the most recent other published analyses so
 * a new entry is cross-linked without anyone editing its neighbours.
 */
export function relatedFor(entry, all, limit = 3) {
	const others = sortAnalyses(all.filter((e) => e.id !== entry.id)).filter(
		isPublished,
	);
	const picked = entry.data.related
		.map((id) => others.find((e) => e.id === id))
		.filter(Boolean);
	for (const e of others) {
		if (picked.length >= limit) break;
		if (!picked.includes(e)) picked.push(e);
	}
	return picked.slice(0, limit);
}

/**
 * The one analysis to point a "see a real analysis" CTA at: the entry
 * flagged `featured`, else the most recent published one. Resolved from the
 * collection so those CTAs never hardcode a slug that can go stale.
 */
export function featuredAnalysis(entries) {
	const published = sortAnalyses(entries).filter(isPublished);
	return published.find((e) => e.data.featured) ?? published[0];
}

/** Genre facets for the gallery filter row, in document order. */
export function genresOf(entries) {
	const counts = new Map();
	for (const e of entries) {
		counts.set(e.data.genre, (counts.get(e.data.genre) ?? 0) + 1);
	}
	return [...counts.entries()].map(([name, count]) => ({ name, count }));
}

/** "14 Jun 2026" — the date format the app prints on a dossier. */
export const formatDate = (date) =>
	new Date(date).toLocaleDateString("en-GB", {
		day: "2-digit",
		month: "short",
		year: "numeric",
	});

/** A stable DOM/id-safe token for a genre, for the filter script. */
export const genreSlug = (genre) =>
	genre
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");
