# SnapTable-React

`snaptable-react` is a React package that allows you to create highly customizable tables with features like drag-and-drop columns, resizable columns, and persistent layout views.

## Features

- **Drag and Drop Columns**: Easily reorder columns by dragging and dropping.
- **Resizable Columns**: Adjust the width of columns by dragging the edges (unless a fixed width is set).
- **Persistent Layout Views**: Save the table layout so it persists after a page refresh.
- **Nested Header Columns**: Add second level row to header. each column's width will be half of parent

<br />

## Installation

Install the package using npm or yarn:

```bash
npm install snaptable-react
# or
yarn add snaptable-react
```

<br />

# Usage

## Basic Example

Below is a basic example of how to use snaptable-react to create a custom table.

#### Note ***
snaptable-react does not come with any CSS. You are free to style your table as you like using your own CSS.

<br />

### Import the SnapTable Component and useDataTable Hook

```
import { SnapTable, useDataTable, SnapTableType } from 'snaptable-react';
```

<br />

### Define Your Columns Structure
Each column should have the following properties: key, label, Cell, and optionally resizable and width.
```
const tableColumns = [
  { key: 'name', label: 'Name', resizable: true, Cell: ({ data }) => <td>{data.name}</td>, width: 200,
  nestedColumns: [
		{ key: 'nested1', label: 'nested 1', Cell: ({ data, ...props }: { data: any }) => <td {...props}>{data.nestedOne}</td> },
		{ key: 'nested2', label: 'nested 2', Cell: ({ data, ...props }: { data: any }) => <td {...props}>{data.nestedTwo}</td> },
	]},
  { key: 'age', label: 'Age', resizable: true, Cell: ({ data, ...props }) => <td {...props}>{data.age}</td> },
  { key: 'email', label: 'Email', width: 200, Cell: ({ data, ...props }) => <td {...props}>{data.email}</td> },
  
  // Add more columns as needed
];
```

<br />

### Use the useDataTable Hook
Pass the columns and table properties to the useDataTable hook.

```
const dataModel = useDataTable({
  key, // string name for the table
  columns,
  hasDraggableColumns?: true, // Enable/Disable drag-and-drop columns. (default true)
  saveLayoutView?: true, // Enable/Disable saving the layout view (default false)
});
```

<br />

### Create Your Custom Table Component
Wrap the SnapTable component, adding your own CSS to style the table.

```
const StyledTable = (props) => {
  return (
    <SnapTable {...props} tableContainerClass="table-container-class" tableClass='table-class' cellClass='cell-class' headerCellClass='header-cell-class' />
  );
};


.table-container-class {
   /* your css styles here */
}

.header-cell-class {
  /* your css styles here */
}

...
```

<br />

### Putting it all together
Now you have your own styled table, and you can create as many tables as you want like this:

```
import { useDataTable } from 'snaptable-react';
import StyledTable from './path-of-styled-table'

const tableColumns = [
  { key: 'name', label: 'Name', resizable: true, Cell: ({ data }) => <td>{data.name}</td>, width: 200,
  nestedColumns: [
		{ key: 'nested1', label: 'nested 1', Cell: ({ data, ...props }: { data: any }) => <td {...props}>{data.nestedOne}</td> },
		{ key: 'nested2', label: 'nested 2', Cell: ({ data, ...props }: { data: any }) => <td {...props}>{data.nestedTwo}</td> },
	]},
  { key: 'age', label: 'Age', resizable: true, Cell: ({ data, ...props }) => <td {...props}>{data.age}</td> },
  { key: 'email', label: 'Email', width: 200, Cell: ({ data, ...props }) => <td {...props}>{data.email}</td> },

  // Add more columns as needed
];

const data = [
  { key: 1, name: 'John Doe', age: 28, email: 'john@example.com', nested1: 'nested1', nested2: 'nested2' },
  { key: 2, name: 'Jane Smith', age: 34, email: 'jane@example.com' },
  // Add more data as needed
];

const TableExample = (() => {
	const dataTable = useDataTable({ key: 'gilitz-table', columns: tableColumns, saveLayoutView: true })
	return (
		<StyledTable dataTable={dataTable} data={data} />
	)
});
```

<br />

## Props

### useDataTable Hook

The `useDataTable` hook accepts an object with the following properties:

- **data** (array): Array of items, all items must have a key. each item is a row
- **columns** (array): Array of column definitions
- **hasDraggableColumns** (boolean): Enable/Disable drag-and-drop columns
- **saveLayoutView** (boolean): Enable/Disable saving the layout view
- **isStickyHeader** (boolean): Enable/Disable sticky header in table. you might need to adjust the max-height of the TableContainer (depends on the screen size and number of rows)
- **onRowClick** ({ item (the item for the row) }): when click on row run this function



### SnapTable Component

The `SnapTable` component accepts the following props:

- **data** (array): Array of items, where each item must have a key
- **dataModel** (object): The data model returned from the `useDataTable` hook
- **tableContainerClass?** (string): classname to change table-container (div) element's css style
- **tableClass?** (string): classname to change (table) element's css style
- **bodyClass?** (string): classname to change (body) element's css style
- **headerRowClass?** (string): classname to change header-row (tr) element's css style
- **rowClass?** (string): classname to change row (tr) element's css style
- **headerCellClass?** (string): classname to change header-cell (th) element's css style
- **nestedHeaderCellClass?** (string): classname to change header-cell (th) element's css style (if null, will use headerCellClass instead)
- **cellClass?** (string): classname to change cell (td) element's css style


### SnapTableType

The `SnapTableType` Type is for typescript usage

<br />
<br />

### Column Options:

Table `Column` can accepts the following props:

- **key** (string): key of the column
- **label** (string | JSX): label of the column (can be a string or jsx)
- **Cell** (ReactComponent): the component to render for this header type
- **resizeable?** (boolean): set if a column is resizeable or not
- **width?** (number): setting a constant width to a column if resizeable false / setting minWidth to a column of resizeable true
- **nestedColumns?** (array): array of nested columns (each column has key, label?, Cell)

<br />
<br />


## Working Example: 

Clone repo, run ```npm install``` and then ```npm run dev``` 

<br />
<br />

# Enjoy 
### Feel free to contact me for any question, suggestion or just a small talk :)
