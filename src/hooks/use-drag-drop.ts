import { useState } from 'react';

const useDragAndDrop = <T>(
	onDragStart?: (item: T, index: number) => void,
	onDragEnd?: (fromIndex: number, toIndex: number) => void
) => {
	const [draggedItem, setDraggedItem] = useState<T | null>(null);
	const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	const handleDragStart = (item: T, index: number) => {
		setDraggedItem(item);
		setDraggedIndex(index);
		onDragStart?.(item, index);
	};

	const handleDragOver = (e: DragEvent) => {
		e.preventDefault();
	};

	const handleDragEnter = (index: number) => {
		setHoveredIndex(index);
	};

	const handleDragLeave = () => {
		setHoveredIndex(null);
	};

	const handleDrop = (e: DragEvent, toIndex: number) => {
		e.preventDefault();
		
		if (draggedIndex !== null && draggedIndex !== toIndex) {
			onDragEnd?.(draggedIndex, toIndex);
		}
		
		setDraggedItem(null);
		setDraggedIndex(null);
		setHoveredIndex(null);
	};

	return {
		draggedItem,
		draggedIndex,
		hoveredIndex,
		handleDragStart,
		handleDragOver,
		handleDragEnter,
		handleDragLeave,
		handleDrop,
	};
};

export default useDragAndDrop;