import { makeAutoObservable } from 'mobx';
import { ReactNode } from "react";

type NestedColumnType = {
	key: string;
	label?: string | ReactNode;
	Cell?: (props: { data: Record<string, unknown> }) => ReactNode;
};

export type TableColumnType = {
	key: string;
	label: string | ReactNode;
	width?: number;
	resizeable?: boolean;
	sticky?: boolean;
	hidden?: boolean;
	Cell: (props: { data: Record<string, unknown> }) => ReactNode;
	nestedColumns?: NestedColumnType[];
}

type ColumnWidthType = {
	key: string;
	width?: number;
}

type StickyColumnType = {
	key: string;
	sticky: boolean;
}

type HiddenColumnType = {
	key: string;
	hidden: boolean;
}

export interface DataTableLiteType {
	key: string;
	columns: TableColumnType[];
	hasDraggableColumns?: boolean;
	saveLayoutView?: boolean;
	defaultColumnWidth?: number | string;
	isStickyHeader?: boolean;
	hasStickyColumns?: boolean;
	onRowClick?: ({ item }: { item: Record<string, unknown> }) => void
}

export type DataTableType = DataTableLiteType & {
	moveColumn: (index: number, toIndex: number) => void;
	setColumnsWidth: (widths: ColumnWidthType[]) => void;
	columnsWidth: ColumnWidthType[];
	stickyColumns: StickyColumnType[];
	setStickyColumns: (stickyColumns: StickyColumnType[]) => void;
	toggleColumnSticky: (columnKey: string, actualWidth?: number) => void;
	hiddenColumns: HiddenColumnType[];
	setHiddenColumns: (hiddenColumns: HiddenColumnType[]) => void;
	toggleColumnHidden: (columnKey: string) => void;
	getVisibleColumns: () => TableColumnType[];
	getHiddenColumns: () => TableColumnType[];
	getStickyColumnsOffsets: () => { [key: string]: number };
	updateActualWidths: (headerElements: { [key: string]: HTMLElement }) => void;
	getColumnActualWidth: (columnKey: string, fallbackWidth: number) => number;
	actualRenderedWidths: { [key: string]: number };
}

class DataTable {
	key;
	columns;
	saveLayoutView;
	hasDraggableColumns;
	isStickyHeader;
	hasStickyColumns;
	onRowClick;
	columnsWidth: ColumnWidthType[];
	stickyColumns: StickyColumnType[];
	hiddenColumns: HiddenColumnType[];
	// nestedColumnsWidth?: ColumnWidthType[] | null;	 

	// Store actual rendered widths from DOM elements
	actualRenderedWidths: { [key: string]: number } = {};

	// Method to update actual rendered widths from DOM elements
	updateActualWidths(headerElements: { [key: string]: HTMLElement }) {
		Object.keys(headerElements).forEach(columnKey => {
			const element = headerElements[columnKey];
			if (element) {
				const actualWidth = element.getBoundingClientRect().width;
				this.actualRenderedWidths[columnKey] = actualWidth;
			}
		});
	}

	// Method to get the most accurate width for a column
	getColumnActualWidth(columnKey: string, fallbackWidth: number): number {
		// First try to get the actual rendered width
		if (this.actualRenderedWidths[columnKey]) {
			return this.actualRenderedWidths[columnKey];
		}
		
		// Fall back to stored width
		const columnIndex = this.columns.findIndex((col: TableColumnType) => col.key === columnKey);
		if (columnIndex !== -1) {
			const storedWidth = this.columnsWidth[columnIndex]?.width;
			if (storedWidth) {
				return typeof storedWidth === 'number' ? storedWidth : parseInt(storedWidth) || fallbackWidth;
			}
		}
		
		// Final fallback
		return fallbackWidth;
	}

	constructor({ key, columns, saveLayoutView, hasDraggableColumns, isStickyHeader, hasStickyColumns, onRowClick, defaultColumnWidth = 'auto' }: DataTableLiteType) {
		makeAutoObservable(this);
		const savedColumnsStr = localStorage.getItem(key);
		const savedColumns = savedColumnsStr ? JSON.parse(savedColumnsStr) : null;
		
		// Load saved sticky state
		const savedStickyStr = localStorage.getItem(`${key}_sticky`);
		const savedSticky = savedStickyStr ? JSON.parse(savedStickyStr) : null;
		
		this.key = key;
		this.saveLayoutView = saveLayoutView ?? false;
		this.hasDraggableColumns = hasDraggableColumns ?? true;
		this.isStickyHeader = isStickyHeader ?? false;
		this.hasStickyColumns = hasStickyColumns ?? false;
		this.onRowClick = onRowClick;

		// Always load saved column widths if they exist
		this.columnsWidth = columns.map((column) => {
			const savedColumn = savedColumns?.find(({ key }: ColumnWidthType) => key === column.key);
			const fallbackWidth = typeof defaultColumnWidth === 'number' ? defaultColumnWidth : undefined;
			return ({ key: column.key, width: savedColumn?.width ?? column.width ?? fallbackWidth });
		});

		// Initialize sticky columns state
		this.stickyColumns = columns.map((column) => {
			const savedStickyColumn = savedSticky?.find(({ key }: StickyColumnType) => key === column.key);
			return { key: column.key, sticky: savedStickyColumn?.sticky ?? column.sticky ?? false };
		});

		// Load saved hidden state
		const savedHiddenStr = localStorage.getItem(`${key}_hidden`);
		const savedHidden = savedHiddenStr ? JSON.parse(savedHiddenStr) : null;

		// Initialize hidden columns state
		this.hiddenColumns = columns.map((column) => {
			const savedHiddenColumn = savedHidden?.find(({ key }: HiddenColumnType) => key === column.key);
			return { key: column.key, hidden: savedHiddenColumn?.hidden ?? column.hidden ?? false };
		});

		// load initial view if exists and saveLayoutView is enabled
		if (saveLayoutView) {
			if (savedColumns) {
				const newFilteredColumns = columns.filter(column => !savedColumns.map(({ key }: TableColumnType) => key).includes(column.key));
				const updatedColumns = savedColumns.reduce((result: TableColumnType[], savedColumn: ColumnWidthType) => {
					const currentColumn = columns.filter(({ key }) => key === savedColumn.key)[0];
					if (!currentColumn) {
						return result;
					}
					result = [...result, currentColumn];
					return result;
				}, []);

				const updatedColumnsWidth = savedColumns.reduce((result: ColumnWidthType[], savedColumn: ColumnWidthType) => {
					const currentColumn = columns.filter(({ key }) => key === savedColumn.key)[0];
					if (!currentColumn) {
						return result;
					}
					const fallbackWidth = typeof defaultColumnWidth === 'number' ? defaultColumnWidth : undefined;
					result = [...result, { key: currentColumn.key, width: savedColumn.width ?? currentColumn.width ?? fallbackWidth }];
					return result;
				}, [])

				this.columns = updatedColumns.concat(newFilteredColumns);
				this.columnsWidth = updatedColumnsWidth.concat(newFilteredColumns.map(({ key, width }) => ({ key, width: width ?? defaultColumnWidth })));
				
				// Update sticky columns based on reordered columns
				this.stickyColumns = this.columns.map((column: TableColumnType) => {
					const savedStickyColumn = savedSticky?.find(({ key }: StickyColumnType) => key === column.key);
					return { key: column.key, sticky: savedStickyColumn?.sticky ?? column.sticky ?? false };
				});

				// Update hidden columns based on reordered columns
				this.hiddenColumns = this.columns.map((column: TableColumnType) => {
					const savedHiddenColumn = savedHidden?.find(({ key }: HiddenColumnType) => key === column.key);
					return { key: column.key, hidden: savedHiddenColumn?.hidden ?? column.hidden ?? false };
				});
			}
			else {
				// Initialize localStorage with current column widths and sticky state
				localStorage.setItem(key, JSON.stringify(this.columnsWidth));
				if (this.hasStickyColumns) {
					localStorage.setItem(`${key}_sticky`, JSON.stringify(this.stickyColumns));
				}
				localStorage.setItem(`${key}_hidden`, JSON.stringify(this.hiddenColumns));
				this.columns = columns;
			}
		}
		else {
			this.columns = columns;
			// Even if saveLayoutView is false, still initialize localStorage for resize functionality
			if (!savedColumns) {
				localStorage.setItem(key, JSON.stringify(this.columnsWidth));
			}
			if (this.hasStickyColumns && !savedSticky) {
				localStorage.setItem(`${key}_sticky`, JSON.stringify(this.stickyColumns));
			}
			if (!savedHidden) {
				localStorage.setItem(`${key}_hidden`, JSON.stringify(this.hiddenColumns));
			}
		}
	}

	moveColumn(index: number, toIndex: number) {
		if (!this.hasDraggableColumns) {
			return;
		}

		// Check if we're trying to move between sticky and non-sticky zones
		const draggedColumnKey = this.columns[index].key;
		const targetColumnKey = this.columns[toIndex].key;
		const draggedIsSticky = this.stickyColumns.find(col => col.key === draggedColumnKey)?.sticky ?? false;
		const targetIsSticky = this.stickyColumns.find(col => col.key === targetColumnKey)?.sticky ?? false;

		// Prevent moving between sticky and non-sticky zones
		if (draggedIsSticky !== targetIsSticky) {
			return;
		}

		// update table model columns 
		const customColumns = [...this.columns];
		const item = customColumns.splice(index, 1)[0];
		customColumns.splice(toIndex, 0, item);
		this.columns = customColumns;

		// update columnsWidth saved columns
		const customColumnsWidth = [...this.columnsWidth]
		const columnWidthItem = customColumnsWidth.splice(index, 1)[0];
		customColumnsWidth.splice(toIndex, 0, columnWidthItem);
		this.columnsWidth = customColumnsWidth;

		// update stickyColumns saved columns
		const customStickyColumns = [...this.stickyColumns]
		const stickyColumnItem = customStickyColumns.splice(index, 1)[0];
		customStickyColumns.splice(toIndex, 0, stickyColumnItem);
		this.stickyColumns = customStickyColumns;

		// update hiddenColumns saved columns
		const customHiddenColumns = [...this.hiddenColumns]
		const hiddenColumnItem = customHiddenColumns.splice(index, 1)[0];
		customHiddenColumns.splice(toIndex, 0, hiddenColumnItem);
		this.hiddenColumns = customHiddenColumns;

		// update localstorage saved columns
		const savedColumnsStr = localStorage.getItem(this.key);
		if (savedColumnsStr) {
			const savedColumns = JSON.parse(savedColumnsStr);
			const savedItem = savedColumns.splice(index, 1)[0];
			savedColumns.splice(toIndex, 0, savedItem);
			localStorage.setItem(this.key, JSON.stringify(savedColumns));
		}

		// update localstorage saved sticky state
		if (this.hasStickyColumns) {
			localStorage.setItem(`${this.key}_sticky`, JSON.stringify(this.stickyColumns));
		}

		// update localstorage saved hidden state
		localStorage.setItem(`${this.key}_hidden`, JSON.stringify(this.hiddenColumns));
	}

	setColumnsWidth(widths: ColumnWidthType[]) {
		this.columnsWidth = widths;
	}

	setStickyColumns(stickyColumns: StickyColumnType[]) {
		this.stickyColumns = stickyColumns;
		if (this.hasStickyColumns) {
			localStorage.setItem(`${this.key}_sticky`, JSON.stringify(this.stickyColumns));
		}
	}

	toggleColumnSticky(columnKey: string, actualWidth?: number) {
		if (!this.hasStickyColumns) {
			return;
		}

		const columnIndex = this.columns.findIndex((col: TableColumnType) => col.key === columnKey);
		if (columnIndex === -1) {
			return;
		}

		const currentStickyState = this.stickyColumns.find((col: StickyColumnType) => col.key === columnKey)?.sticky ?? false;
		const newStickyState = !currentStickyState;

		// If we're making a column sticky and we have the actual rendered width, update it
		if (newStickyState && actualWidth) {
			const newWidths = [...this.columnsWidth];
			newWidths[columnIndex] = {
				...newWidths[columnIndex],
				width: Math.floor(actualWidth)
			};
			this.setColumnsWidth(newWidths);
			
			// Save to localStorage if saveLayoutView is enabled
			if (this.saveLayoutView) {
				localStorage.setItem(this.key, JSON.stringify(newWidths));
			}
		}

		// Update sticky state first
		const newStickyColumns = this.stickyColumns.map((col: StickyColumnType) => 
			col.key === columnKey ? { ...col, sticky: newStickyState } : col
		);

		if (newStickyState) {
			// Making column sticky - move it to the end of sticky columns (rightmost sticky position)
			const currentStickyCount = this.stickyColumns.filter((col: StickyColumnType) => col.sticky).length;
			const targetIndex = currentStickyCount; // This will be the new rightmost sticky position
			
			if (columnIndex !== targetIndex) {
				this.moveColumn(columnIndex, targetIndex);
			}
		} else {
			// Making column non-sticky - move it to the first non-sticky position
			const stickyCount = newStickyColumns.filter((col: StickyColumnType) => col.sticky).length;
			const targetIndex = stickyCount; // First position after all sticky columns
			
			if (columnIndex !== targetIndex) {
				this.moveColumn(columnIndex, targetIndex);
			}
		}

		this.setStickyColumns(newStickyColumns);
	}

	getStickyColumnsOffsets(): { [key: string]: number } {
		if (!this.hasStickyColumns) {
			return {};
		}

		const offsets: { [key: string]: number } = {};
		let cumulativeWidth = 0;

		// PRECISE RULE: Each sticky column's left = sum of all previous sticky column ACTUAL RENDERED widths
		for (let i = 0; i < this.columns.length; i++) {
			const column = this.columns[i];
			const isSticky = this.stickyColumns.find((col: StickyColumnType) => col.key === column.key)?.sticky ?? false;
			
			if (isSticky) {
				// This sticky column's left position = sum of all previous sticky column actual widths
				offsets[column.key] = cumulativeWidth;
				
				// Get the ACTUAL rendered width of this column (most accurate)
				const actualWidth = this.getColumnActualWidth(column.key, column.width ?? 150);
				
				// Add this column's ACTUAL width to the cumulative total for the next sticky column
				cumulativeWidth += actualWidth;
			}
		}
		return offsets;
	}

	setHiddenColumns(hiddenColumns: HiddenColumnType[]) {
		this.hiddenColumns = hiddenColumns;
		localStorage.setItem(`${this.key}_hidden`, JSON.stringify(this.hiddenColumns));
	}

	toggleColumnHidden(columnKey: string) {
		const newHiddenColumns = this.hiddenColumns.map((col: HiddenColumnType) => 
			col.key === columnKey ? { ...col, hidden: !col.hidden } : col
		);
		this.setHiddenColumns(newHiddenColumns);
	}

	getVisibleColumns(): TableColumnType[] {
		return this.columns.filter((column: TableColumnType) => {
			const isHidden = this.hiddenColumns.find((col: HiddenColumnType) => col.key === column.key)?.hidden ?? false;
			return !isHidden;
		});
	}

	getHiddenColumns(): TableColumnType[] {
		return this.columns.filter((column: TableColumnType) => {
			const isHidden = this.hiddenColumns.find((col: HiddenColumnType) => col.key === column.key)?.hidden ?? false;
			return isHidden;
		});
	}
}

export default DataTable;