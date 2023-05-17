export type ServicesType = {
	id: string
	categoryName: string
	subCategories: ServicesType[]
}

export type RecursiveComponentPropsType = {
	data: ServicesType[]
	addCategory: (id: string) => void
	removeCategory: (id: string) => void
}
