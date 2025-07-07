import { ReactNode } from 'react';
type NestedColumnType = {
    key: string;
    label?: string | ReactNode;
    Cell?: (props: {
        data: Record<string, unknown>;
    }) => ReactNode;
};
export type TableColumnType = {
    key: string;
    label: string | ReactNode;
    width?: number;
    resizeable?: boolean;
    Cell: (props: {
        data: Record<string, unknown>;
    }) => ReactNode;
    nestedColumns?: NestedColumnType[];
};
type ColumnWidthType = {
    key: string;
    width?: number;
};
export interface DataTableLiteType {
    key: string;
    columns: TableColumnType[];
    hasDraggableColumns?: boolean;
    saveLayoutView?: boolean;
    defaultColumnWidth?: number | string;
    isStickyHeader?: boolean;
    onRowClick?: ({ item }: {
        item: Record<string, unknown>;
    }) => void;
}
export type DataTableType = DataTableLiteType & {
    moveColumn: (index: number, toIndex: number) => void;
    setColumnsWidth: (widths: ColumnWidthType[]) => void;
    columnsWidth: ColumnWidthType[];
};
declare class DataTable {
    key: string;
    columns: any;
    saveLayoutView: boolean;
    hasDraggableColumns: boolean;
    isStickyHeader: boolean;
    onRowClick: (({ item }: {
        item: Record<string, unknown>;
    }) => void) | undefined;
    columnsWidth: ColumnWidthType[];
    constructor({ key, columns, saveLayoutView, hasDraggableColumns, isStickyHeader, onRowClick, defaultColumnWidth }: DataTableLiteType);
    moveColumn(index: number, toIndex: number): void;
    setColumnsWidth(widths: ColumnWidthType[]): void;
}
export default DataTable;
