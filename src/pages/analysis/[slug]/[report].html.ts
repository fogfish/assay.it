import type { APIRoute } from "astro";
import { reportPaths, serveReport } from "@/utils/reports.js";

// Serves the app-exported reports verbatim alongside the landing page they
// belong to:
//
//   /analysis/<slug>/one-pager.html
//   /analysis/<slug>/full-report.html
//
// Each is also served under its original export filename, because the
// exports cross-link each other by that name ("← Back to Summary"). That
// alias is what lets an author drop the download in untouched — the point
// of keeping the files next to index.md — instead of hand-editing links
// inside generated HTML.
export const getStaticPaths = reportPaths;

export const GET: APIRoute = ({ props }) => serveReport(props);
