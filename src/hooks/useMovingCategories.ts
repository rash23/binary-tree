import { useState, MouseEvent } from 'react';
import { Offset } from '../types';

const useMovingCategories = () => {
	const [isDragging, setIsDragging] = useState(false);
	const [offset, setOffset] = useState<Offset>({ x: 0, y: 0 });
	const [position, setPosition] = useState<Offset>({ x: 0, y: 0 });

	const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
		setIsDragging(true);
		setOffset({
			x: event.clientX - event.currentTarget.offsetLeft,
			y: event.clientY - event.currentTarget.offsetTop,
		});
	};

	const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
		if (isDragging) {
			const x = event.clientX - offset.x;
			const y = event.clientY - offset.y;
			(event.currentTarget as HTMLDivElement).style.left = x + 'px';
			(event.currentTarget as HTMLDivElement).style.top = y + 'px';

			setPosition({ x: x, y: y });
		}
	};

	const handleMouseUp = () => {
		setIsDragging(false);
	};

	const handleResetPosition = () => {
		setPosition({ x: 0, y: 0 });
	};

	return {
		position,
		handleMouseDown,
		handleMouseMove,
		handleMouseUp,
		handleResetPosition,
	};
};

export default useMovingCategories;
