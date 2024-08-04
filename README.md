# SnapTable-React

`snaptable-react` is a React package that allows you to create highly customizable tables with features like drag-and-drop columns, resizable columns, and persistent layout views.

## Features

- **Drag and Drop Columns**: Easily reorder columns by dragging and dropping.
- **Resizable Columns**: Adjust the width of columns by dragging the edges (unless a fixed width is set).
- **Persistent Layout Views**: Save the table layout so it persists after a page refresh.

## Installation

Install the package using npm or yarn:

```bash
npm install snaptable-react
# or
yarn add snaptable-react
```

# Usage

## Basic Example

Below is a basic example of how to use snaptable-react to create a custom table.

##### Note
snaptable-react does not come with any CSS. You are free to style your table as you like using your own CSS.
#### Import the SnapTable Component and useDataTable Hook

```
import { SnapTable, useDataTable, SnapTableType } from 'snaptable-react';
```

#### Define Your Columns Structure
Each column should have the following properties: key, label, Cell, and optionally resizable and width.
```
const columns = [
  { key: 'name', label: 'Name', resizable: true, Cell: ({ name }) => <td>{name}</td> },
  { key: 'age', label: 'Age', resizable: true, Cell: ({ age }) => <td>{age}</td> },
  { key: 'email', label: 'Email', width: 200, Cell: ({ email }) => <td>{email}</td> },
  // Add more columns as needed
];
```

#### Use the useDataTable Hook
Pass the columns and table properties to the useDataTable hook.

```
const dataModel = useDataTable({
  key, // string name for the table
  columns,
  hasDraggableColumns?: true, // Enable/Disable drag-and-drop columns. (default true)
  saveLayoutView?: true, // Enable/Disable saving the layout view (default false)
});
```

#### Create Your Custom Table Component
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

#### Putting it all together
Now you have your own styled table, and you can create as many tables as you want like this:

```
import { useDataTable } from 'snaptable-react';
import StyledTable from './path-of-styled-table'

const tableColumns = [
  { key: 'name', label: 'Name', resizable: true, Cell: ({ name }) => <td>{name}</td> },
  { key: 'age', label: 'Age', resizable: true, Cell: ({ age }) => <td>{age}</td> },
  { key: 'email', label: 'Email', width: 200, Cell: ({ email }) => <td>{email}</td> },
  // Add more columns as needed
];

const data = [
  { key: 1, name: 'John Doe', age: 28, email: 'john@example.com' },
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

## Props

### useDataTable Hook

The `useDataTable` hook accepts an object with the following properties:

- **data** (array): Array of items, all items must have a key. each item is a row
- **columns** (array): Array of column definitions.
- **hasDraggableColumns** (boolean): Enable/Disable drag-and-drop columns.
- **saveLayoutView** (boolean): Enable/Disable saving the layout view.



### SnapTable Component

The `SnapTable` component accepts the following props:

- **data** (array): Array of items, where each item must have a key.
- **dataModel** (object): The data model returned from the `useDataTable` hook.
- **tableContainerClass?** (string): classname to change table-container(div) element's css style
- **tableClass?** (string): classname to change <table> element's css style
- **bodyClass?** (string): classname to change <body> element's css style
- **headerRowClass?** (string): classname to change header-row <tr> element's css style
- **rowClass?** (string): classname to change row <tr> element's css style
- **headerCellClass?** (string): classname to change header-cell <th> element's css style
- **cellClass?** (string): classname to change cell <td> element's css style


## Working Example: 
https://github.com/gilitz/snaptable-react

just clone, run ```npm install``` and then ```npm run dev``` 
