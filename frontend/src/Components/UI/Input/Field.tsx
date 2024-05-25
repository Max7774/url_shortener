import cn from 'clsx'
import { forwardRef, useState } from 'react'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io'

import { IField } from './field.interface'

const Field = forwardRef<HTMLInputElement, IField>(
	(
		{
			placeholder,
			error,
			className,
			type,
			style,
			helperText,
			color,
			label,
			center,
			name,
			uniqueLink,
			Icon,
			...rest
		},
		ref
	) => {
		const [showPassword, setShowPassword] = useState(false)

		const toggleShowPassword = () => {
			setShowPassword(prevState => !prevState)
		}

		return (
			<div className='m-3'>
				<label className={cn('mb-4', className)} style={style}>
					<span
						className={cn('mb-1 block text-center', {
							'text-black': color === 'black',
							'text-white': color === 'white',
							'text-start': !center,
							'text-center': center
						})}
					>
						{Icon && <Icon className='mr-3' />}
						{!!label ? label : placeholder}
					</span>
					<div className='relative'>
						<input
							name={name}
							placeholder={placeholder}
							ref={ref}
							type={showPassword ? 'text' : type}
							className={cn(
								'px-4 py-2 w-full outline-none border border-gray border-solid focus:border-primary transition-all placeholder:text-gray rounded-xl hover:-translate-y-1 hover:scale-100 hover:bg-indigo-500 duration-500',
								{ 'border-red': !!error }
							)}
							{...rest}
						/>
						{type === 'password' && (
							<button
								type='button'
								className='absolute top-1/2 bg-white right-3 transform -translate-y-1/2'
								onClick={toggleShowPassword}
							>
								{showPassword ? <IoMdEyeOff /> : <IoMdEye />}
							</button>
						)}
					</div>
				</label>
				{helperText && <div className='ml-4 text-xs'>{helperText}</div>}
				{error && <div className='text-red mt-1 text-sm'>{error}</div>}
			</div>
		)
	}
)

export default Field
