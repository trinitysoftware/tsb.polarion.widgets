# TSB LiveDoc Matrix 4.0

Polarion Velocity widget for rendering a baseline-aware LiveDoc matrix with DataTables.

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
| [`icon.png`](icon.png) | Widget icon. |
| [`CHANGELOG.md`](CHANGELOG.md) | Change history for this widget. |
| [`LICENSE`](LICENSE) | BSD 3-Clause license. |
| [`../../velocity-scripts/tsb.framework.vm`](../../velocity-scripts/tsb.framework.vm) | Shared macros imported by `render.vm`. |

## Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| `dataSet` | None | Selects the LiveDoc source scope, query, optional Project Baseline, specific revision, and Collection inheritance behavior. |
| `matrixConfigurationPreset` | `custom` | Applies a recommended matrix setup or keeps Custom Configuration values. |
| `showProject` | `true` | Adds the Project column. |
| `showSpace` | `true` | Adds the Space column. |
| `showSignaturesStatus` | `true` | Adds the Signatures column. Obsolete and not available signatures are skipped. |
| `columnFields` | `status,updated` | Comma-separated document field IDs rendered as table columns. |
| `columns` | Empty | Repeatable additional columns. Each entry has a title and Lucene query. |
| `showExportButtons` | `true` | Shows DataTables copy, CSV, and Excel export actions. |
| `showSearchBar` | `true` | Shows the global DataTables search box. |
| `enablePaging` | `false` | Enables page-based rendering when large tables need pagination. |

## Rendering Flow

1. `render.vm` imports `tsb.framework.vm`.
2. `render.vm` resolves the active Data Set mode, revision context, and optional Collection inheritance.
3. Project Baseline or specific revision settings are applied when the selected scope supports them.
4. LiveDocs are collected from document search or directly from Collection elements.
5. Field metadata and filter options are prepared before headers are built.
6. Each resolved LiveDoc becomes one table row with rendered cells and semantic filter/search values.
7. `resources/datatables.css` and `resources/datatables.js` are loaded through widget resource XHR helpers.
8. `prepareHeadersMacro` and `prepareDataRowsMacro` create maps and arrays of data using Velocity to pass onto DataTables for rendering through `#initDataTableMacro ( $widgetTableId $headersKeys $headersMap $headerFilterTypesMap $headerFilterOptionsMap $headerGlobalSearchMap $dataRows $tableSettings )`.
9. DataTables renders the table with column filters, optional export controls, optional global search, and optional paging.

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
| Recycle Bin | Exact unreferenced work item identities for the LiveDoc |
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

## Deployment

Zip the contents of this folder and upload the zip in Polarion Administration under Velocity Widgets.

The zip root must contain `render.vm`, `parameters.vm`, `widget.properties`, and `resources/`.

## Shared macros

**This widget uses shared macros by importing `/velocity-scripts/tsb.framework.vm`.**

To use macros from another Velocity file in Polarion, place the macro file in `/.polarion/pages/scripts/velocity` in the **Repository Browser**.

If you cannot access **Repository Browser** yet, navigate to `Administration` -> `Portal` -> `Topics` -> `Create New Topics Configuration`, then add `<topic id="repository_browser"/>`. Click Save. Navigate back to the project, then create this directory: `/.polarion/pages/scripts/velocity`, and add the shared macro file there.

After the file is in that directory, import it from the widget file. For this widget, `render.vm` imports `tsb.framework.vm` and can then use the macros defined in that file.
