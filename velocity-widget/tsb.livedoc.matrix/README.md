# tsb.livedoc.matrix

**TSB LiveDoc Matrix** — document matrix widget for Polarion.

| Property | Value |
|----------|--------|
| Widget id | `tsb.livedoc.matrix` |
| Label | TSB LiveDoc Matrix 1.3 |
| Polarion path | `.polarion/pages/widgets/tsb.livedoc.matrix` |

## Feature Matrix

| Feature | Supported | Notes |
|---------|-----------|-------|
| Data Set (Scope, query type, document type, query) | Yes | Uses `dataSet`; rendering requires a single-project scope. |
| Show Signatures Status | Yes | Adds a signatures column when enabled |
| Show Unresolved Comments | No (Planned) | Defined as a parameter, but not rendered yet. |
| Show Project | Yes | Adds a project column when enabled. |
| Show Space | Yes | Adds a space column when enabled. |
| Show Fields as Columns | Yes | Renders selected document fields from `columnFields` (for example: `author`, `updated`, `status`). |
| Additional Columns | Yes | Supports repeatable `title + query` columns; each cell shows a clickable work item link and a `Doc` link. |

## Zip and upload

From `velocity-widget/tsb.livedoc.matrix`:

1. Right-click folder `tsb.livedoc.matrix` → Send to compressed folder.
2. Polarion → **Administration** → **Velocity Widgets** → **Upload**.
