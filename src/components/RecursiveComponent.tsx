import { FC } from 'react'
import { RecursiveComponentPropsType, ServicesEnum } from '../types'

const RecursiveComponent: FC<RecursiveComponentPropsType> = (props) => {
	return (
		<ul>
			{props.data.map((item) => (
				<li key={item.id}>
					{item.isEdited ? (
						<div
							className="card"
							style={{
								backgroundColor:
									item.category === ServicesEnum.CATEGORY ? '#FFAC83' : item.firsElement ? '#fff' : '#20BBDF',
							}}
						>
							<div className="card_edit">
								<span className="card_name"> {item.categoryName}</span>
								<div className="btn-wrapper">
									<button className="button-icon" onClick={() => props.openModal(item.id)}>
										➕
									</button>
									{!item.firsElement && (
										<>
											<button className="button-icon" onClick={() => props.editText(item.id)}>
												✏️
											</button>
											<button className="button-icon" onClick={() => props.removeCategory(item.id)}>
												❌
											</button>
										</>
									)}
								</div>
							</div>
							{item.isOpenModal && (
								<div className="modal">
									<div className="modal_title">What do you want to create?</div>
									<div className="modal_buttons">
										<button className="modal_button" onClick={() => props.addCategory(item.id, ServicesEnum.CATEGORY)}>
											Category
										</button>
										<button className="modal_button" onClick={() => props.addCategory(item.id, ServicesEnum.SERVICE)}>
											Service
										</button>
									</div>
								</div>
							)}
						</div>
					) : (
						<div className="card">
							<div className="card_edit">
								<input
									className="input"
									placeholder={item.category === ServicesEnum.CATEGORY ? 'Category name' : 'Service name'}
									value={item.categoryName}
									onChange={(event) => props.changeText(item.id, event.target.value)}
								/>
								<div className="btn-wrapper">
									<button className="button-icon" onClick={() => props.addText(item.categoryName, item.id)}>
										➕
									</button>
									<button className="button-icon" onClick={() => props.removeCategory(item.id)}>
										❌
									</button>
								</div>
							</div>
						</div>
					)}

					{item.subCategories.length > 0 && (
						<RecursiveComponent
							data={item.subCategories}
							addCategory={props.addCategory}
							addText={props.addText}
							editText={props.editText}
							changeText={props.changeText}
							removeCategory={props.removeCategory}
							openModal={props.openModal}
						/>
					)}
				</li>
			))}
		</ul>
	)
}

export default RecursiveComponent
