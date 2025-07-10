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
    sticky?: boolean;
    hidden?: boolean;
    Cell: (props: {
        data: Record<string, unknown>;
    }) => ReactNode;
    nestedColumns?: NestedColumnType[];
};
type ColumnWidthType = {
    key: string;
    width?: number;
};
type StickyColumnType = {
    key: string;
    sticky: boolean;
};
type HiddenColumnType = {
    key: string;
    hidden: boolean;
};
export interface DataTableLiteType {
    key: string;
    columns: TableColumnType[];
    hasDraggableColumns?: boolean;
    saveLayoutView?: boolean;
    defaultColumnWidth?: number | string;
    isStickyHeader?: boolean;
    hasStickyColumns?: boolean;
    onRowClick?: ({ item }: {
        item: Record<string, unknown>;
    }) => void;
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
    getStickyColumnsOffsets: () => {
        [key: string]: number;
    };
    updateActualWidths: (headerElements: {
        [key: string]: HTMLElement;
    }) => void;
    getColumnActualWidth: (columnKey: string, fallbackWidth: number) => number;
    actualRenderedWidths: {
        [key: string]: number;
    };
};
declare class DataTable {
    key: string;
    columns: any;
    saveLayoutView: boolean;
    hasDraggableColumns: boolean;
    isStickyHeader: boolean;
    hasStickyColumns: boolean;
    onRowClick: (({ item }: {
        item: Record<string, unknown>;
    }) => void) | undefined;
    columnsWidth: ColumnWidthType[];
    stickyColumns: StickyColumnType[];
    hiddenColumns: HiddenColumnType[];
    actualRenderedWidths: {
        [key: string]: number;
    };
    updateActualWidths(headerElements: {
        [key: string]: HTMLElement;
    }): void;
    getColumnActualWidth(columnKey: string, fallbackWidth: number): number;
    constructor({ key, columns, saveLayoutView, hasDraggableColumns, isStickyHeader, hasStickyColumns, onRowClick, defaultColumnWidth }: DataTableLiteType);
    moveColumn(index: number, toIndex: number): void;
    setColumnsWidth(widths: ColumnWidthType[]): void;
    setStickyColumns(stickyColumns: StickyColumnType[]): void;
    toggleColumnSticky(columnKey: string, actualWidth?: number): void;
    getStickyColumnsOffsets(): {
        [key: string]: number;
    };
    setHiddenColumns(hiddenColumns: HiddenColumnType[]): void;
    toggleColumnHidden(columnKey: string): void;
    getVisibleColumns(): TableColumnType[];
    getHiddenColumns(): TableColumnType[];
}
export default DataTable;
