import React, { FC, PropsWithChildren } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Button from '../Button/Button'
import cn from 'clsx'
import { useActions } from '@hooks/useActions'

const NavBar: FC<PropsWithChildren> = () => {
	const { pathname } = useLocation()
	const { logout } = useActions()
	const handleClick = () => {
		logout()
	}

	return (
		<>
			<header
				className='bg-bg-color w-full py-3 px-3 shadow-2xl'
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between'
				}}
			>
				<div className='grid grid-flow-col gap-4 items-center sm:grid-cols-1 md:grid-cols-3'>
					<h2 className='text-2xl text-primary font-semibold'>
						<Link to='/campaign-create'>SMS Sender</Link>
					</h2>
				</div>
				<div className='flex flex-row text-lg text-white items-center'>
					<Link
						to='/campaign-create'
						className={cn(
							'text-lg font-semibold hover:text-primary transition-colors duration-200 m-2',
							{
								'text-lg text-primary text-decoration-line: underline font-semibold hover:text-primary transition-colors duration-200 m-2':
									pathname === '/campaign-create'
							}
						)}
					>
						Create
					</Link>
					<div className='text-thirdly m-2'>|</div>
					<Link
						to='/statistics'
						className={cn(
							'text-lg font-semibold hover:text-primary transition-colors duration-200 m-2',
							{
								'text-lg text-primary text-decoration-line: underline font-semibold hover:text-primary transition-colors duration-200 m-2':
									pathname === '/statistics'
							}
						)}
					>
						Statistics
					</Link>
					<div className='text-thirdly m-2'>|</div>
					<Link
						to='/blacklist'
						className={cn(
							'text-lg font-semibold hover:text-primary transition-colors duration-200 m-2',
							{
								'text-lg text-primary text-decoration-line: underline font-semibold hover:text-primary transition-colors duration-200 m-2':
									pathname === '/blacklist'
							}
						)}
					>
						Blacklist
					</Link>
					<div className='text-thirdly m-2'>|</div>

					<Button
						className='m-1'
						variant='orange'
						size='sm'
						onClick={handleClick}
					>
						Log out
					</Button>
				</div>
			</header>
		</>
	)
}

export default NavBar
