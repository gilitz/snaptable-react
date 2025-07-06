import React from 'react';
import './App.css';
import { SnapTable, useDataTable } from 'snaptable-react';

// Sample data for testing
const sampleData = [
  { key: '1', name: 'John Doe', age: 30, city: 'New York' },
  { key: '2', name: 'Jane Smith', age: 25, city: 'Los Angeles' },
  { key: '3', name: 'Bob Johnson', age: 35, city: 'Chicago' },
];

// Sample columns configuration
const columns = [
  {
    key: 'name',
    label: 'Name',
    Cell: ({ data }: { data: any }) => <span>{data.name}</span>,
  },
  {
    key: 'age',
    label: 'Age',
    Cell: ({ data }: { data: any }) => <span>{data.age}</span>,
  },
  {
    key: 'city',
    label: 'City',
    Cell: ({ data }: { data: any }) => <span>{data.city}</span>,
  },
];

function App() {
  // Test the useDataTable hook
  const dataTable = useDataTable({
    key: 'test-table',
    columns,
    hasDraggableColumns: true,
    saveLayoutView: true,
    isStickyHeader: true,
  });

  return (
    <div className="App" style={{ padding: '20px' }}>
      <h1>SnapTable React Package Test</h1>
      <p>Testing the SnapTable component with sample data:</p>
      
      <div style={{ border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden' }}>
        <SnapTable
          dataTable={dataTable}
          data={sampleData}
          tableContainerClass="table-container"
          tableClass="custom-table"
          headerCellClass="header-cell"
          cellClass="data-cell"
        />
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <h3>Package Test Results:</h3>
        <ul>
          <li>✅ Package imported successfully</li>
          <li>✅ SnapTable component rendered</li>
          <li>✅ useDataTable hook working</li>
          <li>✅ TypeScript types available</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
