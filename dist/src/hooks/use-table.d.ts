import { default as DataTable } from '../models/data-table-model';
export declare function useTable<T extends Record<string, unknown>>(dataTable: DataTable, data: T[]): {
    columns: any;
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
    stickyOffsets: {
        [key: string]: number;
    };
    getColumnProps: (index: number) => {
        width: any;
        isDraggable: boolean;
        isResizable: any;
        isSticky: boolean;
        stickyOffset: number;
        onDragStart: (e: DragEvent) => void;
        onDragOver: (e: DragEvent) => void;
        onDrop: (e: DragEvent) => void;
        onResizeStart: (e: MouseEvent, headerElement?: HTMLElement) => void;
        onToggleSticky: (headerElement?: HTMLElement) => void;
        registerHeaderRef: (element: HTMLElement | null) => void;
    };
    getCellProps: (columnIndex: number) => {
        width: any;
        isSticky: boolean;
        stickyOffset: number;
    };
    getRowProps: (item: T) => {
        onClick: () => void;
    };
    updateActualWidths: () => void;
};
export default useTable;
