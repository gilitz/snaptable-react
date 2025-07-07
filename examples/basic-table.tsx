import * as React from 'react';
import { useDataTable, useTable } from '../src';
import './basic-table.css';

// Sample data type
interface Person {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
}

const BasicTableExample: React.FC = () => {
  // Sample data
  const data: Person[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Developer', department: 'Engineering' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Designer', department: 'Design' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager', department: 'Product' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'QA Engineer', department: 'Engineering' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Product Manager', department: 'Product' },
  ];

  // Configure table behavior
  const dataTable = useDataTable({
    key: 'basic-example-table',
    columns: [
      {
        key: 'name',
        label: 'Name',
        Cell: ({ data }: { data: Person }) => <td className="cell">{data.name}</td>,
        resizeable: true,
        width: 200,
      },
      {
        key: 'email',
        label: 'Email',
        Cell: ({ data }: { data: Person }) => <td className="cell">{data.email}</td>,
        resizeable: true,
        width: 250,
      },
      {
        key: 'role',
        label: 'Role',
        Cell: ({ data }: { data: Person }) => <td className="cell">{data.role}</td>,
        resizeable: true,
        width: 150,
      },
      {
        key: 'department',
        label: 'Department',
        Cell: ({ data }: { data: Person }) => <td className="cell">{data.department}</td>,
        resizeable: true,
        width: 180,
      },
    ],
    hasDraggableColumns: true,
    isStickyHeader: true,
    saveLayoutView: true,
    onRowClick: ({ item }) => {
      console.log('Row clicked:', item);
      alert(`Clicked on ${(item as Person).name}`);
    },
  });

  // Get table state and handlers
  const tableState = useTable(dataTable, data);

  return (
    <div className="table-container">
      <h2>Headless Table Example</h2>
      <p>This table demonstrates column resizing, drag & drop reordering, and layout persistence.</p>
      <p><strong>Try:</strong> Drag column headers to reorder • Drag column borders to resize • Click rows</p>
      
      <table className="table">
        <thead className="table-header">
          <tr>
            {tableState.columns.map((column, index) => {
              const props = tableState.getColumnProps(index);
              return (
                <th
                  key={column.key}
                  className="header-cell"
                  style={{ width: props.width }}
                  draggable={props.isDraggable}
                  onDragStart={(e) => props.onDragStart(e.nativeEvent as DragEvent)}
                  onDragOver={(e) => props.onDragOver(e.nativeEvent as DragEvent)}
                  onDrop={(e) => props.onDrop(e.nativeEvent as DragEvent)}
                >
                  <div className="header-content">
                    {column.label}
                    {props.isResizable && (
                      <div
                        className="resize-handle"
                        onMouseDown={(e) => props.onResizeStart(e.nativeEvent)}
                      />
                    )}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="table-body">
          {tableState.data.map((item) => {
            const rowProps = tableState.getRowProps(item);
            return (
              <tr key={item.id} className="table-row" onClick={rowProps.onClick}>
                {tableState.columns.map(({ key, Cell }) => (
                  <Cell key={key} data={item} />
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      
      <div className="info-panel">
        <h3>🎯 What you're seeing:</h3>
        <ul>
          <li><strong>Headless hooks</strong> providing all table logic</li>
          <li><strong>Your HTML</strong> - complete control over markup</li>
          <li><strong>Your CSS</strong> - complete control over styling</li>
          <li><strong>Drag & Drop</strong> - column reordering</li>
          <li><strong>Resizing</strong> - drag column borders</li>
          <li><strong>Persistence</strong> - layout saved to localStorage</li>
        </ul>
      </div>
    </div>
  );
};

export default BasicTableExample; 