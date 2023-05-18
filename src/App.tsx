import RecursiveComponent from './components/RecursiveComponent'
import ZoomComponent from './components/ZoomComponent'
import useCategory from './hooks/useCategory'
import useZoom from './hooks/useZoom'
import useMovingCategories from './hooks/useMovingCategories'
import './App.css'

const App = () => {
	const { services, changeText, addText, editText, handleAddSubCategory, removeSubCategoryById, handleOpenModal } =
		useCategory()
	const { zoomLevel, handleZoomChange, increaseZoom, reduceZoom } = useZoom()
	const { position, handleMouseDown, handleMouseMove, handleMouseUp, handleResetPosition } = useMovingCategories()

	return (
		<div className="app">
			<header className="header">
				<div className="logo">Services</div>

				<div className="header_navigation">
					<button className="button" onClick={handleResetPosition}>
						&#8617;
					</button>
					<ZoomComponent
						zoomLevel={zoomLevel}
						reduceZoom={reduceZoom}
						increaseZoom={increaseZoom}
						handleZoomChange={handleZoomChange}
					/>
				</div>
			</header>
			<div className="container">
				<div className="row" style={{ position: 'relative' }}>
					<div
						className="tree"
						style={{
							transform: `scale(${zoomLevel / 100})`,
							position: 'absolute',
							top: `${position.y}px`,
							left: `${position.x}px`,
						}}
						onMouseDown={handleMouseDown}
						onMouseMove={handleMouseMove}
						onMouseUp={handleMouseUp}
					>
						<RecursiveComponent
							data={services}
							changeText={changeText}
							addText={addText}
							editText={editText}
							addCategory={handleAddSubCategory}
							removeCategory={removeSubCategoryById}
							openModal={handleOpenModal}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default App
