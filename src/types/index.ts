import { ChangeEvent } from 'react'

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

export type ZoomComponentPropsType = {
	zoomLevel: number
	reduceZoom: () => void
	increaseZoom: () => void
	handleZoomChange: (event: ChangeEvent<HTMLSelectElement>) => void
}

export type Offset = {
	x: number
	y: number
}
