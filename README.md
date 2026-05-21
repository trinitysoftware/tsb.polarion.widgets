# tsb.livedoc.matrix.v1

**TSB LiveDoc Work Items Matrix** — new document matrix widget for Polarion testing.

| Property | Value |
|----------|--------|
| Widget id | `tsb.livedoc.matrix.v1` |
| Label | TSB LiveDoc Work Items Matrix |
| Polarion path | `.polarion/pages/widgets/tsb.livedoc.matrix.v1/` |

## New vs legacy `t1/` widgets

| Feature | This widget | `tsb.doc.items.by.enumeration.matrix` | `tsb.doc.items.by.query.matrix` |
|---------|-------------|--------------------------------------|----------------------------------|
| Document rows | Yes | Yes | Yes |
| Enum columns | Yes | Yes (status only) | No |
| Query columns | Yes | No | Yes |
| Row total column | Yes | No | No |
| Footer totals row | Yes | No | No |

## Zip and upload

From `new-widget-1/velocity-widget/`:

1. Right-click folder `tsb.livedoc.matrix.v1` → Send to compressed folder.
2. Polarion → **Administration** → **Velocity Widgets** → **Upload**.

Full checklist: [../../TEST-IN-POLARION.md](../../TEST-IN-POLARION.md)

## Minimal test configuration

- Data Set: Document, current project, query `*`
- Work Item Type: `requirement` (or your type)
- Column Enumeration: `status`
- Apply
