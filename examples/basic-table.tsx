import React from 'react';
import { useDataTable, useTable } from '../src';
import './basic-table.css';

interface Person extends Record<string, unknown> {
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
        Cell: ({ data }) => <td className="cell">{(data as unknown as Person).name}</td>,
        resizeable: true,
        width: 200,
      },
      {
        key: 'email',
        label: 'Email',
        Cell: ({ data }) => <td className="cell">{(data as unknown as Person).email}</td>,
        resizeable: true,
        width: 250,
      },
      {
        key: 'role',
        label: 'Role',
        Cell: ({ data }) => <td className="cell">{(data as unknown as Person).role}</td>,
        resizeable: true,
        width: 150,
      },
      {
        key: 'department',
        label: 'Department',
        Cell: ({ data }) => <td className="cell">{(data as unknown as Person).department}</td>,
        resizeable: true,
        width: 180,
      },
    ],
    hasDraggableColumns: true,
    isStickyHeader: true,
    hasStickyColumns: true, // Enable sticky columns functionality
    saveLayoutView: true,
    onRowClick: ({ item }) => {
      console.log('Row clicked:', item);
      alert(`Clicked on ${(item as unknown as Person).name}`);
    },
  });

  // Get table state and handlers
  const tableState = useTable(dataTable, data);

  return (
    <div className="table-container">
      <h2>SnapTable React v3.1.0 - Headless Table with Sticky Columns</h2>
      <p>This example demonstrates the new sticky columns feature along with column resizing, drag & drop reordering, and layout persistence.</p>
      <p><strong>Try these features:</strong> Drag column headers to reorder • Drag column borders to resize • Click "📌/📍" to toggle sticky columns • Click rows for interactions</p>
      
      {/* Sticky Column Controls */}
      <div className="sticky-controls">
        <h4>📌 Sticky Column Controls:</h4>
        <div className="sticky-buttons">
          {tableState.columns.map((column, index) => {
            const props = tableState.getColumnProps(index);
            return (
              <button
                key={column.key}
                className={`sticky-control-btn ${props.isSticky ? 'active' : ''}`}
                onClick={(e) => props.onToggleSticky(e.currentTarget)}
                title={props.isSticky ? `Unpin ${column.label}` : `Pin ${column.label} to left`}
              >
                {props.isSticky ? '📌' : '📍'} {column.label}
              </button>
            );
          })}
        </div>
      </div>
      
      <div className="table-wrapper">
        <table className="table">
          <thead className="table-header">
            <tr>
              {tableState.columns.map((column, index) => {
                const props = tableState.getColumnProps(index);
                const isLastColumn = index === tableState.columns.length - 1;
                return (
                  <th
                    key={column.key}
                    className={`header-cell ${props.isSticky ? 'sticky' : ''} ${!isLastColumn ? 'has-border' : ''}`}
                    style={{ 
                      width: props.width,
                      left: props.isSticky ? `${props.stickyOffset}px` : undefined,
                      position: props.isSticky ? 'sticky' : 'relative',
                      zIndex: props.isSticky ? 10 : 1,
                    }}
                    draggable={props.isDraggable}
                    onDragStart={(e) => props.onDragStart(e.nativeEvent as DragEvent)}
                    onDragOver={(e) => props.onDragOver(e.nativeEvent as DragEvent)}
                    onDrop={(e) => props.onDrop(e.nativeEvent as DragEvent)}
                  >
                    <div className="header-content">
                      <span className="header-label">{column.label}</span>
                      <div className="header-actions">
                        <button
                          className={`sticky-toggle ${props.isSticky ? 'active' : ''}`}
                          onClick={(e) => props.onToggleSticky(e.currentTarget)}
                          title={props.isSticky ? 'Unpin column' : 'Pin column to left'}
                        >
                          {props.isSticky ? '📌' : '📍'}
                        </button>
                        {props.isResizable && (
                          <div
                            className="resize-handle"
                            onMouseDown={(e) => props.onResizeStart(e.nativeEvent)}
                          />
                        )}
                      </div>
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
                <tr key={(item as unknown as Person).id} className="table-row" onClick={rowProps.onClick}>
                  {tableState.columns.map((column, columnIndex) => {
                    const cellProps = tableState.getCellProps(columnIndex);
                    const isLastColumn = columnIndex === tableState.columns.length - 1;
                    return (
                      <td
                        key={column.key}
                        className={`cell ${cellProps.isSticky ? 'sticky' : ''} ${!isLastColumn ? 'has-border' : ''}`}
                        style={{
                          width: cellProps.width,
                          left: cellProps.isSticky ? `${cellProps.stickyOffset}px` : undefined,
                          position: cellProps.isSticky ? 'sticky' : 'relative',
                          zIndex: cellProps.isSticky ? 5 : 1,
                        }}
                      >
                        {column.Cell({ data: item })}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <div className="info-panel">
        <h3>🎯 SnapTable React v3.1.0 Features:</h3>
        <ul>
          <li><strong>Truly Headless</strong> - Only hooks and logic, zero UI components</li>
          <li><strong>Complete Control</strong> - Build your own HTML structure and CSS styling</li>
          <li><strong>Sticky Columns (NEW)</strong> - Pin columns to the left with precise positioning</li>
          <li><strong>Column Resizing</strong> - Drag borders to resize with actual DOM width calculations</li>
          <li><strong>Drag & Drop</strong> - Reorder columns with smart constraints</li>
          <li><strong>State Persistence</strong> - All settings saved to localStorage</li>
          <li><strong>TypeScript</strong> - Full type safety with nullish coalescing (??) operators</li>
        </ul>
        
        <h4>📌 New Sticky Columns Feature:</h4>
        <ul>
          <li><strong>Bulletproof Positioning</strong> - Uses actual DOM measurements for perfect alignment</li>
          <li><strong>Multiple Sticky Columns</strong> - Stack unlimited columns from left to right</li>
          <li><strong>Smart Constraints</strong> - Sticky columns only reorder among sticky, non-sticky among non-sticky</li>
          <li><strong>Dynamic Toggle</strong> - Click 📌/📍 buttons to pin/unpin columns at runtime</li>
          <li><strong>Resize Integration</strong> - Sticky positioning updates automatically when columns are resized</li>
          <li><strong>State Persistence</strong> - Sticky states are saved and restored on page refresh</li>
        </ul>
        
        <h4>🚀 Ready for Production:</h4>
        <ul>
          <li><strong>Zero Linting Errors</strong> - ESLint with strict TypeScript rules</li>
          <li><strong>Clean Code</strong> - All ?? operators, no debug logs, production-ready</li>
          <li><strong>Comprehensive Documentation</strong> - Complete README with examples</li>
          <li><strong>npm Ready</strong> - Built and ready for publishing</li>
        </ul>
      </div>
    </div>
  );
};

export default BasicTableExample; 