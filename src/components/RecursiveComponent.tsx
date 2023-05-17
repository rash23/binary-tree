import { FC } from 'react'
import { RecursiveComponentPropsType } from '../types'

const RecursiveComponent: FC<RecursiveComponentPropsType> = (props) => {
	return (
		<ul>
			{props.data.map((item) => (
				<li key={item.id}>
					{item.isEdited ? (
						<div className="card">
							<div className="card_edit">
								<span className="card_name"> {item.categoryName}</span>
								<div className="btn-wrapper">
									<button className="button-icon" onClick={() => props.addCategory(item.id)}>
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
						</div>
					) : (
						<div className="card">
							<div className="card_edit">
								<input
									placeholder="Category name"
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
						/>
					)}
				</li>
			))}
		</ul>
	)
}

export default RecursiveComponent
