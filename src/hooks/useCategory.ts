import { useState } from 'react'
import { ServicesType, ServicesEnum } from '../types'

const useCategory = () => {
	const [services, setServices] = useState<ServicesType[]>([
		{
			id: crypto.randomUUID(),
			categoryName: 'Categories',
			isEdited: true,
			firsElement: true,
			subCategories: [],
		},
	])

	const openModalById = (id: string, array: ServicesType[], isOpen: boolean) => {
		const updatedCategories = [...array]

		for (let i = 0; i < updatedCategories.length; i++) {
			if (updatedCategories[i].id === id) {
				updatedCategories[i].isOpenModal = isOpen
				break
			}

			if (updatedCategories[i].subCategories.length > 0) {
				openModalById(id, updatedCategories[i].subCategories, isOpen)
			}
		}

		setServices(updatedCategories)
	}

	const handleOpenModal = (id: string): void => {
		openModalById(id, services, true)
	}

	const addSubCategoryById = (id: string, newObject: ServicesType, array: ServicesType[]) => {
		openModalById(id, services, false)
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

	const handleAddSubCategory = (id: string, type: ServicesEnum): void => {
		const newSubCategory: ServicesType = {
			id: crypto.randomUUID(),
			isEdited: false,
			isOpenModal: false,
			categoryName: '',
			category: type,
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

	return { services, changeText, addText, editText, handleAddSubCategory, removeSubCategoryById, handleOpenModal }
}

export default useCategory
