import type { FC } from 'react'
import { useRef } from 'react'
import ReactDOM from 'react-dom'
import { RiCloseFill } from 'react-icons/ri'
import cn from 'clsx'

import styles from './Notification.module.scss'

interface IModal {
	text?: string
	openModal?: boolean
	closeModal?: () => void
	error?: string
}

const Notification: FC<IModal> = ({ text, openModal, closeModal, error }) => {
	const modalRef = useRef<HTMLElement | null>(
		document.getElementById('notification')
	)
	// const timer = useRef<number>()

	// useEffect(() => {
	// 	timer.current = window.setTimeout(() => {
	// 		closeModal && closeModal()
	// 	}, 2000)
	// 	return () => {
	// 		clearTimeout(timer.current)
	// 	}
	// }, [closeModal])

	if (!openModal || !modalRef.current) {
		return null
	}

	return ReactDOM.createPortal(
		<div className={styles.overlay}>
			<div
				className={cn(styles.window, {
					'bg-green text-white': error === 'Saved!' || error === 'Started!',
					'bg-red text-white': !!error
				})}
			>
				<button onClick={closeModal}>
					<RiCloseFill />
				</button>
				{error}
			</div>
		</div>,
		modalRef.current
	)
}

export default Notification
