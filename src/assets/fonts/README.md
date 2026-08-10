# Fonts

These TTFs exist only for **build-time OG image rendering** (see
`src/pages/analysis/[slug]/og.png.ts`). The browser still loads Instrument
Serif and Inter from Google Fonts via `src/styles/global.css` — nothing here
is served to visitors.

They are vendored rather than fetched during the build for two reasons: the
share cards must render identically on every machine, and the build must not
depend on a third-party host being reachable.

| File | Source | License |
| --- | --- | --- |
| `InstrumentSerif-Regular.ttf` | [Instrument Serif](https://fonts.google.com/specimen/Instrument+Serif) | SIL Open Font License 1.1 |
| `Inter-Regular.ttf` | [Inter](https://fonts.google.com/specimen/Inter) | SIL Open Font License 1.1 |
| `Inter-SemiBold.ttf` | [Inter](https://fonts.google.com/specimen/Inter) | SIL Open Font License 1.1 |

To refresh a file, download the matching static weight from Google Fonts and
replace it in place — the renderer resolves them by filename.
