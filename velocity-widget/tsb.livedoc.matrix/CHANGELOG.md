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
