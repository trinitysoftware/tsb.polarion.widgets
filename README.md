# tsb.polarion.widgets

Custom **Velocity widgets** for [Siemens Polarion ALM](https://plm.sw.siemens.com/en-US/polarion/), maintained by [Trinity Software & Beyond Ltd.](https://github.com/trinitysoftware)

This repository packages Polarion page widgets as version-controlled source. Each widget lives in its own folder (matching the widget id) and can be zipped and uploaded through Polarion Administration.

## What’s in this repo

| Widget | Folder | Description |
|--------|--------|-------------|
| **TSB LiveDoc Work Items Matrix** | [`tsb.livedoc.matrix/`](tsb.livedoc.matrix/) | Matrix report: **LiveDoc documents** as rows, **work item counts** as columns (by enumeration or Lucene query), with optional row totals and footer totals. |

See [`tsb.livedoc.matrix/README.md`](tsb.livedoc.matrix/README.md) for widget-specific configuration, feature comparison with related TSB widgets, and changelog.

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
velocity-widget-1/
├── README.md                 # This file
└── tsb.livedoc.matrix/       # LiveDoc work items matrix widget
    ├── render.vm             # Table rendering and counts
    ├── parameters.vm         # Widget configuration UI
    ├── description.vm        # Help text in Polarion
    ├── details.vm
    ├── dependencies.vm
    ├── widget.properties     # Label and tags
    ├── CHANGELOG.md
    ├── LICENSE
    └── README.md
```

## Development

Widgets are implemented in **Apache Velocity** (`.vm` files). Edit the `.vm` files in the widget folder, re-zip, and re-upload to Polarion to see the changes.

Parameter and behavior notes for the current widget are documented in [`tsb.livedoc.matrix/description.vm`](tsb.livedoc.matrix/description.vm) and [`tsb.livedoc.matrix/CHANGELOG.md`](tsb.livedoc.matrix/CHANGELOG.md)
