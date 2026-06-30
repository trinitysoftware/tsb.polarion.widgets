# trial-widget-5

Trial Polarion Velocity widget for rendering a LiveDoc document matrix with DataTables.

| Property | Value |
|----------|-------|
| Widget folder | `trial-widget-5` |
| Label | `trial5` |
| Tags | `trials` |

## Current Rendering Flow

1. Velocity reads widget parameters and fetches documents from the configured `dataSet`.
2. Velocity builds `widgetData.headers` with `headersJson()`.
3. Velocity builds `widgetData.rows` with `rowsJson($rowTitles)`.
4. `resources/datatables.css` and `resources/datatables.js` are loaded through widget resource XHR helpers.
5. `initDataTableMacro()` instantiates DataTables with:

```javascript
new DataTable(tableEl, {
    columns: columns,
    data: widgetData.rows
});
```

## Data Contract

`headersJson()` outputs DataTables column metadata:

```javascript
[
    { "title": "Project", "key": "project" },
    { "title": "Document", "key": "documentHtml" },
    { "title": "Status", "key": "status" }
]
```

`rowsJson($rowTitles)` outputs row objects using matching keys:

```javascript
[
    {
        "project": "...rendered project HTML...",
        "documentHtml": "...rendered document link HTML...",
        "status": "...rendered field HTML..."
    }
]
```

DataTables maps each column with:

```javascript
{
    title: header.title,
    data: header.key
}
```

## Rendered Values

Row cell values are rendered by Velocity before they are passed to JavaScript.

- Project uses `fields().project().render()`.
- Document uses `render().withIcon().withLinks(true)`.
- Configured custom fields use `fields().get($fieldId).render()`.
- Signatures use `workflowSignatures().toArrayList`, skip `obsolete` and `notAvailable`, and append rendered signature HTML into `signatureHtml`.

## Supported Parameters

| Parameter | Behavior |
|-----------|----------|
| `dataSet` | Provides project scope and document query. Rendering requires a single project. |
| `showProject` | Adds the Project column and `project` row value. |
| `showSpace` | Adds the Space column and `space` row value. |
| `showSignaturesStatus` | Adds the Signatures column and `signatureHtml` row value. |
| `columnFields` | Comma-separated document field IDs rendered as additional columns. |

## Notes

- The table mount is `<table id="widget-table" style="width:100%;table-layout:fixed;"></table>`.
- DataTables creates the visible table from `widgetData.headers` and `widgetData.rows`.
- Widget-local JS/CSS resources are loaded by XHR because Polarion widget resources are not loaded with normal `<script src>` / `<link href>` tags.
