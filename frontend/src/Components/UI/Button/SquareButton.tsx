import { FC, PropsWithChildren } from 'react'
import { IconType } from 'react-icons'

interface ISquareButton {
	Icon: IconType
	onClick?: () => void
	number?: number
}

const SquareButton: FC<PropsWithChildren<ISquareButton>> = ({
	Icon,
	onClick,
	number,
	children
}) => {
	return (
		<button
			onClick={onClick}
			className='h-10 p-3 mt-2 bg-primary flex items-center justify-start hover:bg-primary/90 transition-colors duration-200 relative rounded-xl'
			style={{ width: '100%' }}
		>
			{!!number && (
				<span className='flex h-4 w-4 items-center justify-center rounded-full bg-white p-0.5 text-[0.75rem] text-secondary absolute -top-1 -right-1'>
					{number}
				</span>
			)}
			<Icon className='text-secondary' size={21} />
			<div className='ml-10'>{children}</div>
		</button>
	)
}

export default SquareButton
