import { useState } from 'react'
import RecursiveComponent from './components/RecursiveComponent'
import { ServicesType } from './types'
import './App.css'

const App = () => {
	const [services, setServices] = useState<ServicesType[]>([
		{
			id: crypto.randomUUID(),
			categoryName: 'Categories',
			subCategories: [],
		},
	])

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
		const text: string = prompt() || ''
		const newSubCategory = {
			id: crypto.randomUUID(),
			categoryName: text,
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
		console.log(id)

		const updatedSubCategories = handleRemoveSubCategory(id, services)
		setServices(updatedSubCategories)
	}

	return (
		<div className="App">
			<div className="container">
				<div className="row">
					<div className="tree">
						<RecursiveComponent
							data={services}
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
