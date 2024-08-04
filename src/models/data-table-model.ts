import { makeAutoObservable } from 'mobx';
import { ReactNode } from "react";

export type TableColumnType = {
	key: string;
	label: string | ReactNode;
	width?: number;
	resizeable?: boolean;
	Cell: any;
}

type ColumnWidthType = {
	key: string;
	width: number;
}

export interface DataTableLiteType {
	key: string;
	columns: TableColumnType[];
	hasDraggableColumns?: boolean;
	saveLayoutView?: boolean;
	defaultColumnWidth?: number;
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
	columnsWidth: ColumnWidthType[];

	constructor({ key, columns, saveLayoutView, hasDraggableColumns, defaultColumnWidth = 80 }: DataTableLiteType) {
		makeAutoObservable(this);
		// @ts-expect-error
		const savedColumns = JSON.parse(localStorage.getItem(key));
		this.key = key;
		this.saveLayoutView = saveLayoutView ?? false;
		this.hasDraggableColumns = hasDraggableColumns ?? true;

		this.columnsWidth = columns.map((column) => {
			const savedColumn = savedColumns?.find(({ key }: ColumnWidthType) => key === column.key);
			return ({ key: column.key, width: column.width ?? savedColumn?.width ?? defaultColumnWidth });
		});

		// load initial view if exists
		if (saveLayoutView) {
			if (savedColumns) {
				this.columns = savedColumns.reduce((result: TableColumnType[], savedColumn: ColumnWidthType) => {
					const currentColumn = columns.find(({ key }) => key === savedColumn.key)
					if (!currentColumn) {
						return result;
					}
					result = [...result, currentColumn];
					return result;
				}, []);

				this.columnsWidth = savedColumns.reduce((result: ColumnWidthType[], savedColumn: ColumnWidthType) => {
					const currentColumn = columns.find(({ key }) => key === savedColumn.key)
					if (!currentColumn) {
						return result;
					}
					result = [...result, { key: currentColumn.key, width: currentColumn.width ?? savedColumn.width }];
					return result;
				}, [])
			}
			else {
				localStorage.setItem(key, JSON.stringify(this.columnsWidth));
			}
		}
		else {
			this.columns = columns;
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