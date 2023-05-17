import { FC } from 'react'
import { RecursiveComponentPropsType } from '../types'

const RecursiveComponent: FC<RecursiveComponentPropsType> = (props) => {
	return (
		<ul>
			{props.data.map((item) => (
				<li key={item.id}>
					<div>
						<span> {item.categoryName}</span>
						<button onClick={() => props.addCategory(item.id)}>+</button>
						<button onClick={() => props.removeCategory(item.id)}>-</button>
					</div>

					{item.subCategories.length > 0 && (
						<RecursiveComponent
							data={item.subCategories}
							addCategory={props.addCategory}
							removeCategory={props.removeCategory}
						/>
					)}
				</li>
			))}
		</ul>
	)
}

export default RecursiveComponent
