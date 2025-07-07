import './App.css';
import { useDataTable, useTable } from './index';

// Sample data type
interface Person {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
}

function App() {
  // Sample data
  const data: Person[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Developer', department: 'Engineering' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Designer', department: 'Design' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager', department: 'Product' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'QA Engineer', department: 'Engineering' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Product Manager', department: 'Product' },
    { id: 6, name: 'Diana Prince', email: 'diana@example.com', role: 'Developer', department: 'Engineering' },
    { id: 7, name: 'Ethan Hunt', email: 'ethan@example.com', role: 'Security Analyst', department: 'Security' },
    { id: 8, name: 'Fiona Green', email: 'fiona@example.com', role: 'Designer', department: 'Design' },
    { id: 9, name: 'George Lucas', email: 'george@example.com', role: 'Director', department: 'Creative' },
    { id: 10, name: 'Hannah White', email: 'hannah@example.com', role: 'Developer', department: 'Engineering' },
    { id: 11, name: 'Ian Malcolm', email: 'ian@example.com', role: 'Data Scientist', department: 'Analytics' },
    { id: 12, name: 'Julia Roberts', email: 'julia@example.com', role: 'HR Manager', department: 'Human Resources' },
    { id: 13, name: 'Kevin Hart', email: 'kevin@example.com', role: 'Comedian', department: 'Entertainment' },
    { id: 14, name: 'Lisa Simpson', email: 'lisa@example.com', role: 'Student', department: 'Education' },
    { id: 15, name: 'Mike Ross', email: 'mike@example.com', role: 'Lawyer', department: 'Legal' },
    { id: 16, name: 'Nancy Drew', email: 'nancy@example.com', role: 'Detective', department: 'Investigation' },
    { id: 17, name: 'Oscar Wilde', email: 'oscar@example.com', role: 'Writer', department: 'Creative' },
    { id: 18, name: 'Penny Lane', email: 'penny@example.com', role: 'Musician', department: 'Entertainment' },
    { id: 19, name: 'Quincy Jones', email: 'quincy@example.com', role: 'Producer', department: 'Entertainment' },
    { id: 20, name: 'Rachel Green', email: 'rachel@example.com', role: 'Fashion Buyer', department: 'Retail' },
  ];

  // Configure table behavior using headless hooks
  const dataTable = useDataTable({
    key: 'demo-table',
    columns: [
      {
        key: 'name',
        label: 'Name',
        Cell: ({ data }: { data: any }) => <td className="cell">{(data as Person).name}</td>,
        resizeable: true,
        width: 200,
      },
      {
        key: 'email',
        label: 'Email',
        Cell: ({ data }: { data: any }) => <td className="cell">{(data as Person).email}</td>,
        resizeable: true,
        width: 250,
      },
      {
        key: 'role',
        label: 'Role',
        Cell: ({ data }: { data: any }) => <td className="cell">{(data as Person).role}</td>,
        resizeable: true,
        width: 150,
      },
      {
        key: 'department',
        label: 'Department',
        Cell: ({ data }: { data: any }) => <td className="cell">{(data as Person).department}</td>,
        resizeable: true,
        width: 180,
      },
    ],
    hasDraggableColumns: true,
    isStickyHeader: true,
    saveLayoutView: true,
    onRowClick: ({ item }) => {
      alert(`Clicked on ${(item as unknown as Person).name}!`);
    },
  });

  // Get table state and handlers from headless hook
  const tableState = useTable(dataTable, data as any);

  return (
    <div className="app">
      <div className="header">
        <h1>SnapTable React v3.0.0</h1>
        <p>A truly headless React table library</p>
        <p><strong>Try:</strong> Drag column headers to reorder • Resize columns • Scroll to see header disappear • Click rows</p>
      </div>

      <div className="demo-section">
        <h2>Live Demo</h2>
        
        <div className="table-container">
          <table className="demo-table">
          <thead className={`demo-header ${dataTable.isStickyHeader ? 'sticky' : ''}`}>
            <tr>
              {tableState.columns.map((column: any, index: number) => {
                const props = tableState.getColumnProps(index);
                return (
                  <th
                    key={column.key}
                    className="demo-header-cell"
                    style={{ width: props.width }}
                    draggable={props.isDraggable}
                    onDragStart={(e) => props.onDragStart?.(e.nativeEvent as DragEvent)}
                    onDragOver={(e) => props.onDragOver?.(e.nativeEvent as DragEvent)}
                    onDrop={(e) => props.onDrop?.(e.nativeEvent as DragEvent)}
                  >
                    <div className="header-content">
                      {column.label}
                      {props.isResizable && (
                        <div
                          className="resize-handle"
                          onMouseDown={(e) => props.onResizeStart?.(e.nativeEvent)}
                        />
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="demo-body">
            {tableState.data.map((item: any) => {
              const rowProps = tableState.getRowProps(item);
              return (
                <tr key={item.id} className="demo-row" onClick={rowProps.onClick}>
                  {tableState.columns.map(({ key, Cell }: any) => (
                    <Cell key={key} data={item} />
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
      </div>

      <div className="info">
        <h2>📦 What's Exported:</h2>
        <div className="exports">
          <div className="export-item">
            <code>useDataTable</code>
            <span>Configure table behavior</span>
          </div>
          <div className="export-item">
            <code>useTable</code>
            <span>Get table state and handlers</span>
          </div>
          <div className="export-item">
            <code>useDragAndDrop</code>
            <span>Drag and drop utilities</span>
          </div>
          <div className="export-item">
            <code>useResizeObserver</code>
            <span>Resize observation</span>
          </div>
        </div>

        <h2>✨ Features:</h2>
        <ul>
          <li>✅ Completely headless - only hooks and logic</li>
          <li>✅ No UI components, HTML structure, or CSS</li>
          <li>✅ Column resizing and drag & drop</li>
          <li>✅ Layout persistence to localStorage</li>
          <li>✅ TypeScript support</li>
          <li>✅ MobX reactive state management</li>
          <li>✅ Tiny bundle size (~4.8kB)</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
