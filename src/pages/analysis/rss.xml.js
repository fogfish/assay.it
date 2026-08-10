import { getCollection } from "astro:content";
import { siteConfig } from "@/config/site.js";
import { analysisPath, isPublished, sortAnalyses } from "@/utils/analysis.js";
import rss from "@astrojs/rss";

// A feed of its own, separate from /rss.xml: someone who wants "one item per
// new dossier" is not asking for the blog.
export async function GET(context) {
	const entries = sortAnalyses(await getCollection("analysis")).filter(
		isPublished,
	);

	return rss({
		title: `Analyzed documents — ${siteConfig.title}`,
		description:
			"Canonical whitepapers, benchmarks, and blog posts, analyzed claim by claim against public sources.",
		site: context.site,
		items: entries.map((entry) => ({
			title: entry.data.title,
			pubDate: entry.data.publishDate,
			description: entry.data.description,
			link: analysisPath(entry.id),
		})),
	});
}
