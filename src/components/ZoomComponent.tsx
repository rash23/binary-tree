import { FC } from 'react';
import { ZoomComponentPropsType } from '../types';

const ZoomComponent: FC<ZoomComponentPropsType> = (props) => {
	return (
		<div className="zoom-container">
			<button className="button" onClick={props.reduceZoom}>
				➖
			</button>
			<select className="select" value={props.zoomLevel.toString()} onChange={props.handleZoomChange}>
				{[...Array(15)].map((_, index) => (
					<option key={index} value={(index + 1) * 10}>
						{(index + 1) * 10}%
					</option>
				))}
			</select>
			<button className="button" onClick={props.increaseZoom}>
				➕
			</button>
		</div>
	);
};

export default ZoomComponent;
