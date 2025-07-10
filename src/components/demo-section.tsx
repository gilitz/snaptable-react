import { EmployeeTable } from './employee-table';

export const DemoSection = () => {
  return (
    <section id="demo" className="demo-section">
      <div className="demo-header">
        <h2 className="demo-title">
          <span className="gradient-text">Live Demo</span>
        </h2>
        <div className="demo-description">
          <p>Try resizing columns, dragging to reorder, and hiding/showing columns.</p>
          <p>This table is built entirely with SnapTable React hooks.</p>
        </div>
      </div>
      
      <EmployeeTable />
    </section>
  );
}; 