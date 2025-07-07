# SnapTable React v3.0.0

**A Truly Headless React Table Library**

SnapTable React is a completely headless table library that provides only hooks and logic - no components, no HTML structure, no CSS. You have 100% control over your table's appearance and behavior.

## 🎯 What is "Headless"?

- **No UI components** - Only hooks that return state and handlers
- **No HTML structure** - You build your own `<table>`, `<div>`, or any markup
- **No CSS** - Zero styling opinions, complete visual control
- **Pure logic** - Column resizing, drag & drop, persistence, and table state management

## 📦 Installation

```bash
npm install snaptable-react
```

## 🚀 Quick Start

```tsx
import { useDataTable, useTable } from "snaptable-react";

function MyTable() {
  // Configure your table behavior
  const dataTable = useDataTable({
    key: "my-table",
    columns: [
      {
        key: "name",
        label: "Name",
        Cell: ({ data }) => <td>{data.name}</td>,
        resizeable: true,
      },
      {
        key: "email",
        label: "Email",
        Cell: ({ data }) => <td>{data.email}</td>,
        resizeable: true,
      },
    ],
    hasDraggableColumns: true,
    isStickyHeader: true,
    saveLayoutView: true,
  });

  // Get table state and handlers
  const tableState = useTable(dataTable, myData);

  // Build your own table with complete control
  return (
    <table style={{ width: "100%" }}>
      <thead>
        <tr>
          {tableState.columns.map((column, index) => {
            const props = tableState.getColumnProps(index);
            return (
              <th
                key={column.key}
                style={{ width: props.width }}
                draggable={props.isDraggable}
                onDragStart={props.onDragStart}
                onDragOver={props.onDragOver}
                onDrop={props.onDrop}
              >
                {column.label}
                {props.isResizable && (
                  <div
                    style={{
                      position: "absolute",
                      right: 0,
                      top: 0,
                      width: "5px",
                      height: "100%",
                      cursor: "col-resize",
                    }}
                    onMouseDown={(e) => props.onResizeStart(e.nativeEvent)}
                  />
                )}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {tableState.data.map((item) => {
          const rowProps = tableState.getRowProps(item);
          return (
            <tr key={item.key} onClick={rowProps.onClick}>
              {tableState.columns.map(({ key, Cell }) => (
                <Cell key={key} data={item} />
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
```

## 🔧 Core Hooks

### `useDataTable(config)`

Configure your table's behavior and structure.

```tsx
const dataTable = useDataTable({
  key: 'unique-table-id',           // For layout persistence
  columns: [...],                   // Column definitions
  hasDraggableColumns: true,        // Enable column reordering
  isStickyHeader: true,             // Sticky header behavior
  saveLayoutView: true,             // Persist column widths/order
  onRowClick: ({ item }) => {...}   // Row click handler
});
```

### `useTable(dataTable, data)`

Get table state and event handlers for your markup.

```tsx
const tableState = useTable(dataTable, data);

// Available properties:
tableState.columns; // Column definitions
tableState.data; // Table data
tableState.config; // Table configuration
tableState.columnWidths; // Current column widths
tableState.draggedIndex; // Currently dragged column
tableState.hoveredIndex; // Currently hovered column

// Available methods:
tableState.getColumnProps(index); // Get all props for a column header
tableState.getRowProps(item); // Get all props for a row
```

## 📋 Column Definition

```tsx
{
  key: 'field-name',                    // Data field key
  label: 'Display Name',               // Column header text
  Cell: ({ data, ...props }) => <td>{data.field}</td>,  // Cell renderer
  resizeable: true,                    // Enable column resizing
  width: 200,                          // Initial width (optional)
  minWidth: 100,                       // Minimum width (optional)
  maxWidth: 500                        // Maximum width (optional)
}
```

## 🎨 Styling Examples

### Basic Table

```tsx
// Your CSS
.my-table {
  width: 100%;
  border-collapse: collapse;
}

.my-header {
  background: #f5f5f5;
  padding: 12px;
  border: 1px solid #ddd;
}

.my-cell {
  padding: 12px;
  border: 1px solid #ddd;
}
```

### Advanced Styling

```tsx
// Complete control over appearance
const StyledCell = ({ data, ...props }) => (
  <td
    {...props}
    className={`cell ${data.status === "active" ? "active" : "inactive"}`}
    style={{
      padding: "16px",
      background: data.priority === "high" ? "#fee" : "white",
      borderLeft: `4px solid ${data.color}`,
      transition: "all 0.2s ease",
    }}
  >
    <div className="cell-content">
      <span className="primary">{data.name}</span>
      <span className="secondary">{data.description}</span>
    </div>
  </td>
);
```

### Grid Layout (Non-Table)

```tsx
// Use divs instead of table elements
return (
  <div className="grid-container">
    <div className="grid-header">
      {tableState.columns.map((column, index) => {
        const props = tableState.getColumnProps(index);
        return (
          <div
            key={column.key}
            className="grid-header-cell"
            style={{ width: props.width }}
            draggable={props.isDraggable}
            onDragStart={props.onDragStart}
            // ... other props
          >
            {column.label}
          </div>
        );
      })}
    </div>
    <div className="grid-body">
      {tableState.data.map((item) => (
        <div key={item.key} className="grid-row">
          {tableState.columns.map(({ key, Cell }) => (
            <Cell key={key} data={item} />
          ))}
        </div>
      ))}
    </div>
  </div>
);
```

## ⚡ Features

- **Column Resizing** - Drag column borders to resize
- **Column Reordering** - Drag & drop column headers to reorder
- **Sticky Headers** - Keep headers visible while scrolling
- **Layout Persistence** - Save column widths and order to localStorage
- **Row Click Handlers** - Handle row interactions
- **Flexible Data** - Works with any data structure
- **TypeScript** - Full TypeScript support with proper types
- **Zero Dependencies** - No external dependencies except React
- **Tiny Bundle** - Only the logic you need, no UI bloat

## 🔄 Migration from v2.x

**v2.x had components:**

```tsx
// OLD - Had built-in components
import { SnapTable } from "snaptable-react";
<SnapTable dataTable={config} data={data} />;
```

**v3.x is purely headless:**

```tsx
// NEW - Only hooks, you build the UI
import { useDataTable, useTable } from "snaptable-react";
const tableState = useTable(dataTable, data);
// Build your own <table> or <div> structure
```

## 📚 Examples

Check the `/examples` folder for complete implementation examples:

- **Basic Table** - Simple table with resizing and drag & drop
- **Advanced Styling** - Custom cell renderers and complex layouts
- **Grid Layout** - Using divs instead of table elements
- **Responsive Design** - Mobile-friendly implementations

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

---

**Remember:** This is a headless library. We provide the logic, you provide the UI. Build tables that perfectly match your design system! 🎨
