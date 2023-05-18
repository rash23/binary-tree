import { ChangeEvent } from 'react'

export enum ServicesEnum {
	CATEGORY = 'CATEGORY',
	SERVICE = 'SERVICE',
}
export type ServicesType = {
	id: string
	categoryName: string
	isEdited: boolean
	firsElement?: boolean
	isOpenModal?: boolean
	category?: ServicesEnum
	subCategories: ServicesType[]
}

export type RecursiveComponentPropsType = {
	data: ServicesType[]
	changeText: (id: string, text: string) => void
	addText: (text: string, id: string) => void
	editText: (id: string) => void
	addCategory: (id: string, type: ServicesEnum) => void
	removeCategory: (id: string) => void
	openModal: (id: string) => void
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
