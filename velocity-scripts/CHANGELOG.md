# Changelog

### 2026-08-23

- [ENHANCEMENT] Moved widget-specific default sorting and empty-state messages out of the framework so callers provide them through table settings.
- [ENHANCEMENT] Added explicit multi-value list filter support for table columns that provide reusable filter metadata.
- [FIX] Renamed the DataTables instance registry to a generic framework name.

### 2026-08-18

- [FIX] Improved table cell overflow handling for long rendered content.

### 2026-08-16

- [ENHANCEMENT] Refined DataTables initialization and table behavior for the current shared framework API.
- [FIX] Hardened runtime table settings validation and resize handling.

### 2026-08-13

- [FIX] Polished framework resource loading and DataTables initialization comments for maintainability.

### 2026-08-10

- [FIX] Hardened widget resource loading and DataTables setup with safer values, scoped loader variables, and clearer failure behavior.
- [FIX] Hardened table settings validation for table height, rows per page, and configurable colors.

### 2026-07-29

- [ENHANCEMENT] Refined smart column filtering so catalog, date, list, and computed numeric columns use appropriate controls.
- [FIX] Improved filter state handling so global search, column filters, and computed count filters can operate together.

### 2026-07-27

- [ENHANCEMENT] Added per-column distinct-value dropdowns and zero/non-zero choices for computed columns.
- [ENHANCEMENT] Added a `Clear filters` action beside the DataTables entry count.
- [FIX] Recalculated DataTables column widths after Polarion resizes rendered widgets.
- [FIX] Applied fixed table layout to keep DataTables scroll-header and body columns aligned during widget editing and redraws.

### 2026-07-26

- [ENHANCEMENT] Added configurable table height, header colors, row colors, export buttons, and global search visibility.
- [ENHANCEMENT] Moved the DataTables entry count above the table.
- [FIX] Applied configured header colors consistently to the visible header and sorting indicators.
- [FIX] Destroyed disconnected DataTables instances during widget rerenders to prevent stray FixedHeader elements.

### 2026-07-25

- [ENHANCEMENT] Enabled DataTables multi-column sorting with configurable default ordering.

### 2026-07-10

- [ENHANCEMENT] Added sticky header behavior for rendered DataTables.

### 2026-07-06

- [ENHANCEMENT] Added DataTables styling support, horizontal scrolling, and CSV export.

### 2026-06-29

- [ENHANCEMENT] Added the shared Velocity scripts folder for reusable framework macros.
