# TSB LiveDoc Matrix 4.0

Polarion Velocity widget for rendering a permission-aware, baseline-aware LiveDoc matrix with DataTables.

| Property | Value |
|----------|-------|
| Widget id | `tsb.livedoc.matrix` |
| Widget folder | `velocity-widget/tsb.livedoc.matrix/` |
| Label | `TSB LiveDoc Matrix 4.0` |
| Tags | `Trinity` |

## Contents

| Path | Description |
|------|-------------|
| [`render.vm`](render.vm) | Builds the LiveDoc rows, table headers, document field cells, signature cells, and additional query-count cells. |
| [`parameters.vm`](parameters.vm) | Defines the Data Set parameter, recommended presets, display toggles, document field list, DataTables controls, and additional query columns. |
| [`description.vm`](description.vm) | Describes the widget parameters in Polarion. |
| [`details.vm`](details.vm) | Describes the widget in Polarion. |
| [`dependencies.vm`](dependencies.vm) | Rebuilds dependent parameter values and visibility, including presets, paging controls, Data Set mode handling, and Project Baseline options. |
| [`widget.properties`](widget.properties) | Defines the Polarion widget label and tags. |
| [`resources/datatables.css`](resources/datatables.css) | DataTables stylesheet loaded by `tsb.framework.vm`. |
| [`resources/datatables.js`](resources/datatables.js) | DataTables script loaded by `tsb.framework.vm`. |
| [`resources/tableEffects.css`](resources/tableEffects.css) | Widget-owned table layout, filter, paging, and count-highlight styles. |
| [`resources/tableEffects.js`](resources/tableEffects.js) | Widget-owned runtime helper for safe table colors from the properties panel. |
| [`icon.png`](icon.png) | Widget icon. |
| [`CHANGELOG.md`](CHANGELOG.md) | Change history for this widget. |
| [`LICENSE`](LICENSE) | BSD 3-Clause license. |
| [`../../velocity-scripts/tsb.framework.vm`](../../velocity-scripts/tsb.framework.vm) | Shared macros imported by `render.vm`. |

## Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| `dataSet` | None | Selects the LiveDoc source scope, query, optional Project Baseline, specific revision, and Collection inheritance behavior. |
| `matrixConfigurationPreset` | `custom` | Applies Custom Configuration or one recommended setup: Basic LiveDoc Status, Review and Approval, Traceability Counts, or Release Readiness. |
| `showProject` | `true` | Adds the Project column. |
| `showSpace` | `true` | Adds the Space column. |
| `showSignaturesStatus` | `true` | Adds the Signatures column. Obsolete and not available signatures are skipped. |
| `showDocumentBaselines` | `true` | Adds readable baselines whose base object points to the LiveDoc. |
| `showBranchedDocuments` | `false` | Adds readable branch targets created from the LiveDoc. |
| `showMasterDocument` | `false` | Adds the readable branched-from or derived-from source document. |
| `showUnresolvedComments` | `false` | Adds unresolved root comments from the LiveDoc. |
| `showUnreferencedWorkItems` | `false` | Adds the Recycle Bin count for readable unreferenced work items. |
| `showApprovedVersions` | `true` | Adds approved workflow transition revisions readable by the user. |
| `columnFields` | `status,updated` | Comma-separated document field IDs rendered as table columns. |
| `showRisksheetLink` | `false` | Adds a Risksheet link beside each additional query-column count and Doc link. |
| `columns` | Empty | Repeatable additional columns. Each entry has a title and Lucene query. |
| `tableHeight` | `60vh` | Sets the vertical scroll height used by DataTables. |
| `headerBackgroundColor` | `#ffffff` | Sets the table header background color after validation. |
| `headerTextColor` | `#111827` | Sets the table header text and icon color after validation. |
| `rowBackgroundColor` | `#ffffff` | Sets the normal row background color after validation. |
| `alternateRowBackgroundColor` | `#f8fafc` | Sets the alternate row background color after validation. |
| `showExportButtons` | `true` | Shows DataTables copy, CSV, and Excel export actions. |
| `showSearchBar` | `true` | Shows the global DataTables search box. |
| `enablePaging` | `false` | Enables page-based rendering when large tables need pagination. |
| `rowsPerPage` | `10` | Sets the page size when paging is enabled. |

## Rendering Flow

1. `render.vm` imports `tsb.framework.vm`.
2. `render.vm` resolves the active Data Set mode, revision context, and optional Collection inheritance.
3. Project Baseline or specific revision settings are applied when the selected scope supports them.
4. LiveDocs are collected from document search or directly from Collection elements, with readable-object checks before rows are rendered.
5. Collection inheritance recursively follows upstream Collections when enabled, while preserving the selected Collection's first document revision.
6. Field metadata and filter options are prepared before headers are built.
7. Each resolved LiveDoc becomes one table row with rendered cells and semantic filter/search values.
8. Additional query columns count matching work items inside the LiveDoc query, exclude Recycle Bin identities, and build Count, Doc, and optional Risksheet links from the same query.
9. `resources/datatables.css`, `resources/tableEffects.css`, `resources/datatables.js`, and `resources/tableEffects.js` are loaded through widget resource XHR helpers.
10. `prepareHeadersMacro` and `prepareDataRowsMacro` create maps and arrays of data using Velocity to pass onto DataTables for rendering through `#initDataTableMacro ( $widgetTableId $headersKeys $headersMap $headerFilterTypesMap $headerFilterOptionsMap $headerGlobalSearchMap $dataRows $tableSettings )`.
11. DataTables renders the table with multi-sort, smart column filters, optional export controls, optional global search, optional paging, fixed header, and safe table styling. Project, Space, and Document use catalog-style filters; date fields use inclusive date-range filters; computed count columns use zero/non-zero filters; and other rendered columns use row-derived list filters.

## Rendered Columns

| Column | Source |
|--------|--------|
| Project | `docu.fields().project().render()` |
| Space | `docu.space().render()` |
| Document | `docu.render().withIcon().withLinks(true)` |
| Document fields | `docu.fields().get($fieldId).render()` for each field in `columnFields` |
| Signatures | `docu.fields().workflowSignatures().toArrayList` |
| Document baselines | Baseline objects whose base object points to the LiveDoc |
| Branched documents | Readable branch targets from the source LiveDoc |
| Master document | Readable branched-from or derived-from source document |
| Unresolved comments | Root comments still unresolved on the LiveDoc |
| Recycle Bin | Grouped unreferenced work item identities for the LiveDoc |
| Approved versions | Approved workflow transition revisions readable by the user |
| Additional query columns | Work item count, `Doc` link, and optional `Risksheet` link for each configured Lucene query |

## Additional Query Columns

Each configured entry in `columns` must have:

| Field | Description |
|-------|-------------|
| `title` | Column header text. |
| `query` | Lucene query appended to the document work item query. |

Each cell in an additional query column shows:

- A linked work item count.
- A `Doc` link to the same query filtered in the LiveDoc.
- An optional `Risksheet` link to the same query filtered on the Risksheet tab.

The final query shape is:

```text
document-work-item-query AND (configured-column-query) AND (NOT (recycle-bin-query))
```

The Recycle Bin exclusion is added only when the LiveDoc has readable unreferenced work item identities.

## Deployment

Zip this widget folder and upload the zip in Polarion Administration under Velocity Widgets.

The archive should have exactly one top-level folder: `tsb.livedoc.matrix/`.
Inside that top-level folder, the archive must contain `render.vm`, `parameters.vm`, `widget.properties`, and `resources/`.
Do not place those files directly at the zip root, and do not add extra top-level folders or files; Polarion can reject that with a "too many entries" upload error.

## Shared macros

**This widget uses shared macros by importing `/velocity-scripts/tsb.framework.vm`.**

To use macros from another Velocity file in Polarion, place the macro file in `/.polarion/pages/scripts/velocity` in the **Repository Browser**.

If you cannot access **Repository Browser** yet, navigate to `Administration` -> `Portal` -> `Topics` -> `Create New Topics Configuration`, then add `<topic id="repository_browser"/>`. Click Save. Navigate back to the project, then create this directory: `/.polarion/pages/scripts/velocity`, and add the shared macro file there.

After the file is in that directory, import it from the widget file. For this widget, `render.vm` imports `tsb.framework.vm` and can then use the macros defined in that file.
