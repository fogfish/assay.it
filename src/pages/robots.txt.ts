import type { APIRoute } from "astro";

// Generated so the Sitemap URL always matches the configured `site`
// (PUBLIC_SITE_URL). @astrojs/sitemap emits /sitemap-index.xml.
export const GET: APIRoute = ({ site }) => {
	const sitemap = new URL("sitemap-index.xml", site).href;

	const body = `User-agent: *
Allow: /

Sitemap: ${sitemap}
`;

	return new Response(body, {
		headers: { "Content-Type": "text/plain; charset=utf-8" },
	});
};
