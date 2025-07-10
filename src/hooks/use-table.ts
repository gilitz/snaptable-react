import { useObserver } from 'mobx-react';
import { useCallback, useRef, useEffect } from 'react';
import DataTable from '../models/data-table-model';

type StickyColumnType = {
	key: string;
	sticky: boolean;
};

export function useTable<T extends Record<string, unknown>>(
	dataTable: DataTable,
	data: T[]
) {
	// Store header element references
	const headerElementsRef = useRef<{ [key: string]: HTMLElement }>({});

	// Function to register header element reference
	const registerHeaderElement = useCallback((columnKey: string, element: HTMLElement | null) => {
		if (element) {
			headerElementsRef.current[columnKey] = element;
		} else {
			delete headerElementsRef.current[columnKey];
		}
	}, []);

	// Function to update actual widths from DOM elements
	const updateActualWidths = useCallback(() => {
		if (Object.keys(headerElementsRef.current).length > 0) {
			dataTable.updateActualWidths(headerElementsRef.current);
		}
	}, [dataTable]);

	// Update actual widths whenever columns change or after resize
	useEffect(() => {
		// Use requestAnimationFrame to ensure DOM is updated
		const updateWidths = () => {
			updateActualWidths();
		};
		
		// Update on next frame
		requestAnimationFrame(updateWidths);
		
		// Also update after a short delay to catch any CSS transitions
		const timeoutId = setTimeout(updateWidths, 100);
		
		return () => clearTimeout(timeoutId);
	}, [updateActualWidths, dataTable.columns, dataTable.columnsWidth]);

	const handleColumnResize = useCallback((columnIndex: number, startX: number, startWidth: number, headerElement?: HTMLElement) => {
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
		};

		const handleMouseUp = () => {
			// Get the actual rendered width after resize is complete
			if (headerElement) {
				// Use a small timeout to ensure the DOM has updated
				setTimeout(() => {
					const actualWidth = headerElement.getBoundingClientRect().width;
					
					// Update with the actual rendered width
					const newWidths = [...dataTable.columnsWidth];
					newWidths[columnIndex] = {
						...newWidths[columnIndex],
						width: Math.floor(actualWidth)
					};
					dataTable.setColumnsWidth(newWidths);
					
					// Update the actual rendered widths in the model
					updateActualWidths();
					
					// Save to localStorage if saveLayoutView is enabled
					if (dataTable.saveLayoutView) {
						localStorage.setItem(dataTable.key, JSON.stringify(newWidths));
					}
				}, 10);
			}
			
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUp);
			document.body.style.cursor = '';
			document.body.style.userSelect = '';
		};

		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);
		document.body.style.cursor = 'col-resize';
		document.body.style.userSelect = 'none';
	}, [dataTable, updateActualWidths]);

	return useObserver(() => {
		const visibleColumns = dataTable.getVisibleColumns();
		const stickyOffsets = dataTable.getStickyColumnsOffsets();
		
		const getColumnProps = (index: number) => {
			const column = visibleColumns[index];
			const originalColumnIndex = dataTable.columns.findIndex((col: { key: string }) => col.key === column.key);
			const width = dataTable.columnsWidth[originalColumnIndex]?.width ?? column.width ?? 150;
			const isSticky = dataTable.stickyColumns.find((col: StickyColumnType) => col.key === column.key)?.sticky ?? false;
			const stickyOffset = stickyOffsets[column.key] ?? 0;
			
			return {
				width: typeof width === 'number' ? `${width}px` : width,
				isDraggable: dataTable.hasDraggableColumns,
				isResizable: column.resizeable,
				isSticky: isSticky,
				stickyOffset: stickyOffset,
				onDragStart: (e: DragEvent) => {
					if (dataTable.hasDraggableColumns) {
						e.dataTransfer?.setData('text/plain', originalColumnIndex.toString());
					}
				},
				onDragOver: (e: DragEvent) => {
					e.preventDefault();
				},
				onDrop: (e: DragEvent) => {
					e.preventDefault();
					if (dataTable.hasDraggableColumns) {
						const draggedIndex = parseInt(e.dataTransfer?.getData('text/plain') ?? '');
						if (!isNaN(draggedIndex) && draggedIndex !== originalColumnIndex) {
							dataTable.moveColumn(draggedIndex, originalColumnIndex);
							// Update actual widths after column move
							setTimeout(() => updateActualWidths(), 50);
						}
					}
				},
				onResizeStart: (e: MouseEvent, headerElement?: HTMLElement) => {
					if (column.resizeable) {
						e.preventDefault();
						e.stopPropagation();
						const currentWidth = typeof width === 'number' ? width : parseInt(width) ?? 150;
						handleColumnResize(originalColumnIndex, e.clientX, currentWidth, headerElement);
					}
				},
				onToggleSticky: (headerElement?: HTMLElement) => {
					if (dataTable.hasStickyColumns) {
						let actualWidth;
						if (headerElement) {
							actualWidth = headerElement.getBoundingClientRect().width;
						}
						dataTable.toggleColumnSticky(column.key, actualWidth);
						// Update actual widths after sticky toggle
						setTimeout(() => updateActualWidths(), 50);
					}
				},
				onToggleHidden: () => {
					dataTable.toggleColumnHidden(column.key);
				},
				// New: function to register header element reference
				registerHeaderRef: (element: HTMLElement | null) => {
					registerHeaderElement(column.key, element);
				}
			};
		};

		const getCellProps = (columnIndex: number) => {
			const column = visibleColumns[columnIndex];
			const originalColumnIndex = dataTable.columns.findIndex((col: { key: string }) => col.key === column.key);
			const width = dataTable.columnsWidth[originalColumnIndex]?.width ?? column.width ?? 150;
			const isSticky = dataTable.stickyColumns.find((col: StickyColumnType) => col.key === column.key)?.sticky ?? false;
			const stickyOffset = stickyOffsets[column.key] ?? 0;
			
			return {
				width: typeof width === 'number' ? `${width}px` : width,
				isSticky: isSticky,
				stickyOffset: stickyOffset,
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
			columns: visibleColumns,
			data,
			config: dataTable,
			columnWidths: dataTable.columnsWidth,
			stickyColumns: dataTable.stickyColumns,
			hiddenColumns: dataTable.hiddenColumns,
			stickyOffsets,
			getColumnProps,
			getCellProps,
			getRowProps,
			// New: function to manually trigger actual width updates
			updateActualWidths,
			// Hidden columns methods
			getHiddenColumns: () => dataTable.getHiddenColumns(),
			toggleColumnHidden: (columnKey: string) => dataTable.toggleColumnHidden(columnKey)
		};
	});
}

export default useTable; 