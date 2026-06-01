# tsb.polarion.widgets

Custom **Velocity widgets** for [Siemens Polarion ALM](https://plm.sw.siemens.com/en-US/polarion/), maintained by [Trinity Software & Beyond Ltd.](https://github.com/trinitysoftware)

This repository packages Polarion page widgets as version-controlled source. **All Velocity widgets live under [`velocity-widget/`](velocity-widget/)** — each widget in its own dot-named folder (e.g. `tsb.livedoc.matrix/`). Zip a widget folder and upload it through Polarion Administration.

## What's in this repo

The [`velocity-widget/`](velocity-widget/) folder holds **all** Velocity widget deliverables for this repository. Add new widgets as sibling folders alongside the ones listed below.

| Widget | Folder | Description |
|--------|--------|-------------|
| **TSB LiveDoc Matrix** | [`velocity-widget/tsb.livedoc.matrix/`](velocity-widget/tsb.livedoc.matrix/) | Matrix report for a single-project data set with configurable columns, optional context fields (project/space/signatures), and clickable links to matching work items and document view. |

See [`velocity-widget/tsb.livedoc.matrix/README.md`](velocity-widget/tsb.livedoc.matrix/README.md) for widget-specific configuration, feature comparison with related TSB widgets, and changelog.

## Requirements

- Polarion ALM with **Velocity Widgets** enabled
- Widget folder / zip name must match the widget id (≤ 30 characters), e.g. `tsb.livedoc.matrix`

## Deploy a widget

1. Zip the widget folder so the archive root contains the widget files (`render.vm`, `parameters.vm`, `widget.properties`, etc.), not an extra parent directory.
   - On Windows: right-click `tsb.livedoc.matrix` → **Send to** → **Compressed (zipped) folder**.
2. In Polarion: **Administration** → **Velocity Widgets** → **Upload**.
3. Add the widget to a Live Report or page; configure parameters in the widget UI.

## Repository layout

```
tsb.polarion.widgets/
├── README.md                                      # This file
└── velocity-widget/                               # All Velocity widgets (one folder per widget)
    └── tsb.livedoc.matrix/                        # LiveDoc work items matrix widget
        ├── render.vm                              # Table rendering and counts
        ├── parameters.vm                          # Widget configuration UI
        ├── description.vm                         # Help text in Polarion
        ├── details.vm
        ├── dependencies.vm
        ├── widget.properties                      # Label and tags
        ├── CHANGELOG.md
        ├── LICENSE
        └── README.md
```

## Development

Widgets are implemented in **Apache Velocity** (`.vm` files). Edit the `.vm` files in the widget folder, re-zip, and re-upload to Polarion to see the changes.

Parameter and behavior notes for the current widget are documented in [`velocity-widget/tsb.livedoc.matrix/description.vm`](velocity-widget/tsb.livedoc.matrix/description.vm) and [`velocity-widget/tsb.livedoc.matrix/CHANGELOG.md`](velocity-widget/tsb.livedoc.matrix/CHANGELOG.md)
