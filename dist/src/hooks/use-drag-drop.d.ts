declare const useDragAndDrop: <T>(onDragStart?: (item: T, index: number) => void, onDragEnd?: (fromIndex: number, toIndex: number) => void) => {
    draggedItem: T | null;
    draggedIndex: number | null;
    hoveredIndex: number | null;
    handleDragStart: (item: T, index: number) => void;
    handleDragOver: (e: DragEvent) => void;
    handleDragEnter: (index: number) => void;
    handleDragLeave: () => void;
    handleDrop: (e: DragEvent, toIndex: number) => void;
};
export default useDragAndDrop;
