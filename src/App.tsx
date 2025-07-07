import './App.css';
import { useDataTable, useTable } from './index';

// Sample data with more realistic content
const employees = [
  {
    key: "1",
    name: "Sarah Johnson",
    department: "Engineering",
    position: "Senior Frontend Developer",
    salary: "$125,000",
    location: "San Francisco, CA",
    experience: "5 years",
    status: "Active",
  },
  {
    key: "2",
    name: "Michael Chen",
    department: "Engineering",
    position: "Full Stack Developer",
    salary: "$110,000",
    location: "Austin, TX",
    experience: "3 years",
    status: "Active",
  },
  {
    key: "3",
    name: "Emily Rodriguez",
    department: "Design",
    position: "UX Designer",
    salary: "$95,000",
    location: "New York, NY",
    experience: "4 years",
    status: "Active",
  },
  {
    key: "4",
    name: "David Park",
    department: "Marketing",
    position: "Growth Marketing Manager",
    salary: "$88,000",
    location: "Los Angeles, CA",
    experience: "2 years",
    status: "Active",
  },
  {
    key: "5",
    name: "Jessica Thompson",
    department: "Sales",
    position: "Account Executive",
    salary: "$92,000",
    location: "Chicago, IL",
    experience: "3 years",
    status: "Active",
  },
  {
    key: "6",
    name: "Alex Kumar",
    department: "Engineering",
    position: "Backend Developer",
    salary: "$115,000",
    location: "Seattle, WA",
    experience: "4 years",
    status: "Active",
  },
  {
    key: "7",
    name: "Maria Garcia",
    department: "HR",
    position: "HR Business Partner",
    salary: "$78,000",
    location: "Miami, FL",
    experience: "6 years",
    status: "Active",
  },
  {
    key: "8",
    name: "James Wilson",
    department: "Engineering",
    position: "DevOps Engineer",
    salary: "$120,000",
    location: "Denver, CO",
    experience: "5 years",
    status: "Active",
  },
  {
    key: "9",
    name: "Lisa Chang",
    department: "Design",
    position: "Product Designer",
    salary: "$98,000",
    location: "Portland, OR",
    experience: "3 years",
    status: "Active",
  },
  {
    key: "10",
    name: "Robert Taylor",
    department: "Sales",
    position: "Sales Director",
    salary: "$135,000",
    location: "Boston, MA",
    experience: "8 years",
    status: "Active",
  },
  {
    key: "11",
    name: "Amanda Foster",
    department: "Marketing",
    position: "Content Marketing Lead",
    salary: "$85,000",
    location: "Nashville, TN",
    experience: "4 years",
    status: "Active",
  },
  {
    key: "12",
    name: "Kevin Lee",
    department: "Engineering",
    position: "Software Architect",
    salary: "$140,000",
    location: "San Jose, CA",
    experience: "7 years",
    status: "Active",
  },
  {
    key: "13",
    name: "Rachel Green",
    department: "HR",
    position: "Talent Acquisition Specialist",
    salary: "$72,000",
    location: "Atlanta, GA",
    experience: "2 years",
    status: "Active",
  },
  {
    key: "14",
    name: "Daniel Martinez",
    department: "Design",
    position: "UI/UX Designer",
    salary: "$90,000",
    location: "Phoenix, AZ",
    experience: "3 years",
    status: "Active",
  },
  {
    key: "15",
    name: "Sophie Anderson",
    department: "Marketing",
    position: "Digital Marketing Specialist",
    salary: "$75,000",
    location: "Orlando, FL",
    experience: "2 years",
    status: "Active",
  },
  {
    key: "16",
    name: "Chris Brown",
    department: "Sales",
    position: "Business Development Rep",
    salary: "$68,000",
    location: "Dallas, TX",
    experience: "1 year",
    status: "Active",
  },
  {
    key: "17",
    name: "Nicole Davis",
    department: "Engineering",
    position: "QA Engineer",
    salary: "$95,000",
    location: "Minneapolis, MN",
    experience: "4 years",
    status: "Active",
  },
  {
    key: "18",
    name: "Ryan Miller",
    department: "HR",
    position: "HR Generalist",
    salary: "$70,000",
    location: "Salt Lake City, UT",
    experience: "3 years",
    status: "Active",
  },
  {
    key: "19",
    name: "Emma Johnson",
    department: "Design",
    position: "Visual Designer",
    salary: "$87,000",
    location: "Richmond, VA",
    experience: "2 years",
    status: "Active",
  },
  {
    key: "20",
    name: "Tyler White",
    department: "Sales",
    position: "Sales Manager",
    salary: "$105,000",
    location: "Philadelphia, PA",
    experience: "5 years",
    status: "Active",
  },
];

function App() {
  const getEmployeeInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getDepartmentClass = (department: string) => {
    return department.toLowerCase().replace(/\s+/g, "-");
  };

  const dataTable = useDataTable({
    key: "employee-table",
    columns: [
      {
        key: "employee",
        label: "Employee",
        width: 280,
        resizeable: true,
        Cell: ({ data }: { data: any }) => (
          <td className="demo-cell">
            <div className="employee-info">
              <div className="employee-avatar">
                {getEmployeeInitials(data.name)}
              </div>
              <div className="employee-details">
                <div className="employee-name">{data.name}</div>
                <div className="employee-position">{data.position}</div>
              </div>
            </div>
          </td>
        ),
      },
      {
        key: "department",
        label: "Department",
        width: 140,
        resizeable: false,
        Cell: ({ data }: { data: any }) => (
          <td className="demo-cell">
            <span className={`department-badge ${getDepartmentClass(data.department)}`}>
              {data.department}
            </span>
          </td>
        ),
      },
      {
        key: "salary",
        label: "Salary",
        width: 120,
        resizeable: true,
        Cell: ({ data }: { data: any }) => (
          <td className="demo-cell">
            <span className="salary-cell">{data.salary}</span>
          </td>
        ),
      },
      {
        key: "location",
        label: "Location",
        width: 200,
        resizeable: true,
        Cell: ({ data }: { data: any }) => (
          <td className="demo-cell">
            <div className="location-info">
              <span className="location-icon">📍</span>
              <span>{data.location}</span>
            </div>
          </td>
        ),
      },
      {
        key: "experience",
        label: "Experience",
        width: 120,
        resizeable: true,
        Cell: ({ data }: { data: any }) => (
          <td className="demo-cell">
            <span className="experience-cell">{data.experience}</span>
          </td>
        ),
      },
      {
        key: "status",
        label: "Status",
        width: 100,
        resizeable: true,
        Cell: ({ data }: { data: any }) => (
          <td className="demo-cell">
            <div className={`status-badge ${data.status.toLowerCase()}`}>
              <span className="status-dot"></span>
              {data.status}
            </div>
          </td>
        ),
      },
    ],
    hasDraggableColumns: true,
    isStickyHeader: false,
    saveLayoutView: true,
    onRowClick: ({ item }) => {
      console.log("Clicked employee:", item);
    },
  });

  const table = useTable(dataTable, employees);

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="version-badge">v3.0.0</span>
            <span className="new-badge">✨ Truly Headless</span>
          </div>
          
          <h1 className="hero-title">
            <span className="gradient-text">SnapTable</span>
            <br />
          </h1>
          
          <p className="hero-subtitle">
            The Ultimate Headless Table Library
          </p>
          
          <p className="hero-description">
            Build powerful, customizable data tables with zero UI constraints.
            <div>
              Pure hooks, complete control, endless possibilities.
            </div>
          </p>
          
          <div className="hero-features">
            <div className="feature-pill">🎯 Truly Headless</div>
            <div className="feature-pill">📏 Column Resizing</div>
            <div className="feature-pill">🔄 Drag & Drop</div>
            <div className="feature-pill">📱 Mobile Ready</div>
            <div className="feature-pill">⚡ Lightweight</div>
            <div className="feature-pill">🎨 Zero CSS</div>
          </div>
          
          <div className="hero-actions">
            <a href="#demo" className="primary-button">
              <span className="button-icon">🚀</span>
              See Live Demo
            </a>
            <a href="https://github.com/your-username/snaptable-react" className="secondary-button">
              <span className="button-icon">⭐</span>
              Star on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="demo-section">
        <div className="demo-header">
          <h2 className="demo-title">
            <span className="gradient-text">Live Demo</span>
          </h2>
          <p className="demo-description">
            Try resizing columns and dragging to reorder. 
            <div>This table is built entirely with SnapTable React hooks.</div>
          </p>
        </div>

        <div className="table-container">
          <table className="demo-table">
            <thead className={`demo-thead ${dataTable.isStickyHeader ? 'sticky' : ''}`}>
              <tr>
                {table.columns.map((column, index) => {
                  const props = table.getColumnProps(index);
                  return (
                    <th
                      key={column.key}
                      className={`demo-header ${dataTable.isStickyHeader ? 'sticky' : ''}`}
                      style={{ width: props.width }}
                      draggable={props.isDraggable}
                      onDragStart={props.onDragStart}
                      onDragOver={props.onDragOver}
                      onDrop={props.onDrop}
                    >
                      <div className="header-content">
                        <span className="header-label">{column.label}</span>
                        {props.isDraggable && column.key !== 'department' && (
                          <span className="drag-indicator">⋮⋮</span>
                        )}
                      </div>
                      {props.isResizable && (
                        <div
                          className="resize-handle"
                          onMouseDown={(e) => props.onResizeStart(e.nativeEvent)}
                        />
                      )}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="demo-tbody">
              {table.data.map((employee) => {
                const rowProps = table.getRowProps(employee);
                return (
                  <tr
                    key={employee.key}
                    className="demo-row"
                    onClick={rowProps.onClick}
                  >
                    {table.columns.map(({ key, Cell }) => (
                      <Cell key={key} data={employee} />
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="features-title">
          <span className="gradient-text">Why Choose SnapTable?</span>
        </h2>
        
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">🎯</span>
            <h3>Truly Headless</h3>
            <p>No predefined UI components. Just pure logic and hooks that give you complete control over styling and behavior.</p>
          </div>
          
          <div className="feature-card">
            <span className="feature-icon">⚡</span>
            <h3>Lightning Fast</h3>
            <p>Optimized for performance with minimal bundle size. Only 5.65kB gzipped - perfect for production apps.</p>
          </div>
          
          <div className="feature-card">
            <span className="feature-icon">🔧</span>
            <h3>Highly Customizable</h3>
            <p>Every aspect is configurable. Column resizing, drag & drop, sticky headers, and more - all optional and customizable.</p>
          </div>
          
          <div className="feature-card">
            <span className="feature-icon">📱</span>
            <h3>Mobile Ready</h3>
            <p>Built with responsive design in mind. Works perfectly on desktop, tablet, and mobile devices out of the box.</p>
          </div>
          
          <div className="feature-card">
            <span className="feature-icon">🎨</span>
            <h3>Style Freedom</h3>
            <p>Bring your own CSS framework. Works with Tailwind, Styled Components, CSS Modules, or plain CSS.</p>
          </div>
          
          <div className="feature-card">
            <span className="feature-icon">🔄</span>
            <h3>Modern React</h3>
            <p>Built with modern React patterns. Hooks, TypeScript support, and excellent developer experience included.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>
          Made with ❤️ for the React community • 
          <a href="https://github.com/your-username/snaptable-react" className="footer-link"> GitHub</a> • 
          <a href="https://npmjs.com/package/snaptable-react" className="footer-link"> npm</a>
        </p>
        <p className="footer-version">snaptable-react v3.0.0</p>
      </footer>
    </div>
  );
}

export default App;
