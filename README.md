# tsb.polarion.widgets

Polarion Velocity widget source for `tsb.livedoc.matrix`.

## What's in this repo

| Item | Folder | Description |
|------|--------|-------------|
| **TSB LiveDoc Matrix 3.0** | [`velocity-widget/tsb.livedoc.matrix/`](velocity-widget/tsb.livedoc.matrix/) | Polarion widget that renders one table row per LiveDoc from a single-project Data Set. It shows the document, optional project and space columns, selected document fields, optional signatures, and configured query-count columns with work item and document links. |
| **TSB Velocity Framework** | [`velocity-scripts/`](velocity-scripts/) | Shared Velocity macros used by the widget to load local CSS/JS resources, convert Velocity table data to JavaScript, and initialize DataTables. |

## Contents

| Path | Description |
|------|-------------|
| [`velocity-widget/tsb.livedoc.matrix/`](velocity-widget/tsb.livedoc.matrix/) | Uploadable Polarion Velocity widget folder. |
| [`velocity-widget/tsb.livedoc.matrix/render.vm`](velocity-widget/tsb.livedoc.matrix/render.vm) | Builds the LiveDoc matrix data and renders it with DataTables. |
| [`velocity-widget/tsb.livedoc.matrix/parameters.vm`](velocity-widget/tsb.livedoc.matrix/parameters.vm) | Defines the widget parameters shown in Polarion. |
| [`velocity-widget/tsb.livedoc.matrix/description.vm`](velocity-widget/tsb.livedoc.matrix/description.vm) | Help text shown for the widget parameters. |
| [`velocity-widget/tsb.livedoc.matrix/details.vm`](velocity-widget/tsb.livedoc.matrix/details.vm) | Widget details text shown in Polarion. |
| [`velocity-widget/tsb.livedoc.matrix/dependencies.vm`](velocity-widget/tsb.livedoc.matrix/dependencies.vm) | Polarion widget dependency file. It is currently empty except for the license header. |
| [`velocity-widget/tsb.livedoc.matrix/widget.properties`](velocity-widget/tsb.livedoc.matrix/widget.properties) | Widget label and tags. Current label: `TSB LiveDoc Matrix 3.0`. |
| [`velocity-widget/tsb.livedoc.matrix/resources/datatables.js`](velocity-widget/tsb.livedoc.matrix/resources/datatables.js) | DataTables JavaScript bundled with the widget. |
| [`velocity-widget/tsb.livedoc.matrix/resources/datatables.css`](velocity-widget/tsb.livedoc.matrix/resources/datatables.css) | DataTables CSS bundled with the widget. |
| [`velocity-widget/tsb.livedoc.matrix/icon.png`](velocity-widget/tsb.livedoc.matrix/icon.png) | Widget icon. |
| [`velocity-widget/tsb.livedoc.matrix/CHANGELOG.md`](velocity-widget/tsb.livedoc.matrix/CHANGELOG.md) | Widget change history. |
| [`velocity-widget/tsb.livedoc.matrix/LICENSE`](velocity-widget/tsb.livedoc.matrix/LICENSE) | BSD 3-Clause license for the widget. |
| [`velocity-widget/tsb.livedoc.matrix/README.md`](velocity-widget/tsb.livedoc.matrix/README.md) | Widget-specific notes. |
| [`velocity-scripts/tsb.framework.vm`](velocity-scripts/tsb.framework.vm) | Shared Velocity macros used by `render.vm` to load widget resources and initialize DataTables. |

## Deploy the widget

1. Zip the contents of [`velocity-widget/tsb.livedoc.matrix/`](velocity-widget/tsb.livedoc.matrix/).
2. Make sure the archive root contains `render.vm`, `parameters.vm`, `widget.properties`, and `resources/`.
3. Upload the zip in Polarion Administration under Velocity Widgets.
4. Add `TSB LiveDoc Matrix 3.0` to a Polarion page and configure its parameters.

## Repository layout

```
tsb.polarion.widgets/
+-- README.md
+-- velocity-scripts/
|   +-- tsb.framework.vm                         # Shared macros for CSS, JS, and DataTables setup
+-- velocity-widget/
    +-- tsb.livedoc.matrix/
        +-- render.vm                            # Builds LiveDoc rows, columns, counts, and links
        +-- parameters.vm                        # Defines Data Set, toggles, fields, and query columns
        +-- description.vm                       # Parameter help text shown in Polarion
        +-- details.vm                           # Widget details text shown in Polarion
        +-- dependencies.vm                      # Widget dependency file
        +-- widget.properties                    # Label and tags
        +-- icon.png                             # Widget icon
        +-- CHANGELOG.md                         # Widget change history
        +-- LICENSE                              # BSD 3-Clause license
        +-- README.md                            # Widget-specific notes
        +-- resources/
            +-- datatables.css                   # DataTables stylesheet
            +-- datatables.js                    # DataTables script
```

## Widget parameters

| Parameter | Description |
|-----------|-------------|
| `dataSet` | Selects the project scope and LiveDoc document query. |
| `showProject` | Shows or hides the Project column. |
| `showSpace` | Shows or hides the Space column. |
| `showSignaturesStatus` | Shows or hides the Signatures column. |
| `columnFields` | Comma-separated Polarion document field IDs shown as columns. |
| `columns` | Repeatable title and Lucene query pairs for additional count columns. |

## Development

Edit the `.vm` files in [`velocity-widget/tsb.livedoc.matrix/`](velocity-widget/tsb.livedoc.matrix/), then zip and upload the widget again.

[`velocity-widget/tsb.livedoc.matrix/render.vm`](velocity-widget/tsb.livedoc.matrix/render.vm) imports [`velocity-scripts/tsb.framework.vm`](velocity-scripts/tsb.framework.vm).

## Shared macros

To use macros from another Velocity file in Polarion, place the macro file in `/.polarion/pages/scripts/velocity` in the **Repository Browser**.

If you cannot access **Repository Browser** yet, navigate to `Administration` -> `Portal` -> `Topics` -> `Create New Topics Configuration`, then add `<topic id="repository_browser"/>`. Click Save. Navigate back to the project, then create this directory: `/.polarion/pages/scripts/velocity`, and add the shared macro file there.

After the file is in that directory, import it from the widget file. For this widget, `render.vm` imports `tsb.framework.vm` and can then use the macros defined in that file.


