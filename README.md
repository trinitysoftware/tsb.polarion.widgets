# TSB Polarion Widgets

Polarion Velocity widget repository for TSB widgets and shared Velocity support scripts.

This repository is organized so each widget owns its own implementation and documentation. The root README is the catalog and repository-level guide; widget-specific behavior, parameters, and deployment notes belong in the README inside each widget folder.

## Widgets

| Widget | ID | Folder | Description |
|--------|----|--------|-------------|
| TSB LiveDoc Matrix 4.0 | `tsb.livedoc.matrix` | [`velocity-widget/tsb.livedoc.matrix/`](velocity-widget/tsb.livedoc.matrix/) | Permission-aware, baseline-aware LiveDoc matrix with document metadata, review state, baselines, branches, source documents, comments, recycle-bin counts, approved versions, and configurable query-count columns. |

## Shared Resources

| Resource | Path | Used For |
|----------|------|----------|
| TSB Velocity Framework | [`velocity-scripts/tsb.framework.vm`](velocity-scripts/tsb.framework.vm) | Shared Velocity macros for loading widget resources, converting Velocity data to JavaScript, and initializing DataTables. |

## Repository Layout

```text
tsb.polarion.widgets/
+-- README.md
+-- velocity-scripts/
|   +-- tsb.framework.vm
+-- velocity-widget/
    +-- tsb.livedoc.matrix/
        +-- README.md
        +-- CHANGELOG.md
        +-- LICENSE
        +-- render.vm
        +-- parameters.vm
        +-- description.vm
        +-- details.vm
        +-- dependencies.vm
        +-- widget.properties
        +-- icon.png
        +-- resources/
```

## Widget Documentation

Each widget folder should contain its own `README.md` with the information needed to understand, configure, and deploy that widget.

Widget README files should cover:

- widget purpose
- widget ID, label, tags, and folder name
- file contents
- parameters and defaults
- rendering flow
- rendered columns
- additional query or output behavior when applicable
- deployment/package requirements
- shared macro or shared resource usage
- changelog and license file references

## Packaging Widgets

Package one widget at a time. The zip archive must contain exactly one top-level folder: the widget folder.

For example, the LiveDoc Matrix archive should look like this:

```text
tsb.livedoc.matrix/
+-- render.vm
+-- parameters.vm
+-- widget.properties
+-- resources/
+-- ...
```

Do not place widget files directly at the zip root, and do not add unrelated top-level folders or files. Polarion can reject archives with an invalid top-level structure.

To build the LiveDoc Matrix widget from this repository:

```sh
cd velocity-widget
zip -r ../tsb.livedoc.matrix.zip tsb.livedoc.matrix
```

Upload the resulting zip in Polarion Administration under Velocity Widgets.

## Development Notes

Widget implementations live under `velocity-widget/<widget-id>/`.

Shared Velocity macros live under `velocity-scripts/`. If a widget imports a shared macro file, make sure the target Polarion instance has the macro file available in the expected repository location.

Keep widget-specific changes documented in that widget's `CHANGELOG.md` and `README.md`.
