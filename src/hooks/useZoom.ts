import { useState, ChangeEvent } from 'react';

const useZoom = () => {
	const [zoomLevel, setZoomLevel] = useState<number>(100);

	const handleZoomChange = (event: ChangeEvent<HTMLSelectElement>): void => {
		const selectedZoomLevel = parseInt(event.target.value, 10);
		setZoomLevel(selectedZoomLevel);
	};

	const increaseZoom = () => {
		if (zoomLevel < 150) {
			setZoomLevel((prev) => prev + 10);
		}
	};

	const reduceZoom = () => {
		if (zoomLevel > 10) {
			setZoomLevel((prev) => prev - 10);
		}
	};

	return {
		zoomLevel,
		handleZoomChange,
		increaseZoom,
		reduceZoom,
	};
};

export default useZoom;
