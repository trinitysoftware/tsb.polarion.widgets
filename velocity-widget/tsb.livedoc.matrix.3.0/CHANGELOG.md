# Changelog

## Version 1.0 - 2026-05-20

- Initial release under `new-widget-1` for Polarion ALM 2512 testing.
- Widget id: `tsb.livedoc.matrix` (≤30 characters; required by Polarion upload).
- Renamed from `tsb.livedoc.workitems.matrix` (32 chars) after upload error.
- LiveDoc rows; enumeration or Lucene columns; row total column; footer totals row.

## Version 1.1 - 2026-05-26
- This contains minor fixes in naming in `CHANGELOG.md`, `README.md`, 
- [FIX] Removed the version name from the folder name; removed `v.1.0` or `v.1`

## Version 1.2 - 2026-05-28
- [FIX] BSD-3 Clause licenses made consistent all throughout files
- [FIX] Removed wrong table columns, revised to live document matrix

## Version 1.3 - 2026-05-28
- [FIX] Revised version count inconsistencies between the files
- [FIX] Changed widget naming inconsistencies in the files
- [FIX] Changed details into a more fitting detail of the general purpose of the matrix
- [FIX] Configured descriptions of parameters fit better descriptions of the features
- [FIX] Updated feature matrix and repository description to align with implemented behavior.

## Version 1.4 - 2026-06-01

Trinity naming and coding conventions applied. Version remains in `widget.properties` label and this changelog only — not in the folder name.

### Repository layout
- [FIX] Moved widget from repo root into `velocity-widget/tsb.livedoc.matrix/` (parent folder marks deliverable type).
- [FIX] Updated root `README.md` and widget `README.md` for new paths and deploy instructions.

### Velocity directive spacing
- [FIX] Applied spaces after directive keywords and around parentheses throughout `render.vm` and `parameters.vm`.
- [FIX] Examples: `#if ( !$projectId )`, `#set ( $allowRendering = true )`, `#foreach ( $doc in $docs )`, `#macro ( prepareColumnsMacro )`.

### Widget-local macros (`render.vm` only)
- [FIX] Renamed macros to lowerCamelCase with `Macro` suffix:
  - `prepareColumns` → `prepareColumnsMacro`
  - `prepareRows` → `prepareRowsMacro`
  - `renderTableStart` → `renderTableStartMacro`
  - `renderTableEnd` → `renderTableEndMacro`
  - `renderTableHeader` → `renderTableHeaderMacro`
  - `renderTableRows` → `renderTableRowsMacro`
- [FIX] Updated all macro call sites in main render block to match.
- [FIX] Widget-local macros remain in `render.vm`.

### `parameters.vm` cleanup
- [FIX] Applied Velocity directive spacing on `#set ( $title = ... )`, `#set ( $query = ... )`, `#set ( $composite = ... )`.

## Version 2.0 - 2026-06-04

Major enhancement release: interactive in-page toolbar, JavaScript table rendering, and scoped CSS styling. Version remains in `widget.properties` label and this changelog only — not in the folder name.

### Interactive toolbar (in-page, no widget reload)
- [ENHANCEMENT] **Row filter** — text input filters visible rows by document title, name, and space (client-side).
- [ENHANCEMENT] **Column toggles** — checkboxes for Project, Space, and Signatures; defaults follow widget parameters (`showProject`, `showSpace`, `showSignaturesStatus`).
- [ENHANCEMENT] **Add field** — enter a document field id to show an extra column; pre-rendered cell HTML is read from hidden spans (field catalog includes `columnFields` plus common ids such as `status`, `author`, `updated`).
- [ENHANCEMENT] **Add column** — enter title + Lucene query to add a query-count column at runtime; counts fetched via Polarion REST (`getRestApiToken`) with the same work-item / Doc link pattern as configured columns.
- [ENHANCEMENT] **Column and field pickers** — checkbox chips to show or hide added field columns and query columns without reloading the widget.
- [ENHANCEMENT] **Reset** — clears row filter, user-added columns/fields, visibility overrides, and restores toolbar defaults from widget parameters.

### Removed / replaced
- [ENHANCEMENT] Removed Velocity table macros (`prepareColumnsMacro`, `prepareRowsMacro`, `renderTableStartMacro`, `renderTableEndMacro`, `renderTableHeaderMacro`, `renderTableRowsMacro`); logic moved to span serialization (server) and DOM rendering (client).

## Version 2.1 - 2026-06-08

Documentation and formatting pass for readability and maintainability. No new widget features. Version remains in `widget.properties` label and this changelog only — not in the folder name.

### `render.vm` — file-level documentation
- [DOCS] Added `OVERVIEW`, `FLOW`, and `ARCHITECTURE` blocks at the top of the file describing the two-phase design (Velocity serializes data into hidden spans; JavaScript reads spans and renders the table in-page).
- [DOCS] Added `FILE MAP`, `SERVER FLOW` (Steps 1–5), `CLIENT FLOW`, `KEY DOM CONCEPTS` (`matrixRootId`, `activeMatrixRoot`, `fromNode`, `data-ldmx`), and `MULTI-WIDGET` notes for pages with more than one matrix instance.

### `render.vm` — Velocity inline comments
- [DOCS] Documented `$docsQuery` construction (`getFor()`, `revision("")`, `queryToShow()`).
- [DOCS] Documented `$projectService.getProject().getContextId()` and the `$q` double-quote helper for Lucene values.
- [DOCS] Documented `columnFields` comma-split parsing, `$docList` materialization, and the `$void` discard convention for `.add()` side effects.
- [DOCS] Documented `matrixRootId` sanitization (`ldmx_` prefix + `replaceAll` to safe HTML id characters).
- [DOCS] Documented extra pre-rendered field ids (`status`, `updated`, `author`, etc.) and Step 1–5 markers through span serialization, `#params`, and the boot `<img>`.

### `render.vm` — JavaScript inline comments
- [DOCS] Added section banners for Globals, DOM, Config, State, Table, Toolbar, Events, and Render.
- [DOCS] Added block comments for REST token usage, `activeMatrixRoot` / `matrixRootId`, `isVisibleMatrixRoot()`, and `resolveActiveMatrixRoot()` (including `fromNode.closest()` and visible-root fallback).
- [DOCS] Added subsection markers (`/* --- State --- */`, `/* --- Configuration --- */`, `/* --- Columns and fields --- */`, `/* --- Table helpers --- */`) to group related functions.

### `render.vm` — CSS inline comments
- [DOCS] Added comments explaining `[data-livedoc-matrix-root]` attribute scoping and why widget styles do not leak to the rest of the Polarion page.
- [DOCS] Added comments on `.ldmx-toolbar` flex layout, `flex-wrap`, `gap`, `margin`, `padding`, and CSS custom properties (`--ldmx-*`).

### `parameters.vm` — inline comments
- [DOCS] Added `OVERVIEW` header for the parameters file.
- [DOCS] Added notes on `dependencySource` and on the `composite` + `multi("Additional Columns", …)` pattern (Title + Lucene Query per repeatable column).

### Formatting and spacing
- [FIX] Added blank lines between CSS rule blocks in `<style>` (toolbar sections through table link hover rules) for easier scanning.
- [FIX] Expanded single-line input modifier rules to multi-line blocks: `.ldmx-input--filter`, `.ldmx-input--short`, `.ldmx-input--query` (selector on one line, declarations on the next lines).

### Bug fixes (regression from comment reorganization)
- [FIX] Restored `findMatrixElementByDataAttribute()` — the function body was dropped when section comments were moved, breaking toolbar control lookup.
- [FIX] Restored the complete `readSpanValue()` function wrapper — an orphaned function body caused a JavaScript syntax error that stopped the entire `<script>` block and prevented the matrix from rendering.
- [FIX] Kept `$transaction.context().createPortalLink().project(…).workItems().query(…).toEncodedRelativeUrl()` and the matching `.document(…).filter(…).toEncodedRelativeUrl()` assignments on single lines; Velocity does not support splitting method chains across lines.