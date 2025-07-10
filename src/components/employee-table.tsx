// @ts-nocheck
import { useState, useRef } from 'react';
import { useDataTable, useTable } from '../index';
import { employees } from '../data/sample-employees';
import { employeeColumns } from './employee-columns';
import DropdownPortal from './dropdown-portal';

export const EmployeeTable = () => {
  const [openKebabMenu, setOpenKebabMenu] = useState<string | null>(null);
  const [showHiddenDropdown, setShowHiddenDropdown] = useState(false);
  const hiddenDropdownRef = useRef<HTMLButtonElement>(null);
  const kebabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const dataTable = useDataTable({
    key: "employee-table",
    columns: employeeColumns,
    hasDraggableColumns: true,
    isStickyHeader: true,
    hasStickyColumns: true, // Enable sticky columns functionality
    saveLayoutView: true,
    onRowClick: ({ item }) => {
      console.log("Clicked employee:", item);
    },
  });

  const table = useTable(dataTable, employees);

  return (
    <div className="table-wrapper">
      {/* Hidden columns dropdown - always visible */}
      <div className="hidden-columns-dropdown">
        <button
          ref={hiddenDropdownRef}
          className={`hidden-columns-toggle ${table.getHiddenColumns().length === 0 ? 'disabled' : ''}`}
          onClick={() => {
            if (table.getHiddenColumns().length > 0) {
              setShowHiddenDropdown(!showHiddenDropdown);
            }
          }}
          disabled={table.getHiddenColumns().length === 0}
        >
          Show Hidden ({table.getHiddenColumns().length})
        </button>
        <DropdownPortal
          isOpen={showHiddenDropdown && table.getHiddenColumns().length > 0}
          triggerRef={hiddenDropdownRef}
          onClose={() => setShowHiddenDropdown(false)}
          className="hidden-columns-menu"
          align="right"
        >
          {table.getHiddenColumns().map((column) => (
            <button
              key={column.key}
              className="hidden-column-item"
              onClick={() => {
                table.toggleColumnHidden(column.key);
                setShowHiddenDropdown(false);
              }}
            >
              {column.label}
            </button>
          ))}
        </DropdownPortal>
      </div>

      <div className="table-container">
        <table className="demo-table">
          <thead className={`demo-thead ${dataTable.isStickyHeader ? 'sticky' : ''}`}>
            <tr>
              {table.columns.map((column, index) => {
                const props = table.getColumnProps(index);
                const isLastColumn = index === table.columns.length - 1;
                
                // Calculate z-index for sticky columns based on their sticky position
                let zIndex = 1;
                if (props.isSticky) {
                  // Count how many sticky columns come before this one
                  let stickyIndex = 0;
                  for (let i = 0; i < index; i++) {
                    const prevProps = table.getColumnProps(i);
                    if (prevProps.isSticky) {
                      stickyIndex++;
                    }
                  }
                  // When both sticky header and sticky columns are active,
                  // sticky columns need higher z-index than sticky header (10)
                  // First sticky column gets highest z-index
                  const baseZIndex = dataTable.isStickyHeader ? 20 : 100;
                  zIndex = baseZIndex - stickyIndex;
                } else if (dataTable.isStickyHeader) {
                  // Non-sticky columns in sticky header get base z-index
                  zIndex = 10;
                }
                
                return (
                  <th
                    key={column.key}
                    ref={(headerRef) => {
                      // Register the header element reference for accurate width calculations
                      props.registerHeaderRef(headerRef);
                    }}
                    className={`demo-header ${dataTable.isStickyHeader ? 'sticky' : ''} ${props.isSticky ? 'column-sticky' : ''} ${!isLastColumn ? 'has-border' : ''}`}
                    style={{ 
                      width: props.width,
                      left: props.isSticky ? `${Math.floor(props.stickyOffset)}px` : undefined,
                      position: props.isSticky ? 'sticky' : 'relative',
                      zIndex: zIndex,
                    }}
                    draggable={props.isDraggable}
                    onDragStart={props.onDragStart}
                    onDragOver={props.onDragOver}
                    onDrop={props.onDrop}
                  >
                    <div className="header-content">
                      <span className="header-label">{column.label}</span>
                      <div className="header-actions">
                        <div className="kebab-menu">
                          <button
                            ref={(el) => { kebabRefs.current[column.key] = el; }}
                            className="kebab-toggle"
                            onClick={() => setOpenKebabMenu(openKebabMenu === column.key ? null : column.key)}
                            title="Column options"
                          >
                            ⋮
                          </button>
                          <DropdownPortal
                            isOpen={openKebabMenu === column.key}
                            triggerRef={{ current: kebabRefs.current[column.key] }}
                            onClose={() => setOpenKebabMenu(null)}
                            className="kebab-dropdown"
                            align="right"
                          >
                            <button
                              className="kebab-item"
                              onClick={(e) => {
                                const headerElement = (e.target as HTMLElement).closest('th') as HTMLElement;
                                props.onToggleSticky(headerElement);
                                setOpenKebabMenu(null);
                              }}
                            >
                              {props.isSticky ? '📌 Unpin' : '📍 Pin'}
                            </button>
                            <button
                              className="kebab-item"
                              onClick={() => {
                                props.onToggleHidden();
                                setOpenKebabMenu(null);
                              }}
                            >
                              🙈 Hide Column
                            </button>
                          </DropdownPortal>
                        </div>
                        {props.isDraggable && column.key !== 'department' && (
                          <span className="drag-indicator">⋮⋮</span>
                        )}
                      </div>
                    </div>
                    {props.isResizable && (
                      <div
                        className="resize-handle"
                        onMouseDown={(e) => {
                          const headerElement = (e.target as HTMLElement).closest('th') as HTMLElement;
                          props.onResizeStart(e.nativeEvent, headerElement);
                        }}
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
                  {table.columns.map((column, columnIndex) => {
                    const cellProps = table.getCellProps(columnIndex);
                    const isLastColumn = columnIndex === table.columns.length - 1;
                    
                    // Calculate z-index for sticky cells based on their sticky position
                    let cellZIndex = 1;
                    if (cellProps.isSticky) {
                      // Count how many sticky columns come before this one
                      let stickyIndex = 0;
                      for (let i = 0; i < columnIndex; i++) {
                        const prevCellProps = table.getCellProps(i);
                        if (prevCellProps.isSticky) {
                          stickyIndex++;
                        }
                      }
                      // When both sticky header and sticky columns are active,
                      // sticky columns need higher z-index than sticky header (10)
                      // First sticky column gets highest z-index
                      const baseCellZIndex = dataTable.isStickyHeader ? 8 : 50;
                      cellZIndex = baseCellZIndex - stickyIndex;
                    }
                    
                    return (
                      <td
                        key={column.key}
                        className={`demo-cell ${cellProps.isSticky ? 'cell-sticky' : ''} ${!isLastColumn ? 'has-border' : ''}`}
                        style={{
                          width: cellProps.width,
                          left: cellProps.isSticky ? `${Math.floor(cellProps.stickyOffset)}px` : undefined,
                          position: cellProps.isSticky ? 'sticky' : 'relative',
                          zIndex: cellZIndex,
                        }}
                      >
                        <column.Cell data={employee} />
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}; 