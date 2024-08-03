import { useState } from 'react';

const useDragAndDrop = () => {

	const [draggedIndex, setDraggedIndex] = useState<any>(null);
	const [hoveredIndex, setHoveredIndex] = useState<any>(null);

	const onDragStart = (index: number, callback?: (index: number) => void) => (event: React.DragEvent<HTMLDivElement>) => {
		setDraggedIndex(index);
		event.dataTransfer.effectAllowed = 'move';
		callback?.(index);
	};

	const onDragOver = (index: number, callback?: (index: number) => void) => (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.dataTransfer.dropEffect = 'move';
		setHoveredIndex(index);
		callback?.(index);
	};

	const onDrop = (index: number, callback?: (index: number) => void) => (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		if (draggedIndex === null) return;
		callback?.(index);
		setDraggedIndex(null);
		setHoveredIndex(null);
	};

	return {
		draggedIndex,
		hoveredIndex,
		onDragStart,
		onDragOver,
		onDrop,
	};
};

export default useDragAndDrop;