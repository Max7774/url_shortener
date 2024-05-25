import React, { FC } from 'react'

import styles from './AnimatedField.module.scss'
import { useOutside } from '@hooks/useOutside'
import Field from '../Field'

const AnimatedField: FC<{ isShow: boolean }> = ({ isShow }) => {
	const { ref } = useOutside(false)
	return (
		<div className='relative' ref={ref}>
			{isShow && (
				<div className={styles.fieldWrapper}>
					<Field placeholder='Link' color='black' />
				</div>
			)}
		</div>
	)
}

export default AnimatedField
