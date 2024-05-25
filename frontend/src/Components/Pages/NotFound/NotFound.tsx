import Heading from '@UI/Heading/Heading'
import React from 'react'

const NotFound = () => {
	return (
		<>
			<div className='flex flex-col items-center'>
				<Heading className='text-center text-red'>404 Not found</Heading>
				<div className='flex flex-col justify-center items-center'>
					<img width={200} height={200} src='/img/404.gif' alt='...' />
					<div>
						Go back to{' '}
						<a className='text-blue' href='/campaign-create'>
							home
						</a>{' '}
						page
					</div>
				</div>
			</div>
		</>
	)
}

export default NotFound
