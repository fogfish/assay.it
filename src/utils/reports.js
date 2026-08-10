// Serves the app-exported report HTML that lives inside each analysis
// folder (src/content/analysis/<slug>/*.html).
//
// Content collections only load the markdown, so the sibling HTML files
// are read off disk at build time and emitted as their own routes. That
// keeps the authoring workflow to "drop the download next to index.md"
// while still publishing at a clean URL under the landing page.

import fs from "node:fs/promises";
import path from "node:path";
import { getCollection } from "astro:content";

const CONTENT_ROOT = "src/content/analysis";

// The clean URL slug each declared report is published under.
const CANONICAL = { onePager: "one-pager", full: "full-report" };

/**
 * Every report route: each declared report at its canonical slug, plus an
 * alias at its original export filename when that differs.
 *
 * The alias exists because the exports link to each other by filename, so
 * dropping a download in untouched would otherwise leave a dead "← Back to
 * Summary". Only the canonical URL is ever linked from the site.
 */
export async function reportPaths() {
  const entries = await getCollection("analysis");
  const paths = [];

  for (const entry of entries) {
    for (const [kind, canonical] of Object.entries(CANONICAL)) {
      const file = entry.data.reports?.[kind];
      if (!file) continue;

      const names = new Set([canonical, path.basename(file, ".html")]);
      for (const report of names) {
        paths.push({
          params: { slug: entry.id, report },
          props: { slug: entry.id, file },
        });
      }
    }
  }

  return paths;
}

/**
 * Reads the declared file and returns it verbatim as text/html.
 * @param {Record<string, any>} props the route props set by `reportPaths`
 */
export async function serveReport(props) {
  const { slug, file } = props;

  // `file` is a frontmatter-declared filename; resolve it and confirm it
  // stays inside this analysis's own folder, so a stray "../" in content
  // can never publish something from elsewhere in the repo.
  const dir = path.resolve(CONTENT_ROOT, slug);
  const target = path.resolve(dir, file);
  if (target !== path.join(dir, path.basename(target))) {
    throw new Error(
      `Report "${file}" for analysis "${slug}" must be a file inside its own folder`,
    );
  }

  let html;
  try {
    html = await fs.readFile(target, "utf8");
  } catch {
    throw new Error(
      `Analysis "${slug}" declares report "${file}", but ${target} does not exist`,
    );
  }

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
