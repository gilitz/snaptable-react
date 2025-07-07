import { default as DataTable } from '../models/data-table-model';
export declare function useTable<T extends Record<string, unknown>>(dataTable: DataTable, data: T[]): {
    columns: any;
    data: T[];
    config: DataTable;
    columnWidths: {
        key: string;
        width?: number;
    }[];
    getColumnProps: (index: number) => {
        width: any;
        isDraggable: boolean;
        isResizable: any;
        onDragStart: (e: DragEvent) => void;
        onDragOver: (e: DragEvent) => void;
        onDrop: (e: DragEvent) => void;
        onResizeStart: (e: MouseEvent) => void;
    };
    getRowProps: (item: T) => {
        onClick: () => void;
    };
};
export default useTable;
