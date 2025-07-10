/* eslint-disable @typescript-eslint/no-explicit-any */

// Helper functions
export const getEmployeeInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

export const getDepartmentClass = (department: string) => {
  return department.toLowerCase().replace(/\s+/g, "-");
};

// Column definitions
export const employeeColumns = [
  {
    key: "employee",
    label: "Employee",
    width: 280,
    resizeable: true,
    Cell: ({ data }: { data: any }) => (
      <div className="employee-info">
        <div className="employee-avatar">
          {getEmployeeInitials(data.name)}
        </div>
        <div className="employee-details">
          <div className="employee-name">{data.name}</div>
          <div className="employee-position">{data.position}</div>
        </div>
      </div>
    ),
  },
  {
    key: "department",
    label: "Department",
    width: 140,
    resizeable: true,
    Cell: ({ data }: { data: any }) => (
      <span className={`department-badge ${getDepartmentClass(data.department)}`}>
        {data.department}
      </span>
    ),
  },
  {
    key: "salary",
    label: "Salary",
    width: 120,
    resizeable: true,
    Cell: ({ data }: { data: any }) => (
      <span className="salary-cell">{data.salary}</span>
    ),
  },
  {
    key: "location",
    label: "Location",
    width: 200,
    resizeable: true,
    Cell: ({ data }: { data: any }) => (
      <div className="location-info">
        <span className="location-icon">📍</span>
        <span>{data.location}</span>
      </div>
    ),
  },
  {
    key: "experience",
    label: "Experience",
    width: 120,
    resizeable: true,
    Cell: ({ data }: { data: any }) => (
      <span className="experience-cell">{data.experience}</span>
    ),
  },
  {
    key: "status",
    label: "Status",
    width: 100,
    resizeable: true,
    Cell: ({ data }: { data: any }) => (
      <div className={`status-badge ${data.status.toLowerCase()}`}>
        <span className="status-dot"></span>
        {data.status}
      </div>
    ),
  },
]; 