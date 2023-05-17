import { useState } from 'react'
import RecursiveComponent from './components/RecursiveComponent'
import { ServicesType } from './types'
import './App.css'

const App = () => {
	const [services, setServices] = useState<ServicesType[]>([
		{
			id: crypto.randomUUID(),
			categoryName: 'Categories',
			isEdited: true,
			firsElement: true,
			subCategories: [],
		},
	])

	const [zoomLevel, setZoomLevel] = useState<number>(100)

	const handleZoomChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedZoomLevel = parseInt(event.target.value, 10)
		setZoomLevel(selectedZoomLevel)
	}

	const addSubCategoryById = (id: string, newObject: ServicesType, array: ServicesType[]) => {
		const updatedCategories = [...array]

		for (let i = 0; i < updatedCategories.length; i++) {
			if (updatedCategories[i].id === id) {
				updatedCategories[i].subCategories.push(newObject)
				break
			}

			if (updatedCategories[i].subCategories.length > 0) {
				addSubCategoryById(id, newObject, updatedCategories[i].subCategories)
			}
		}

		setServices(updatedCategories)
	}

	const handleAddSubCategory = (id: string): void => {
		const newSubCategory = {
			id: crypto.randomUUID(),
			isEdited: false,
			categoryName: '',
			subCategories: [],
		}

		addSubCategoryById(id, newSubCategory, services)
	}

	const handleRemoveSubCategory = (id: string, array: ServicesType[]): ServicesType[] => {
		return array.filter((item) => {
			if (item.id === id) {
				return false
			}
			if (item.subCategories && item.subCategories.length > 0) {
				item.subCategories = handleRemoveSubCategory(id, item.subCategories)
				return true
			}
			return true
		})
	}

	const removeSubCategoryById = (id: string): void => {
		const updatedSubCategories = handleRemoveSubCategory(id, services)
		setServices(updatedSubCategories)
	}

	const changeTextLogic = (id: string, text: string, array: ServicesType[]): void => {
		const updatedCategories = [...array]

		for (let i = 0; i < updatedCategories.length; i++) {
			if (updatedCategories[i].id === id) {
				updatedCategories[i].categoryName = text
				break
			}

			if (updatedCategories[i].subCategories.length > 0) {
				changeTextLogic(id, text, updatedCategories[i].subCategories)
			}
		}

		setServices(updatedCategories)
	}

	const changeText = (id: string, text: string): void => {
		changeTextLogic(id, text, services)
	}

	const addTextLogic = (id: string, text: string, array: ServicesType[]): void => {
		if (!text) {
			alert('Please enter a text')
			return
		}

		const updatedCategories = [...array]

		for (let i = 0; i < updatedCategories.length; i++) {
			if (updatedCategories[i].id === id) {
				updatedCategories[i].categoryName = text
				updatedCategories[i].isEdited = true
				break
			}

			if (updatedCategories[i].subCategories.length > 0) {
				addTextLogic(id, text, updatedCategories[i].subCategories)
			}
		}

		setServices(updatedCategories)
	}

	const addText = (text: string, id: string): void => {
		addTextLogic(id, text, services)
	}

	const editTextLogic = (id: string, array: ServicesType[]): void => {
		const updatedCategories = [...array]

		for (let i = 0; i < updatedCategories.length; i++) {
			if (updatedCategories[i].id === id) {
				updatedCategories[i].isEdited = false
				break
			}

			if (updatedCategories[i].subCategories.length > 0) {
				editTextLogic(id, updatedCategories[i].subCategories)
			}
		}

		setServices(updatedCategories)
	}

	const editText = (id: string): void => {
		editTextLogic(id, services)
	}

	const increaseZoom = () => {
		if (zoomLevel < 150) {
			setZoomLevel((prev) => prev + 10)
		}
	}

	const reduceZoom = () => {
		if (zoomLevel > 10) {
			setZoomLevel((prev) => prev - 10)
		}
	}

	return (
		<div className="app">
			<header className="header">
				<div>Services</div>
				<div className="zoom-container">
					<button className="button" onClick={reduceZoom}>
						-
					</button>
					<select value={zoomLevel.toString()} onChange={handleZoomChange}>
						{[...Array(15)].map((_, index) => (
							<option key={index} value={(index + 1) * 10}>
								{(index + 1) * 10}%
							</option>
						))}
					</select>
					<button className="button" onClick={increaseZoom}>
						+
					</button>
				</div>
			</header>
			<div className="container">
				<div className="row">
					<div className="tree" style={{ transform: `scale(${zoomLevel / 100})` }}>
						<RecursiveComponent
							data={services}
							changeText={changeText}
							addText={addText}
							editText={editText}
							addCategory={handleAddSubCategory}
							removeCategory={removeSubCategoryById}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default App
