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

## Version 3.0 

### 2026-06-30

- [ENHANCEMENT] Split DataTables rendering helpers out of `render.vm` and into `velocity-scripts/tsb.framework.vm`.
- [ENHANCEMENT] Replaced the old `#parse("loadResources.vm")` usage with `#import("tsb.framework.vm")`.
- [ENHANCEMENT] Moved widget resource loading macros (`loadWidgetCssResource`, `loadWidgetJsResource`, `loadCssResource`, `loadJsResource`) into the shared framework file.
- [ENHANCEMENT] Moved `renderWidgetDataMacro()` and `initDataTableMacro()` into the shared framework file so `render.vm` prepares data and the framework renders the table.
- [ENHANCEMENT] Replaced manual JSON array generation in `headersJson()` and `rowsJson()` with Velocity maps and lists: `$headersMap`, `$headersKeys`, and `$dataRows`.
- [ENHANCEMENT] Added `prepareHeadersMacro()` to build table headers before passing them to DataTables.
- [ENHANCEMENT] Added `prepareDataRowsMacro()` to build one Velocity row map per LiveDoc before passing rows to DataTables.
- [ENHANCEMENT] Added support for configured additional query columns from the repeatable `columns` parameter.
- [ENHANCEMENT] Added work item count links and filtered `Doc` links for each additional query column cell.
- [ENHANCEMENT] Generated a unique table id with `$widgetContext.generateUniqueElementId()` so multiple widget instances can render on the same page without sharing `widget-table`.
- [FIX] Changed document collection from the broken `$docItem.add($doc)` reference to `$docItems.add($_doc)`.
- [FIX] Skipped unresolvable documents before adding them to the matrix row list.
- [FIX] Built each document work item query with the project id from the document object instead of the outer `$projectId`.
- [FIX] Rendered the Project value directly with `docu.fields().project().render()` instead of checking a separate project field variable.
- [FIX] Rendered the Space value with `docu.space().render()` instead of manually parsing the old API relative path.
- [FIX] Kept signature rendering filtered to skip `obsolete` and `notAvailable` states.
- [FIX] Removed inline JavaScript object comments from manually generated row JSON by moving row data into Velocity maps before JavaScript conversion.
- [FIX] Resolved old CR comments about mixing Velocity and JSON by keeping the data in Velocity maps until `renderWidgetDataMacro()` converts it for DataTables.
- [FIX] Resolved old CR comments about moving JSON/resource helper functions out of `render.vm` by moving them to `tsb.framework.vm`.

### 2026-07-01

Documentation update only. No widget behavior changes and no code fixes.

- [DOCS] Replaced the root `README.md` opening description with a specific repository description for `tsb.livedoc.matrix`.
- [DOCS] Updated the root widget table from one generic widget row to two current entries: `TSB LiveDoc Matrix 3.0` and `TSB Velocity Framework`.
- [DOCS] Added `velocity-scripts/tsb.framework.vm` to the root README because `render.vm` imports it.
- [DOCS] Added a root `Contents` table with exact paths for widget files, DataTables resources, license, changelog, icon, and shared framework macros.
- [DOCS] Updated root deployment steps to zip `velocity-widget/tsb.livedoc.matrix/` contents and include `resources/` at the archive root.
- [DOCS] Updated the root repository layout to include `velocity-scripts/`, `icon.png`, and `resources/datatables.css` / `resources/datatables.js`.
- [DOCS] Added a root widget parameter table for `dataSet`, `showProject`, `showSpace`, `showSignaturesStatus`, `columnFields`, and `columns`.
- [DOCS] Replaced widget README metadata from old trial values (`trial-widget-5`, `trial5`, `trials`) to current values (`tsb.livedoc.matrix`, `TSB LiveDoc Matrix 3.0`, `Trinity`).
- [DOCS] Replaced outdated widget README rendering notes for `headersJson()` and `rowsJson($rowTitles)` with the current `initDataTableMacro()` flow from `tsb.framework.vm`.
- [DOCS] Added widget README sections for current contents, parameters, rendering flow, rendered columns, additional query columns, and deployment.
- [DOCS] Added shared macro usage notes to both README files: macro files must be placed in `/.polarion/pages/scripts/velocity` before they can be imported and used by widget files.

### 2026-07-10
- [FIX] Removed use of sticky headers in Datatables; code failed to render
- [FIX] Removed hover effects in rows in Table Effects
- [FIX] Created additional Datatables configuration to: `paging:false, scrollY: '60vh', autoWidth: true`
- [FIX] Removed icons in Signature fields 
- [FIX] Removed the nesting div that uses $divId for the table in tsb.framework.vm
- [FIX] Removed the use of $divId

### 2026-07-14
- [FIX] Changed and reuploaded the datatables to include the libraries: `jQuery 3.7.0, JSZip 3.10.1, pdfmake 0.2.7, DataTables 2.3.8, Buttons 3.2.6, Column visibility 3.2.6, HTML5 export 3.2.6, Print view 3.2.6, ColumnControl 1.2.1, FixedHeader 4.0.6, SearchBuilder 1.8.4, SearchPanes 2.3.5`, resulting to a resolved conflict in fixedHeader
- [ENHANCEMENT] Added back the fixedHeader in the `tsb.framework.vm`
- [ENHANCEMENT] Added hover in the table class, resulting to `<table id="$widgetTableId" class="stripe hover row-border order-column nowrap">`
- [DOCS] Changed the documentation

## Version 4.0

### 2026-07-25

- [ENHANCEMENT] Enabled DataTables multi-column sorting with default ordering by Project, Space, and Document.

### 2026-07-26

- [ENHANCEMENT] Added widget properties for table height, header colors, row colors, export buttons, and the search bar.
- [ENHANCEMENT] Moved the DataTables entry count above the table.
- [ENHANCEMENT] Highlighted zero work item counts in red across all additional query columns.
- [FIX] Applied configured header colors consistently to the visible header and sorting indicators.
- [FIX] Destroyed disconnected DataTables instances during widget rerenders to prevent stray FixedHeader elements.
- [FIX] Updated the widget label to `TSB LiveDoc Matrix 4.0`.

### 2026-07-27

- [ENHANCEMENT] Added optional paging with a configurable rows-per-page value that defaults to `10` and remains hidden while paging is disabled.
- [ENHANCEMENT] Added a reset control for restoring table presentation and behavior settings to their defaults.
- [ENHANCEMENT] Centered pagination controls and added corporate-blue hover and active states.
- [ENHANCEMENT] Added per-column filter dropdowns with text conditions and numeric conditions for additional query-count columns.
- [ENHANCEMENT] Added funnel and active-filter indicators, retained column sorting controls, and positioned both controls consistently across all columns.
- [ENHANCEMENT] Added a `Clear filters` action beside the DataTables entry count.
- [ENHANCEMENT] Preserved continuous typing and input focus while column filters redraw the table.
- [ENHANCEMENT] Left-aligned additional query-column headers and values with the other table content.
- [FIX] Recalculated DataTables column widths after Polarion resizes the widget.
- [FIX] Limited internal sizing-header cleanup to the DataTables master table.
- [DOCS] Updated the documented DataTables macro signature for column filter metadata and table settings.
