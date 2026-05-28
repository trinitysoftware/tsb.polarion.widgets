# tsb.livedoc.matrix V1.1

**TSB LiveDoc Work Items Matrix** — new document matrix widget for Polarion.

| Property | Value |
|----------|--------|
| Widget id | `tsb.livedoc.matrix` |
| Label | TSB LiveDoc Work Items Matrix |
| Polarion path | `.polarion/pages/widgets/tsb.livedoc.matrix` |

## Feature Matrix

| Feature | Supported |
|---------|-----------|
| Data Set — documents (single project) | Yes |
| Data Set — Lucene query (e.g. `*` or `space:Requirements`) | Yes |
| Document rows | Yes |
| Document column (linked title) | Yes |
| Status column | Yes |
| Last edited by column (`updatedBy`, then `author`) | Yes |
| Last updated column | Yes |
| Optional space column | Yes (parameter) |
| Sort by last updated (newest first) | Yes (parameter, default on) |
| Footer — project id and document count | Yes |

## Zip and upload

From `tsb.polarion.widgets/tsb.livedoc.matrix`:

1. Right-click folder `tsb.livedoc.matrix` → Send to compressed folder.
2. Polarion → **Administration** → **Velocity Widgets** → **Upload**.

