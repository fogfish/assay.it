// 1. 从 `astro:content` 导入工具函数
import { defineCollection } from "astro:content";
import { z } from "astro/zod";

// 2. 导入加载器
import { glob } from "astro/loaders";

// 3. 定义你的集合
const post = defineCollection({
	// 使用 glob 加载器从 src/content/post 目录加载所有 .mdx 文件
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/post" }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		publishDate: z.coerce.date(),
		read: z.number().optional(),
		tags: z.array(z.string()).optional(),
		img: z.string().optional(),
		img_alt: z.string().optional(),
		featured: z.boolean().optional(),
	}),
});

const changelog = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/changelog" }),
	schema: z.object({
		title: z.string(),
		publishDate: z.coerce.date(),
		version: z.string().optional(),
		description: z.string().optional(),
	}),
});

// ── Analysis gallery ────────────────────────────────────────────────
//
// One folder per analyzed document: src/content/analysis/<slug>/
//
//   index.md         the landing page — frontmatter below, body = the lede
//   one-pager.html   optional, as exported from the app
//   full-report.html optional, as exported from the app
//
// Published at /analysis/<slug>/ with the reports served alongside it.
// See docs/plan/11-analysis-gallery.md for the authoring workflow.
//
// Everything in `standout`, `findings`, `glance` and `methodology` is
// copied from real pipeline output. Nothing on these pages is written by
// hand except the editorial frame: title, lede, kicker and headline.

const verdict = z.enum([
	// hypothesis standing
	"supported",
	"contested",
	"contradicted",
	"unverifiable",
	// problem friction
	"solved",
	"gap",
	"unverified",
]);

// The two tracks of the at-a-glance heat map. Segment counts should sum to
// `total`; bar widths are computed against `total`, so a short sum renders
// an honestly short bar rather than rescaling to full width.
//
// Written out rather than generated from a helper so the inferred types
// carry the real field names (`novel`, `openGap`) into the components.
const hypothesesTrack = z.object({
	total: z.number(),
	// Novelty is a hallmark-gold "find" flag, deliberately outside the
	// risk-colored verdict grammar.
	novel: z.number().default(0),
	segments: z
		.array(z.object({ standing: verdict, count: z.number() }))
		.default([]),
});

const problemsTrack = z.object({
	total: z.number(),
	openGap: z.number().default(0),
	segments: z
		.array(z.object({ friction: verdict, count: z.number() }))
		.default([]),
});

const analysis = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/analysis" }),
	schema: z
		.object({
			// ── Editorial frame (written by the author) ──
			title: z.string(),
			description: z.string(),
			kicker: z.string().optional(),
			genre: z.string().default("Engineering"),
			publishDate: z.coerce.date(),
			featured: z.boolean().optional(),
			// "soon" renders a coming-soon card in the gallery and builds no
			// landing page — use it to shelve an analysis that is still running.
			status: z.enum(["published", "soon"]).default("published"),
			// Shown on a coming-soon card in place of the headline finding.
			teaser: z.string().optional(),

			// ── The analyzed document ──
			source: z.object({
				title: z.string(),
				type: z.string(),
				author: z.string().optional(),
				publisher: z.string().optional(),
				url: z.url().optional(),
				// Required once published — a shelved entry has not been run yet, so
				// it carries no date rather than a placeholder one. Enforced below.
				analyzedDate: z.coerce.date().optional(),
			}),

			// ── At-a-glance heat map (from the dossier index) ──
			glance: z
				.object({
					hypotheses: hypothesesTrack,
					problems: problemsTrack,
				})
				.optional(),

			// ── The standout finding: the claim the document is quoted for ──
			// Not the most damning verdict — the most-cited claim, checked.
			standout: z
				.object({
					heading: z.string().default("The finding everyone quotes this for"),
					verdict,
					// Overrides the bare verdict label in the stamped head, e.g.
					// "Supported — but as prior art, not a new finding".
					verdictLabel: z.string().optional(),
					claim: z.string(),
					evidence: z.string(),
					analysis: z.string(),
				})
				.optional(),

			// ── All other findings, as compact rows ──
			findings: z
				.array(
					z.object({
						title: z.string(),
						summary: z.string().optional(),
						verdict: verdict.optional(),
						// A row with no verdict that links onward to the full dossier
						// ("…and 5 more hypotheses and problems").
						more: z.boolean().default(false),
					}),
				)
				.default([]),

			// ── Methodology strip ──
			methodology: z
				.object({
					claims: z.number().optional(),
					sources: z.number().optional(),
					duration: z.string().optional(),
					note: z.string().optional(),
				})
				.default({}),

			// ── Reports exported from the app, as filenames inside this folder ──
			reports: z
				.object({
					onePager: z.string().optional(),
					full: z.string().optional(),
				})
				.default({}),

			// Slugs of other analyses to link at the foot of the page. Left
			// empty, the page links the most recent others.
			related: z.array(z.string()).default([]),
		})
		// A published analysis must carry the run it is reporting: the glance
		// heat map, the standout finding, and the date it was analyzed. Failing
		// the build here is the point — it is what stops a half-filled draft
		// from shipping as a page that looks like real pipeline output.
		.superRefine((data, ctx) => {
			if (data.status !== "published") return;
			for (const [path, value] of [
				[["source", "analyzedDate"], data.source.analyzedDate],
				[["glance"], data.glance],
				[["standout"], data.standout],
			]) {
				if (value == null) {
					ctx.addIssue({
						code: "custom",
						path,
						message: `${path.join(".")} is required when status is "published"`,
					});
				}
			}
		}),
});

// 4. 导出一个 `collections` 对象来注册你的集合
export const collections = { post, changelog, analysis };
