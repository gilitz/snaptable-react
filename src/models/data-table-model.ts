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
	Cell: (props: { data: Record<string, unknown> }) => ReactNode;
	nestedColumns?: NestedColumnType[];
}

type ColumnWidthType = {
	key: string;
	width?: number;
}

export interface DataTableLiteType {
	key: string;
	columns: TableColumnType[];
	hasDraggableColumns?: boolean;
	saveLayoutView?: boolean;
	defaultColumnWidth?: number | string;
	isStickyHeader?: boolean;
	onRowClick?: ({ item }: { item: Record<string, unknown> }) => void
}

export type DataTableType = DataTableLiteType & {
	moveColumn: (index: number, toIndex: number) => void;
	setColumnsWidth: (widths: ColumnWidthType[]) => void;
	columnsWidth: ColumnWidthType[];
}

class DataTable {
	key;
	columns;
	saveLayoutView;
	hasDraggableColumns;
	isStickyHeader;
	onRowClick;
	columnsWidth: ColumnWidthType[];	 
	// nestedColumnsWidth?: ColumnWidthType[] | null;	 

	constructor({ key, columns, saveLayoutView, hasDraggableColumns, isStickyHeader, onRowClick, defaultColumnWidth = 'auto' }: DataTableLiteType) {
		makeAutoObservable(this);
		// @ts-expect-error
		const savedColumns = JSON.parse(localStorage.getItem(key));
		this.key = key;
		this.saveLayoutView = saveLayoutView ?? false;
		this.hasDraggableColumns = hasDraggableColumns ?? true;
		this.isStickyHeader = isStickyHeader ?? false;
		this.onRowClick = onRowClick;

		// Always load saved column widths if they exist
		this.columnsWidth = columns.map((column) => {
			const savedColumn = savedColumns?.find(({ key }: ColumnWidthType) => key === column.key);
			const fallbackWidth = typeof defaultColumnWidth === 'number' ? defaultColumnWidth : undefined;
			return ({ key: column.key, width: savedColumn?.width ?? column.width ?? fallbackWidth });
		});

		// load initial view if exists and saveLayoutView is enabled
		if (saveLayoutView) {
			if (savedColumns) {
				const newFilteredColumns = columns.filter(column => !savedColumns.map(({ key }: TableColumnType) => key).includes(column.key));
				const updatedColumns = savedColumns.reduce((result: TableColumnType[], savedColumn: ColumnWidthType) => {
					const currentColumn = columns.find(({ key }) => key === savedColumn.key)
					if (!currentColumn) {
						return result;
					}
					result = [...result, currentColumn];
					return result;
				}, []);

				const updatedColumnsWidth = savedColumns.reduce((result: ColumnWidthType[], savedColumn: ColumnWidthType) => {
					const currentColumn = columns.find(({ key }) => key === savedColumn.key)
					if (!currentColumn) {
						return result;
					}
					const fallbackWidth = typeof defaultColumnWidth === 'number' ? defaultColumnWidth : undefined;
					result = [...result, { key: currentColumn.key, width: savedColumn.width ?? currentColumn.width ?? fallbackWidth }];
					return result;
				}, [])

				this.columns = updatedColumns.concat(newFilteredColumns);
				this.columnsWidth = updatedColumnsWidth.concat(newFilteredColumns.map(({ key, width }) => ({ key, width: width ?? defaultColumnWidth })));
			}
			else {
				// Initialize localStorage with current column widths
				localStorage.setItem(key, JSON.stringify(this.columnsWidth));
				this.columns = columns;
			}
		}
		else {
			this.columns = columns;
			// Even if saveLayoutView is false, still initialize localStorage for resize functionality
			if (!savedColumns) {
				localStorage.setItem(key, JSON.stringify(this.columnsWidth));
			}
		}
	}

	moveColumn(index: number, toIndex: number) {
		if (!this.hasDraggableColumns) {
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

		// update localstorage saved columns
		// @ts-expect-error
		const savedColumns = JSON.parse(localStorage.getItem(this.key));
		const savedItem = savedColumns.splice(index, 1)[0];
		savedColumns.splice(toIndex, 0, savedItem);
		localStorage.setItem(this.key, JSON.stringify(savedColumns));
	}

	setColumnsWidth(widths: ColumnWidthType[]) {
		this.columnsWidth = widths;
	}
}

export default DataTable;