import { getCollection } from "astro:content";
import { renderOgCard } from "@/utils/og-card.js";
import type { APIRoute } from "astro";

// One 1200×630 share card per analysis, generated at build time:
// /analysis/<slug>/og.png
//
// The card is title + heat bars + verdict counts on the paper background —
// the heat bar is the visual this site owns, so a link posted to HN or
// LinkedIn carries the finding, not a generic logo card. Always link the
// example page rather than the homepage: the finding is the hook, the
// product is what gets discovered.
export async function getStaticPaths() {
	const entries = await getCollection("analysis");
	return entries
		.filter((entry) => entry.data.status !== "soon")
		.map((entry) => ({ params: { slug: entry.id }, props: { entry } }));
}

export const GET: APIRoute = async ({ props }) => {
	const png = await renderOgCard(props.entry.data);
	// Buffer → Uint8Array: Response accepts the latter as a BodyInit.
	return new Response(new Uint8Array(png), {
		headers: {
			"Content-Type": "image/png",
			"Cache-Control": "public, max-age=31536000, immutable",
		},
	});
};
