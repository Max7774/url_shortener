import cn from 'clsx'
import type { FC, PropsWithChildren } from 'react'

import { FiCheck } from 'react-icons/fi'

import styles from './Checkbox.module.scss'

interface ICheckbox {
	isChecked?: boolean
	onClick?: () => void
	className?: string
	disabled?: boolean
}

const Checkbox: FC<PropsWithChildren<ICheckbox>> = ({
	isChecked,
	onClick,
	className,
	disabled,
	children
}) => {
	return (
		<button
			disabled={disabled}
			className={cn(styles.checkbox, className)}
			onClick={onClick}
		>
			<span
				className={cn({
					[styles.active]: isChecked
				})}
			>
				{isChecked && <FiCheck className='text-secondary m-0.3' size={18} />}
			</span>
			<span>{children}</span>
		</button>
	)
}

export default Checkbox
//FiCheck
