# TSB Velocity Framework

Shared Polarion Velocity macros used by Trinity widgets.

This folder is not a widget package. It contains reusable framework files that widgets can import from Polarion's shared Velocity script location.

## Contents

| Path | Description |
|------|-------------|
| [`tsb.framework.vm`](tsb.framework.vm) | Shared macros for loading widget resources, serializing table data, and initializing DataTables. |
| [`CHANGELOG.md`](CHANGELOG.md) | Change history for the shared framework only. |
| [`LICENSE`](LICENSE) | BSD 3-Clause license. |

## Provided Macros

| Macro | Description |
|-------|-------------|
| `#loadWidgetJsResource($js)` | Loads a JavaScript file from the current widget's resources. |
| `#loadJsResource($url)` | Loads and executes a JavaScript file from a resolved URL. |
| `#loadWidgetCssResource($css)` | Loads a CSS file from the current widget's resources. |
| `#loadCssResource($url)` | Loads CSS from a resolved URL and injects it into a generated style element. |
| `#renderWidgetDataMacro(...)` | Converts Velocity header and row maps into JavaScript data for DataTables. |
| `#initDataTableMacro(...)` | Renders the table shell and initializes DataTables with filters, ordering, paging, export controls, and table styling. |

## Usage

Place `tsb.framework.vm` in Polarion's shared Velocity script directory:

```text
/.polarion/pages/scripts/velocity
```

Then import it from a widget render file:

```velocity
#import("tsb.framework.vm")
```

Widgets should keep widget-specific behavior outside this framework. Pass table-specific behavior through the framework inputs, especially `tableSettings`, header metadata, filter metadata, and prepared row values.

## DataTables Contract

`#initDataTableMacro` expects the caller to provide:

| Argument | Description |
|----------|-------------|
| `$widgetTableId` | Unique table element id for the current widget instance. |
| `$headersKeys` | Ordered list of column keys. |
| `$headersMap` | Map of column key to display title. |
| `$headerFilterTypesMap` | Map of column key to filter type, such as `catalog`, `date`, `number`, or `list`. |
| `$headerFilterOptionsMap` | Optional map of column key to explicit filter options. |
| `$headerGlobalSearchMap` | Map controlling whether a column contributes to global search. |
| `$dataRows` | List of row maps keyed by column id. |
| `$tableSettings` | Display and behavior settings such as height, paging, export buttons, messages, and default sort keys. |

Rows may include semantic values beside rendered HTML:

| Key Pattern | Purpose |
|-------------|---------|
| `__tsbFilterValue_<columnKey>` | Raw value used for column filtering and sorting. |
| `__tsbSearchValue_<columnKey>` | Clean value used for global search. |

## Notes

- Keep this framework generic so it can be shared by multiple widgets.
- Do not hard-code widget-specific column names, labels, or domain rules in `tsb.framework.vm`.
- Prefer DataTables and ColumnControl built-in behavior when it covers the needed interaction.
- Add custom framework behavior only when multiple widgets can reuse it or DataTables cannot provide the behavior directly.
