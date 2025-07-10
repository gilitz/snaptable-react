import { default as DataTable } from '../models/data-table-model';
export declare function useTable<T extends Record<string, unknown>>(dataTable: DataTable, data: T[]): {
    columns: import('../models/data-table-model').TableColumnType[];
    data: T[];
    config: DataTable;
    columnWidths: {
        key: string;
        width?: number;
    }[];
    stickyColumns: {
        key: string;
        sticky: boolean;
    }[];
    hiddenColumns: {
        key: string;
        hidden: boolean;
    }[];
    stickyOffsets: {
        [key: string]: number;
    };
    getColumnProps: (index: number) => {
        width: string;
        isDraggable: boolean;
        isResizable: boolean | undefined;
        isSticky: boolean;
        stickyOffset: number;
        zIndex: number;
        onDragStart: (e: DragEvent) => void;
        onDragOver: (e: DragEvent) => void;
        onDrop: (e: DragEvent) => void;
        onResizeStart: (e: MouseEvent, headerElement?: HTMLElement) => void;
        onToggleSticky: (headerElement?: HTMLElement) => void;
        onToggleHidden: () => void;
        registerHeaderRef: (element: HTMLElement | null) => void;
    };
    getCellProps: (columnIndex: number) => {
        width: string;
        isSticky: boolean;
        stickyOffset: number;
        zIndex: number;
    };
    getRowProps: (item: T) => {
        onClick: () => void;
    };
    updateActualWidths: () => void;
    getHiddenColumns: () => import('../models/data-table-model').TableColumnType[];
    toggleColumnHidden: (columnKey: string) => void;
};
export default useTable;
