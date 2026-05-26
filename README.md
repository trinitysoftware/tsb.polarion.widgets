# tsb.livedoc.meta.v1

**TSB LiveDoc Document Status** — document rows with lifecycle metadata (not work item counts).

| | |
|---|---|
| **Widget id** | `tsb.livedoc.meta.v1` |
| **Label** | TSB LiveDoc Document Status |
| **Polarion path** | `.polarion/pages/widgets/tsb.livedoc.meta.v1/` |

## vs `tsb.livedoc.matrix.v1`

| | LiveDoc matrix | This widget |
|---|---|---|
| Rows | One per document | One per document |
| Columns | Work item counts by status enum | Document **status**, **last editor**, **last updated** |
| Needs Work Item Type | Yes | No |

## Upload

Zip folder `tsb.livedoc.meta.v1` → **Administration** → **Documents and Pages** → **Velocity Widgets** → **Upload**.

## Parameters

- **Data Set** — Document prototype, single project, Lucene query (`*` or `space:…`).
- **Sort by Last Updated** — Newest first (default on).
- **Show Space Column** — Optional.

## Last editor field

Tries document fields in order: `updatedBy`, `author`, `modifiedBy`. If all are empty, the cell shows **—** (check your project’s document field ids in Administration).
