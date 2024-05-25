import { FC, useEffect, useRef, useState } from 'react'
import Button from './Button'
import { AiOutlineCheck } from 'react-icons/ai'

const UploadButton: FC<{
	setFile?: React.Dispatch<any>
	text?: string
	name?: string
}> = ({ text, name }) => {
	const [loading, setLoading] = useState(false)
	const [success, setSuccess] = useState(false)
	const timer = useRef<number>()
	const hiddenFileInput: any = useRef(null)
	const [file, setFile] = useState<any>()
	const [fileIsValid, setFileIsValid] = useState(true)

	useEffect(() => {
		return () => {
			clearTimeout(timer.current)
		}
	}, [])

	const handleClick = (event: any) => {
		event.preventDefault()
		hiddenFileInput.current.click()
	}

	const handleChange = (event: any) => {
		const selectedFile = event.target.files[0]

		if (selectedFile) {
			setFile(selectedFile)
			setFileIsValid(true)
			if (!loading) {
				setSuccess(false)
				setLoading(true)
				timer.current = window.setTimeout(() => {
					setSuccess(true)
					setLoading(false)
				}, 2000)
			}
		} else {
			setFile(null)
			setFileIsValid(false)
		}

		// setFile(event.target.files[0])
		// if (!loading) {
		// 	setSuccess(false)
		// 	setLoading(true)
		// 	timer.current = window.setTimeout(() => {
		// 		setSuccess(true)
		// 		setLoading(false)
		// 	}, 2000)
		// }
	}

	return (
		<>
			<Button
				className='flex justify-center'
				variant={success ? 'white' : 'orange'}
				isLoading={loading}
				disabled={success}
				size='md'
				onClick={handleClick}
			>
				{success ? (
					<>
						<AiOutlineCheck size={25} />
						<>{file.name}</>
					</>
				) : (
					<>{text}</>
				)}
			</Button>
			<input
				required
				style={{ display: 'none' }}
				type='file'
				name={name}
				ref={hiddenFileInput}
				onChange={handleChange}
				id='password'
				accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
			/>{' '}
			{!fileIsValid && <p style={{ color: 'red' }}>Please select a file</p>}
		</>
	)
}

export default UploadButton
