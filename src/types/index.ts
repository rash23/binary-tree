export type ServicesType = {
	id: string
	categoryName: string
	isEdited: boolean
	firsElement?: boolean
	subCategories: ServicesType[]
}

export type RecursiveComponentPropsType = {
	data: ServicesType[]
	changeText: (id: string, text: string) => void
	addText: (text: string, id: string) => void
	editText: (id: string) => void
	addCategory: (id: string) => void
	removeCategory: (id: string) => void
}
