import { useObserver } from 'mobx-react';
import { useCallback } from 'react';
import DataTable from '../models/data-table-model';

// Truly headless table hook - only provides data, state, and event handlers
export function useTable<T extends Record<string, unknown>>(
	dataTable: DataTable,
	data: T[]
) {
	const handleColumnResize = useCallback((columnIndex: number, startX: number, startWidth: number) => {
		const handleMouseMove = (e: MouseEvent) => {
			const diff = e.clientX - startX;
			const newWidth = Math.max(50, startWidth + diff); // Minimum width of 50px
			
			// Update the column width in the model
			const newWidths = [...dataTable.columnsWidth];
			newWidths[columnIndex] = {
				...newWidths[columnIndex],
				width: newWidth
			};
			dataTable.setColumnsWidth(newWidths);
			
			// Save to localStorage if saveLayoutView is enabled
			if (dataTable.saveLayoutView) {
				localStorage.setItem(dataTable.key, JSON.stringify(newWidths));
			}
		};

		const handleMouseUp = () => {
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUp);
			document.body.style.cursor = '';
			document.body.style.userSelect = '';
		};

		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);
		document.body.style.cursor = 'col-resize';
		document.body.style.userSelect = 'none';
	}, [dataTable]);

	return useObserver(() => {
		const getColumnProps = (index: number) => {
			const column = dataTable.columns[index];
			const width = dataTable.columnsWidth[index]?.width || column.width || 150;
			
			return {
				width: typeof width === 'number' ? `${width}px` : width,
				isDraggable: dataTable.hasDraggableColumns,
				isResizable: column.resizeable,
				onDragStart: (e: DragEvent) => {
					if (dataTable.hasDraggableColumns) {
						e.dataTransfer?.setData('text/plain', index.toString());
					}
				},
				onDragOver: (e: DragEvent) => {
					e.preventDefault();
				},
				onDrop: (e: DragEvent) => {
					e.preventDefault();
					if (dataTable.hasDraggableColumns) {
						const draggedIndex = parseInt(e.dataTransfer?.getData('text/plain') || '');
						if (!isNaN(draggedIndex) && draggedIndex !== index) {
							dataTable.moveColumn(draggedIndex, index);
						}
					}
				},
				onResizeStart: (e: MouseEvent) => {
					if (column.resizeable) {
						e.preventDefault();
						e.stopPropagation();
						const currentWidth = typeof width === 'number' ? width : parseInt(width) || 150;
						handleColumnResize(index, e.clientX, currentWidth);
					}
				}
			};
		};

		const getRowProps = (item: T) => ({
			onClick: () => {
				if (dataTable.onRowClick) {
					dataTable.onRowClick({ item });
				}
			}
		});

		return {
			columns: dataTable.columns,
			data,
			config: dataTable,
			columnWidths: dataTable.columnsWidth,
			getColumnProps,
			getRowProps
		};
	});
}

export default useTable; 