# TSB LiveDoc Matrix 3.0

Polarion Velocity widget for rendering a LiveDoc matrix with DataTables.

| Property | Value |
|----------|-------|
| Widget id | `tsb.livedoc.matrix` |
| Widget folder | `velocity-widget/tsb.livedoc.matrix/` |
| Label | `TSB LiveDoc Matrix 3.0` |
| Tags | `Trinity` |

## Contents

| Path | Description |
|------|-------------|
| [`render.vm`](render.vm) | Builds the LiveDoc rows, table headers, document field cells, signature cells, and additional query-count cells. |
| [`parameters.vm`](parameters.vm) | Defines the Data Set parameter, display toggles, document field list, and additional query columns. |
| [`description.vm`](description.vm) | Describes the widget parameters in Polarion. |
| [`details.vm`](details.vm) | Describes the widget in Polarion. |
| [`dependencies.vm`](dependencies.vm) | Widget dependency file. It is currently empty except for the license header. |
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
| `dataSet` | None | Selects the Polarion project scope and LiveDoc document query. Rendering requires one project. |
| `showProject` | `true` | Adds the Project column. |
| `showSpace` | `true` | Adds the Space column. |
| `showSignaturesStatus` | `true` | Adds the Signatures column. Obsolete and not available signatures are skipped. |
| `columnFields` | `status,updated` | Comma-separated document field IDs rendered as table columns. |
| `columns` | Empty | Repeatable additional columns. Each entry has a title and Lucene query. |

## Rendering Flow

1. `render.vm` imports `tsb.framework.vm`.
2. `render.vm` reads `dataSet.scope().projectId()` and stops with a warning if no project is selected.
3. `render.vm` searches documents using the Data Set document query.
4. Each resolved LiveDoc becomes one table row.
5. Header and row maps are built in Velocity.
6. `resources/datatables.css` and `resources/datatables.js` are loaded through widget resource XHR helpers.
7. `prepareHeadersMacro` and `prepareDataRowsMacro` create a map and array of data using Velocity to pass onto datatables for rendering through `#initDataTableMacro ( $widgetTableId $headersKeys $headersMap $dataRows )`. 
8. DataTables renders the table.

## Rendered Columns

| Column | Source |
|--------|--------|
| Project | `docu.fields().project().render()` |
| Space | `docu.space().render()` |
| Document | `docu.render().withIcon().withLinks(true)` |
| Document fields | `docu.fields().get($fieldId).render()` for each field in `columnFields` |
| Signatures | `docu.fields().workflowSignatures().toArrayList` |
| Additional query columns | Work item count and `Doc` link for each configured Lucene query |

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
